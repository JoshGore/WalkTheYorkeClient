import React, { useState, useEffect, useContext } from 'react';
import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Paper,
  Grid,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import SendIcon from '@material-ui/icons/Send';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import TrailContext from '../../contexts/TrailContext';
import UserContext from '../../contexts/UserContext';

const SUBMIT_USER_POINT = gql`
  mutation(
    $typeId: Int!
    $geom: geography!
    $name: String
    $description: String
    $userId: Int!
  ) {
    insert_user_points(
      objects: {
        geom: $geom
        type_id: $typeId
        name: $name
        description: $description
        user_id: $userId
      }
    ) {
      returning {
        id
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    markdown: {
      ...theme.typography.body2,
      padding: theme.spacing(1, 0),
    },
    root: {
      backgroundColor: '#F5F5F5',
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
    },
  }),
);

interface NewPointMenuProps {
  newPointCategoryTypeIds: {
    parentTypeId: number | undefined;
    typeId: number | undefined;
  };
  setNewPointCategoryTypeIds: (newPointCategoryTypeIds: {
    parentTypeId: number | undefined;
    typeId: number | undefined;
  }) => void;
  userPointTypesLoading: any;
  userPointTypes: any;
}

const NewPointMenu: React.FC<NewPointMenuProps> = ({
  newPointCategoryTypeIds,
  setNewPointCategoryTypeIds,
  userPointTypesLoading,
  userPointTypes,
}) => {
  const classes = useStyles({});
  const Trail = useContext(TrailContext);
  const User = useContext(UserContext);
  const typeOptions = (userPointTypes: any[], typeId: number) => {
    return userPointTypes.find((type: any) => type.id === typeId).types;
  };
  useEffect(() => {
    if (
      !userPointTypesLoading &&
      newPointCategoryTypeIds.typeId === undefined
    ) {
      setNewPointCategoryTypeIds(
        newPointCategoryTypeIds.parentTypeId !== undefined
          ? typeOptions(
              userPointTypes.types_by_pk.types,
              newPointCategoryTypeIds.parentTypeId,
            )[0].id
          : undefined,
      );
    }
  });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const fieldsValid = () => ({
    location: Trail.newTrailPoint.point !== undefined,
    subType: true,
    name: name.length > 0,
    description: description.length > 0,
    all() {
      return (
        this.location &&
        this.subType &&
        this.name &&
        this.description &&
        this.location
      );
    },
  });
  const title = () =>
    newPointCategoryTypeIds.parentTypeId
      ? `Add ${
          typeOptions(
            userPointTypes.types_by_pk.types,
            newPointCategoryTypeIds.parentTypeId,
          ).find((type: any) => type.id === newPointCategoryTypeIds.typeId).name
        }`
      : 'add point';
  const cancelPointSumbission = () =>
    Trail.setNewTrailPoint({
      type: undefined,
      subType: undefined,
      point: undefined,
    });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const updateSubType = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    setNewPointCategoryTypeIds({
      ...newPointCategoryTypeIds,
      typeId: event.target.value as number,
    });
  };

  const [submitPoint] = useMutation(SUBMIT_USER_POINT, {
    variables: {
      typeId: newPointCategoryTypeIds.typeId,
      userId: User.userId,
      name,
      description,
      geom: {
        type: 'Point',
        coordinates: Trail.newTrailPoint.point,
      },
    },
    refetchQueries: ['allUserPoints'],
    onCompleted: () =>
      Trail.setNewTrailPoint({
        type: undefined,
        subType: undefined,
        point: undefined,
      }),
  });
  const handleSubmit = () => {
    submitPoint();
  };

  return (
    <Grid className={classes.root} container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h4" display="inline" gutterBottom>
            {title()}
          </Typography>
          <Button
            style={{ marginLeft: 'auto', float: 'right' }}
            size="small"
            onClick={cancelPointSumbission}
          >
            <CancelIcon style={{ marginRight: 4 }} />
            Cancel
          </Button>
          {!fieldsValid().location && (
            <Typography variant="subtitle1">Tap Map to Add Point</Typography>
          )}
          {!userPointTypesLoading && (
            <FormControl variant="outlined">
              <Select
                variant="outlined"
                value={
                  newPointCategoryTypeIds.typeId === undefined
                    ? ''
                    : newPointCategoryTypeIds.typeId
                }
                onChange={updateSubType}
              >
                {Trail.newTrailPoint.type !== undefined &&
                  typeOptions(
                    userPointTypes.types_by_pk.types,
                    Trail.newTrailPoint.type!,
                  ).map(({ id, name }: any) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
          <TextField
            id="name"
            label="Name"
            value={name}
            onChange={handleNameChange}
            placeholder="Describe the issue"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="description"
            label="Details"
            multiline
            rows="5"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe the issue"
            variant="outlined"
            fullWidth
          />
          <div>
            <Button
              size="small"
              onClick={handleSubmit}
              disabled={!fieldsValid().all()}
              style={{ marginRight: 0 }}
            >
              Submit
              <SendIcon />
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewPointMenu;

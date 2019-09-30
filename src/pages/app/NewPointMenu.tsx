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
import { useQuery, useMutation } from '@apollo/react-hooks';
import TrailContext, { TrailContextProps } from '../../contexts/TrailContext';
import UserContext, { UserContextProps } from '../../contexts/UserContext';
// dropdown
// text form
// cancel button
// contact details - currently linkes to and requires user.
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
const USER_POINT_TYPES_QUERY = gql`
  {
    types_by_pk(id: 15) {
      types {
        name
        id
        types {
          name
          id
        }
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
  newPointCategoryTypeIds: [number | undefined, number | undefined];
  setNewPointCategoryTypeIds: (
    newPointCategoryTypeIds: [number | undefined, number | undefined],
  ) => void;
}

const NewPointMenu: React.FC<NewPointMenuProps> = ({
  newPointCategoryTypeIds,
  setNewPointCategoryTypeIds,
}) => {
  const classes = useStyles();
  const Trail = useContext(TrailContext);
  const User = useContext(UserContext);
  const { loading: userPointTypesLoading, data: userPointTypes } = useQuery(
    USER_POINT_TYPES_QUERY,
  );
  const typeId = (typeName: string) =>
    typeName === 'userIssue' ? 16 : typeName === 'userPoint' ? 17 : undefined;
  const typeOptions = (userPointTypes: any, typeId: number) => {
    return userPointTypes
      .find((type: any) => type.id === typeId)
      .types.map((type: any) => type);
  };
  const [subType, setSubType] = useState<number | undefined>(
    newPointCategoryTypeIds[1] !== undefined
      ? newPointCategoryTypeIds[1]
      : undefined,
  );
  useEffect(() => {
    if (!userPointTypesLoading && newPointCategoryTypeIds[1] == undefined) {
      setSubType(
        newPointCategoryTypeIds[0] !== undefined
          ? typeOptions(
              userPointTypes.types_by_pk.types,
              newPointCategoryTypeIds[0],
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
    Trail.newTrailPoint.type === 'userIssue'
      ? 'Submit Issue'
      : Trail.newTrailPoint.type === 'userPoint'
      ? 'Add Feature'
      : '';
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
    setSubType(event.target.value as number);
  };

  const [submitPoint] = useMutation(SUBMIT_USER_POINT, {
    variables: {
      typeId: subType,
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
                value={subType === undefined ? '' : subType}
                onChange={updateSubType}
              >
                {typeId(Trail.newTrailPoint.type!) !== undefined &&
                  typeOptions(
                    userPointTypes.types_by_pk.types,
                    typeId(Trail.newTrailPoint.type!)!,
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

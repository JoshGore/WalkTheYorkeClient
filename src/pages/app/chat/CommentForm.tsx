import React, { useState, useContext } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  ListItem,
} from '@material-ui/core';
import clsx from 'clsx';
import gql from 'graphql-tag';

import { useMutation } from '@apollo/react-hooks';
import TrailContext, {
  TrailContextProps,
} from '../../../contexts/TrailContext';
import UserContext, { UserContextProps } from '../../../contexts/UserContext';

interface CommentFormProps {
  commentThreadId?: number;
  showing: boolean;
  setShowing?: (showing: boolean) => void;
}

const ROUTE_MESSAGE_INSERT_QUERY = gql`
  mutation($route: Int!, $user: Int!, $body: String) {
    insert_route_comment(
      objects: {
        route_id: $route
        comment: { data: { body: $body, user_id: $user } }
      }
    ) {
      returning {
        comment {
          body
        }
      }
    }
  }
`;

const COMMENT_REPLY_INSERT_QUERY = gql`
  mutation insert_comments(
    $commentThreadId: Int!
    $userId: Int!
    $body: String
  ) {
    insert_comments(
      objects: { body: $body, comment_id: $commentThreadId, user_id: $userId }
    ) {
      returning {
        body
        user_id
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      '& fieldset': {
        borderRadius: '15px 15px 15px 15px',
      },
    },
    dense: {
      marginTop: theme.spacing(2),
    },
  }),
);

const CommentForm: React.FC<CommentFormProps> = ({
  commentThreadId,
  showing,
  setShowing = undefined,
}) => {
  const User = useContext<UserContextProps>(UserContext);
  const Trail = useContext<TrailContextProps>(TrailContext);
  const classes = useStyles();
  const [commentText, setCommentText] = useState('');
  const [commentOnObject] = useMutation(ROUTE_MESSAGE_INSERT_QUERY);
  const [replyToComment] = useMutation(COMMENT_REPLY_INSERT_QUERY);
  const [isIssue, setIsIssue] = useState(false);
  const onSubmitSucessful = () => {
    setCommentText('');
    if (setShowing !== undefined) {
      setShowing(false);
    }
  };
  const handleSubmit = () => {
    if (commentText) {
      if (commentThreadId === undefined) {
        commentOnObject({
          variables: {
            route: Trail.trailSection.id,
            user: User.userId,
            body: commentText,
          },
        }).then(() => onSubmitSucessful());
      } else {
        replyToComment({
          variables: {
            commentThreadId,
            userId: User.userId,
            body: commentText,
          },
        }).then(() => onSubmitSucessful());
      }
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.slice(0, 6) === '@issue') {
      setIsIssue(true);
      setCommentText(event.target.value.substr(6));
    } else {
      setCommentText(event.target.value);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    } else if (
      event.key === 'Backspace' &&
      !target.selectionStart &&
      !target.selectionEnd
    ) {
      setIsIssue(false);
    }
  };
  const handleIssueDelete = () => {
    setIsIssue(false);
  };
  if (showing) {
    return (
      <ListItem>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="outlined-dense-multiline"
              label="start with @issue to submit issue"
              className={clsx(classes.textField, classes.dense)}
              margin="dense"
              variant="outlined"
              multiline
              rowsMax="4"
              value={commentText}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: isIssue && (
                  <InputAdornment position="start">
                    <Chip
                      label="@issue"
                      size="small"
                      onDelete={handleIssueDelete}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </ListItem>
    );
  }
  return <></>;
};

export default CommentForm;

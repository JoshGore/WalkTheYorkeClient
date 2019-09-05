import React, { useState, useContext } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import {
  TextField,
  InputAdornment,
  Chip,
  Grid,
  ListItem,
  IconButton,
} from '@material-ui/core';
import clsx from 'clsx';
import gql from 'graphql-tag';

import { useMutation } from '@apollo/react-hooks';
import TrailContext, {
  TrailContextProps,
} from '../../../contexts/TrailContext';
import UserContext, { UserContextProps } from '../../../contexts/UserContext';
import {
  ROUTE_MESSAGE_INSERT_QUERY,
  COMMENT_REPLY_INSERT_QUERY,
} from '../../../queries/queries';

interface CommentFormProps {
  commentThreadId?: number;
  showing: boolean;
  setShowing?: (showing: boolean) => void;
}
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
  const [commentOnObject, { error: commentOnObjectError }] = useMutation(
    ROUTE_MESSAGE_INSERT_QUERY,
  );
  const [replyToComment, { error: replyToError }] = useMutation(
    COMMENT_REPLY_INSERT_QUERY,
  );
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
        <Grid container alignItems="flex-end">
          <Grid item xs>
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
          <Grid item>
            <IconButton onClick={handleSubmit}>
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
  return <></>;
};

export default CommentForm;

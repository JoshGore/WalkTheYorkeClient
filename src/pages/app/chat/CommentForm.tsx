import React, { useState, useContext } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, InputAdornment, Chip } from '@material-ui/core';
import clsx from 'clsx';
import gql from 'graphql-tag';

import { useMutation } from '@apollo/react-hooks';
import TrailContext, {
  TrailContextProps,
} from '../../../contexts/TrailContext';
import UserContext, { UserContextProps } from '../../../contexts/UserContext';

interface CommentFormProps {
  level: 1 | 2;
  commentId?: number;
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
  mutation insert_comments($commentId: Int!, $userId: Int!, $body: String) {
    insert_comments(
      objects: { body: $body, comment_id: $commentId, user_id: $userId }
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

const CommentForm: React.FC<CommentFormProps> = ({ commentId, level }) => {
  const User = useContext<UserContextProps>(UserContext);
  const Trail = useContext<TrailContextProps>(TrailContext);
  const classes = useStyles();
  const [commentText, setCommentText] = useState('');
  const [submitComment, { data }] = useMutation(ROUTE_MESSAGE_INSERT_QUERY);
  const [isIssue, setIsIssue] = useState(false);
  const handleSubmit = () => {
    if (commentText) {
      submitComment({
        variables: {
          route: Trail.trailSection.id,
          user: User.userId,
          body: commentText,
        },
      }).then(() => setCommentText(''));
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
  return (
    <>
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
              <Chip label="@issue" size="small" onDelete={handleIssueDelete} />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default CommentForm;

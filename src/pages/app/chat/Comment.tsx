import React, { useState } from 'react';
import {
  ListItem,
  Divider,
  Avatar,
  Typography,
  Link,
  Chip,
  Grid,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topLevelComment: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    secondLevelComment: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(2),
    },
    secondLevelCommentBorder: {
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
    secondLevelCommentDivider: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(2),
    },
    avatar: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(-2),
    },
    avatarInset: {
      marginTop: '5px',
      marginRight: theme.spacing(2),
      marginBottom: 0,
      marginLeft: theme.spacing(2),
    },
  }),
);

export interface CommentProps {
  level: 1 | 2;
  lastInThread?: boolean;
  firstname: string;
  lastname: string;
  body: string;
  id: number;
}

export const EndFirstLevelComment: React.FC = () => {
  const classes = useStyles();
  const replyToComment = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log('continuing conversation');
  };
  return (
    <>
      <Divider />
      <Link className={classes.avatarInset} href="/" onClick={replyToComment}>
        Reply
      </Link>
    </>
  );
};

const Comment: React.FC<CommentProps> = ({
  level,
  firstname,
  lastname,
  body,
  lastInThread = false,
}) => {
  const classes = useStyles();
  const replyToComment = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(event);
  };
  const [isIssue, setIsIssue] = useState(true);
  const deleteIssue = () => setIsIssue(false);
  const continueConversation = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log('continuing conversation');
  };
  return (
    <>
      <ListItem>
        <Grid
          container
          className={
            level === 1
              ? classes.topLevelComment
              : `${classes.secondLevelComment} ${classes.secondLevelCommentBorder}`
          }
        >
          <Grid
            className={level === 1 ? classes.avatar : classes.avatarInset}
            item
          >
            <Avatar>{`${firstname.charAt(0)}${lastname.charAt(0)}`}</Avatar>
          </Grid>
          <Grid item xs>
            <Typography
              variant="subtitle2"
              display="inline"
            >{`${firstname} ${lastname} `}</Typography>
            <Typography variant="subtitle2" display="inline">
              5 days ago
            </Typography>
            {isIssue && (
              <Chip size="small" label="@issue" onDelete={deleteIssue} />
            )}
            <Typography variant="body2">{body}</Typography>
            {level === 1 && (
              <Grid xs={12}>
                <Link href="./" onClick={replyToComment}>
                  reply
                </Link>
              </Grid>
            )}
          </Grid>
        </Grid>
      </ListItem>
      <Divider
        className={
          level === 1
            ? classes.topLevelComment
            : classes.secondLevelCommentDivider
        }
      />
      {lastInThread && (
        <Link
          className={classes.secondLevelCommentDivider}
          href="/"
          onClick={continueConversation}
        >
          Continue this thread...
        </Link>
      )}
    </>
  );
};

export default Comment;

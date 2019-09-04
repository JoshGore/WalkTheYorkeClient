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
import Moment from 'react-moment';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CommentForm from './CommentForm';

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
    chip: {
      marginLeft: theme.spacing(1),
    },
  }),
);

export interface CommentProps {
  level: 1 | 2;
  dateCreated: string;
  lastInThread?: boolean;
  firstname: string;
  lastname: string;
  body: string;
  commentThreadId: number;
}

const Comment: React.FC<CommentProps> = ({
  level,
  dateCreated,
  firstname,
  lastname,
  body,
  lastInThread = false,
  commentThreadId,
}) => {
  const [replyFormShown, setReplyFormShown] = useState(false);
  const classes = useStyles();
  const replyToComment = (event: React.MouseEvent) => {
    event.preventDefault();
    setReplyFormShown(true);
  };
  const [isIssue, setIsIssue] = useState(false);
  const deleteIssue = () => setIsIssue(false);
  return (
    <>
      <Divider
        className={
          level === 1
            ? classes.topLevelComment
            : classes.secondLevelCommentDivider
        }
      />
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
            <Typography
              variant="subtitle2"
              display="inline"
              color="textSecondary"
            >
              <i>
                <Moment
                  fromNowDuring={1000 * 60 * 60 * 24 * 7}
                  format="D MMM YY"
                >
                  {dateCreated}
                </Moment>
              </i>
            </Typography>
            {isIssue && (
              <Chip
                className={classes.chip}
                size="small"
                label="@issue"
                onDelete={deleteIssue}
              />
            )}
            <Typography variant="body2">{body}</Typography>
            {level === 1 && (
              <Grid item xs={12}>
                <Link href="./" onClick={replyToComment}>
                  reply
                </Link>
              </Grid>
            )}
          </Grid>
        </Grid>
      </ListItem>
      <CommentForm
        commentThreadId={commentThreadId}
        showing={level === 1 && replyFormShown}
        setShowing={setReplyFormShown}
      />
      {lastInThread && (
        <>
          <Divider
            className={
              level === 1
                ? classes.topLevelComment
                : classes.secondLevelCommentDivider
            }
          />
          <Link
            className={classes.secondLevelCommentDivider}
            href="/"
            onClick={replyToComment}
          >
            Continue this thread...
          </Link>
          <CommentForm
            commentThreadId={commentThreadId}
            showing={replyFormShown}
            setShowing={setReplyFormShown}
          />
        </>
      )}
    </>
  );
};

export default Comment;

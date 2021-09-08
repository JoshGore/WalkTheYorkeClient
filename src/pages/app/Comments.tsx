import React from 'react';
import { Grid, Paper, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CommentThread from './comments/CommentThread';
import CommentForm from './comments/CommentForm';

interface SubmitCommentProps {
  commentText: string;
  commentThreadId?: number | undefined;
}

interface CommentsProps {
  commentThreads: any[];
  submitComment: (options: SubmitCommentProps) => void;
  loggedIn: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#F5F5F5',
      padding: theme.spacing(2),
    },
  }),
);

const Comments: React.FC<CommentsProps> = ({
  commentThreads,
  submitComment,
  loggedIn,
}) => {
  const classes = useStyles({});
  return (
    <Grid className={classes.root} container>
      <Grid item xs={12}>
        <Paper>
          <List>
            <ListItem style={{ paddingBottom: 0, marginBottom: 0 }}>
              <Typography variant="h4">Comments and Issues</Typography>
            </ListItem>
            {loggedIn && <CommentForm submitComment={submitComment} />}
            {commentThreads.length > 0 ? (
              commentThreads.map(commentThread => (
                <CommentThread
                  submitComment={submitComment}
                  key={commentThread.comment.id}
                  commentThread={commentThread.comment}
                  loggedIn={loggedIn}
                />
              ))
            ) : (
              <ListItem>
                <Typography variant="body2">No Comments</Typography>
              </ListItem>
            )}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Comments;

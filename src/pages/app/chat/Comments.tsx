import React, { useContext } from 'react';
import { Grid, Paper, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CommentThread from './CommentThread';
import CommentForm from './CommentForm';
import TrailContext, {
  TrailContextProps,
} from '../../../contexts/TrailContext';
import {
  ROUTE_MESSAGE_SUBSCRIPTION_QUERY,
  ROUTE_MESSAGE_SUBSCRIPTION_QUERY_TYPES,
} from '../../../queries/queries';

interface CommentsProps {
  id: number;
  type: 'route' | 'point';
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#F5F5F5',
      padding: theme.spacing(2),
    },
  }),
);

const Comments: React.FC<CommentsProps> = ({ id, type }) => {
  // const Trail = useContext<TrailContextProps>(TrailContext);
  const classes = useStyles();
  const { data, loading } = useSubscription<
    ROUTE_MESSAGE_SUBSCRIPTION_QUERY_TYPES
  >(ROUTE_MESSAGE_SUBSCRIPTION_QUERY, {
    variables: { id },
  });
  return (
    <Grid className={classes.root} container>
      <Grid item xs={12}>
        <Paper>
          <List>
            <ListItem style={{ paddingBottom: 0, marginBottom: 0 }}>
              <Typography variant="h4">Comments</Typography>
            </ListItem>
            <CommentForm showing />
            {!loading &&
            data !== undefined &&
            data.routes_by_pk.route_comments.length > 0 ? (
              data.routes_by_pk.route_comments.map(commentThread => (
                <CommentThread
                  key={commentThread.comment.id}
                  commentThread={commentThread.comment}
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

import React, { useContext } from 'react';
import { Paper, List, ListItem, Typography } from '@material-ui/core';
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

const Comments: React.FC = () => {
  const Trail = useContext<TrailContextProps>(TrailContext);
  const { data, loading, error } = useSubscription<
    ROUTE_MESSAGE_SUBSCRIPTION_QUERY_TYPES
  >(ROUTE_MESSAGE_SUBSCRIPTION_QUERY, {
    variables: { id: Trail.currentTrailObject().id },
  });
  return (
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
  );
};

export default Comments;

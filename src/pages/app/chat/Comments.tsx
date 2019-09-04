import React, { useContext, useEffect } from 'react';
import { List, Paper } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import CommentThread from './CommentThread';
import CommentForm from './CommentForm';
import TrailContext, {
  TrailContextProps,
} from '../../../contexts/TrailContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const MESSAGE_SUBSCRIPTION_QUERY = gql`
  subscription($id: Int!) {
    routes_by_pk(id: $id) {
      route_comments(order_by: { comment: { created_at: asc } }) {
        comment {
          created_at
          body
          id
          user {
            firstname
            lastname
            id
          }
          comments {
            created_at
            body
            id
            user {
              firstname
              lastname
              id
            }
          }
        }
      }
    }
  }
`;

interface comments {
  routes_by_pk: {
    route_comments: {
      comment: {
        created_at: string;
        body: string;
        id: number;
        user: {
          firstname: string;
          lastname: string;
          id: number;
        };
        comments: {
          comment: {
            id: number;
            body: string;
            created_at: string;
            user: {
              firstname: string;
              lastname: string;
              id: number;
            };
          };
        }[];
      };
    }[];
  };
}

const Comments: React.FC = () => {
  const Trail = useContext<TrailContextProps>(TrailContext);
  const { data, loading } = useSubscription<comments>(
    MESSAGE_SUBSCRIPTION_QUERY,
    {
      variables: { id: Trail.currentTrailObject().id },
    },
  );
  useEffect(() => console.log(data));
  const classes = useStyles();
  return (
    <Paper>
      <List className={classes.root}>
        <CommentForm level={1} />
        {!loading &&
          data !== undefined &&
          data.routes_by_pk.route_comments.map(commentThread => (
            <CommentThread
              key={commentThread.comment.id}
              commentThread={commentThread.comment}
            />
          ))}
      </List>
    </Paper>
  );
};

export default Comments;
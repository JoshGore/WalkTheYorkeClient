import React, { useContext, useEffect } from 'react';
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import TrailContext, { TrailContextProps, TrailEntityTypes } from '../../../contexts/TrailContext';
import UserContext, { UserContextProps } from '../../../contexts/UserContext';
import Comment from './Comment';

const MESSAGE_SUBSCRIPTION_QUERY = gql`
subscription ($id:Int!) {
  routes_by_pk(id: $id) {
    route_comments(order_by: {comment: {created_at: asc}}) {
      comment {
        user {
          firstname
          lastname
          id
        }
        created_at
        body
        id
      }
    }
  }
}`;

interface comment {
  comment: {
    id: number,
    user: {
      firstname: string,
      lastname: string,
      id: number,
    }
    created_at: string,
    body: string,
  }
}

interface comments {
  routes_by_pk: {
    route_comments: comment[],
  }
}

const Comments: React.FC = () => {
  const Trail = useContext<TrailContextProps>(TrailContext);
  const User = useContext<UserContextProps>(UserContext);
  const {
    data, loading,
  } = useSubscription<comments>(MESSAGE_SUBSCRIPTION_QUERY,
    {
      variables: { id: Trail.currentTrailObject().id },
    });
  return (
    <>
      {!loading
      && data!.routes_by_pk.route_comments.map(comment => (
        <Comment
          key={comment.comment.id}
          fromUser={User.userId === comment.comment.user.id}
          comment={comment.comment.body}
          user={comment.comment.user}
        />
      ))}
    </>
  );
};

export default Comments;

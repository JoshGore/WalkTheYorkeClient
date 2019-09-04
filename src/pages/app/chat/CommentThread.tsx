import React from 'react';
import Comment from './Comment';

interface CommentProps {
  id: number;
  body: string;
  created_at: string;
  user: {
    firstname: string;
    lastname: string;
    id: number;
  };
}

export interface CommentThreadProps {
  commentThread: {
    id: number;
    body: string;
    created_at: string;
    user: {
      firstname: string;
      lastname: string;
      id: number;
    };
    comments: { comment: CommentProps }[];
  };
}

// <Comment level={1} firstname="Joshua" lastname="Gore" body={lorem} />
const CommentThread: React.FC<CommentThreadProps> = ({ commentThread }) => {
  console.log(commentThread);
  return (
    <>
      <Comment
        level={1}
        firstname={commentThread.user.firstname}
        lastname={commentThread.user.lastname}
        body={commentThread.body}
        id={commentThread.id}
      />
      {commentThread.comments.map(({ comment }, index, comments) => (
        <Comment
          key={comment.id}
          level={2}
          firstname={comment.user.firstname}
          lastname={comment.user.lastname}
          body={comment.body}
          id={comment.id}
          lastInThread={index === comments.length - 1}
        />
      ))}
    </>
  );
};

export default CommentThread;

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

interface SubmitCommentProps {
  commentText: string;
  commentThreadId?: number | undefined;
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
    comments: CommentProps[];
  };
  submitComment: (options: SubmitCommentProps) => void;
  loggedIn: boolean;
}

const CommentThread: React.FC<CommentThreadProps> = ({
  commentThread,
  submitComment,
  loggedIn,
}) => {
  return (
    <>
      <Comment
        level={1}
        dateCreated={commentThread.created_at}
        firstname={commentThread.user.firstname}
        lastname={commentThread.user.lastname}
        body={commentThread.body}
        commentThreadId={commentThread.id}
        submitComment={submitComment}
        loggedIn={loggedIn}
      />
      {commentThread.comments.map((comment, index, comments) => (
        <Comment
          key={comment.id}
          level={2}
          dateCreated={comment.created_at}
          firstname={comment.user.firstname}
          lastname={comment.user.lastname}
          body={comment.body}
          commentThreadId={commentThread.id}
          lastInThread={index === comments.length - 1}
          submitComment={submitComment}
          loggedIn={loggedIn}
        />
      ))}
    </>
  );
};

export default CommentThread;

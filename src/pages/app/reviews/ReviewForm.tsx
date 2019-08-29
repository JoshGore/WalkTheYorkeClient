import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, CircularProgress,
} from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const ReviewForm: React.FC = () => {
  const [submitReview, { data }] = useMutation(gql`
    mutation ($route_id: Int!, $user_id: Int!, $rating: Int!, $review: String!) {
      insert_route_review(objects: {route_id: $route_id, review: {data: {body: $review, rating: $rating, user_id: $user_id}}}) {
        returning {
          review {
            rating
            body
          }
        }
      }
    }
  `);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const handleAddReview = () => {
    setShowReviewForm(true);
  };
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const handleRatingChange = (event: React.ChangeEvent<any>, value: number) => {
    setRating(value);
  };
  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };
  const handleClose = () => {
    setShowReviewForm(false);
    setRating(3);
    setReview('');
  };
  const handleSubmit = () => {
    setSubmitting(true);
    submitReview({
      variables: {
        route_id: 10,
        user_id: localStorage.getItem('userId'),
        rating,
        review,
      },
    }).then(() => {
      setSubmitting(false);
    });
  };
  return (
    <>
      <Button variant="outlined" onClick={handleAddReview}>
        <CreateIcon style={{ marginRight: 4 }} />
          Write review
      </Button>
      <Dialog open={showReviewForm}>
        <DialogTitle>
            Add Review
        </DialogTitle>
        <DialogContent>
          <Rating value={rating} onChange={handleRatingChange} />
          <TextField onChange={handleReviewChange} id="review" placeholder="Share the details of your experiences" multiline rows="5" variant="filled" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <div style={{ position: 'relative' }}>
            <Button color="primary" disabled={submitting} onClick={handleSubmit}>
            Submit
            </Button>
            {submitting && (
            <CircularProgress
              size={24}
              style={{
                position: 'absolute', top: '50%', left: '50%', marginTop: -12, marginLeft: -12,
              }}
            />
            )}
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReviewForm;

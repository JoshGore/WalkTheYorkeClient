import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';

interface ReviewFormProps {
  submitReview: ({ review, rating }: { review: string; rating: number }) => any;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ submitReview }) => {
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
    submitReview({ review, rating }).then(() => {
      setShowReviewForm(false);
      setSubmitting(false);
    });
  };
  return (
    <>
      <Button
        style={{ marginLeft: 'auto', float: 'right' }}
        size="small"
        onClick={handleAddReview}
      >
        <CreateIcon style={{ marginRight: 4 }} />
        Write Review
      </Button>
      <Dialog open={showReviewForm}>
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <Rating name="rating" value={rating} onChange={handleRatingChange} />
          <TextField
            name="details"
            onChange={handleReviewChange}
            id="review"
            placeholder="Share the details of your experiences"
            multiline
            rows="5"
            variant="filled"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <div style={{ position: 'relative' }}>
            <Button
              color="primary"
              disabled={submitting}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            {submitting && (
              <CircularProgress
                size={24}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: -12,
                  marginLeft: -12,
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

import React, { useEffect, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
// list stuff
// End List Stuff

const ReviewSummary: React.FC<any> = ({ reviews = [] }) => {
  const averageReview: any = () => {
    if (reviews.length > 0) {
      return (
        Math.round(
          (reviews.reduce(
            (average: any, review: any) => (average += parseInt(review.rating)),
            0
          ) /
            reviews.length) *
            10
        ) / 10
      );
    }
    return 0;
  };
  return (
    <>
      {reviews.length > 0 && (
        <>
          <Typography variant='caption'>{`${reviews.length} reviews`}</Typography>
          <Rating
            value={averageReview()}
            precision={0.1}
            size='small'
            readOnly
          />
        </>
      )}
    </>
  );
};
export default ReviewSummary;

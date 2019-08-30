import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

interface ReviewSummaryProps {
  count: number;
  average: number;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({ count, average }) => {
  const fixedPlaces = (value: number) => Math.round(value * 10) / 10;
  return (
    <>
      <Typography variant="caption">{`${count} reviews`}</Typography>
      <Rating
        value={fixedPlaces(average)}
        precision={0.1}
        size="small"
        readOnly
      />
    </>
  );
};
export default ReviewSummary;

import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

const ReviewSummary: React.FC<any> = ({ count, average }) => {
  const fixedPlaces: any = (value: any) => Math.round(value * 10) / 10;
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

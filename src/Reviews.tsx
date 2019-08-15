import React, { useEffect, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
// list stuff
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  })
);
// End List Stuff

const Reviews: React.FC<any> = ({ reviews = [] }) => {
  const classes = useStyles();
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
          <Typography variant='h4'>Reviews</Typography>
          <List className={classes.root}>
            {reviews.map((review: any) => (
              <ListItem alignItems='flex-start' key={review.title}>
                <ListItemAvatar>
                  <Avatar>{`${review.user.firstName.charAt(
                    0
                  )}${review.user.lastName.charAt(0)}`}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  disableTypography={true}
                  primary={
                    <Typography className={'MuiListItemText-primary'}>
                      {`${review.user.firstName} ${review.user.lastName}`}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='span'
                      >
                        <div style={{ display: 'inline-block' }}>
                          <Rating value={review.rating} size='small' readOnly />
                        </div>
                        {review.body}
                      </Typography>
                    </>
                  }
                ></ListItemText>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
};
export default Reviews;

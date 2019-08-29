import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  List, ListItem, ListItemText, ListItemAvatar, Avatar,
} from '@material-ui/core';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ReviewForm from './reviews/ReviewForm';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

interface ReviewsProps {
  id: number;
}

const Reviews: React.FC<ReviewsProps> = ({ id }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(
    gql`
      query($id: Int!) {
        reviews(where: { route_review: { route_id: { _eq: $id } } }) {
          rating
          body
          id
          created_at
          user {
            firstname
            lastname
          }
        }
      }
    `,
    {
      variables: { id },
      onCompleted: () => {
      },
    },
  );
  if (!loading && data.reviews.length > 0) {
    return (
      <>
        <span>
          <Typography variant="h4">Reviews</Typography>
          <ReviewForm />
        </span>
        <List className={classes.root}>
          {data.reviews.map((review: any) => (
            <ListItem alignItems="flex-start" key={review.id}>
              <ListItemAvatar>
                <Avatar>
                  {`${review.user.firstname.charAt(
                    0,
                  )}${review.user.lastname.charAt(0)}`}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={(
                  <Typography className="MuiListItemText-primary">
                    {`${review.user.firstname} ${review.user.lastname}`}
                  </Typography>
                  )}
                secondary={(
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="span"
                  >
                    <div style={{ display: 'inline-block' }}>
                      <Rating value={review.rating} size="small" readOnly />
                    </div>
                    {review.body}
                  </Typography>
                  )}
              />
            </ListItem>
          ))}
        </List>
      </>
    );
  }
  return (
    <></>
  );
};
export default Reviews;

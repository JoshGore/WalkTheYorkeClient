import React, { useState, useContext } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  List, ListItem, ListItemText, ListItemAvatar, Avatar,
} from '@material-ui/core';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ReviewForm from './reviews/ReviewForm';
import TrailContext, { TrailContextProps } from '../../contexts/TrailContext';
import UserContext, { UserContextProps } from '../../contexts/UserContext';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

interface ReviewProps {
  rating: number;
  body: string;
  id: number;
  created_at: any;
  user: {
    firstname: string,
    lastname: string
  }
}

interface ReviewQueryData {
  reviews: ReviewProps [];
}

interface ReviewQueryVars {
  id: number;
}

export const REVIEWS_QUERY = gql`
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
`;

const Reviews: React.FC = () => {
  const Trail = useContext<TrailContextProps>(TrailContext);
  const User = useContext<UserContextProps>(UserContext);
  const classes = useStyles();
  const { loading, error, data } = useQuery<ReviewQueryData, ReviewQueryVars>(REVIEWS_QUERY,
    {
      variables: { id: Trail.trailSection.id! },
      skip: !Trail.trailSection.id,
    });
  return (
    <>
    {User.loggedIn && <span>
      <Typography variant="h4">Reviews</Typography>
      <ReviewForm />
      </span>}
      {(!loading && !!data && !!data.reviews && data.reviews.length > 0)
        && (
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
        )}
    </>
  );
};
export default Reviews;

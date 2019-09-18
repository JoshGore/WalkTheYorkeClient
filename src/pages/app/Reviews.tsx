import React, { useState, useContext } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
} from '@material-ui/core';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import ReviewForm from './reviews/ReviewForm';
import {
  ROUTE_REVIEWS_QUERY,
  POINT_REVIEWS_QUERY,
  ReviewQueryVars,
  ReviewQueryData,
} from '../../queries/queries';
// import TrailContext, { TrailContextProps } from '../../contexts/TrailContext';
import UserContext, { UserContextProps } from '../../contexts/UserContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#F5F5F5',
      padding: theme.spacing(0, 2),
    },
    paper: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);

interface ReviewsProps {
  id: number;
  // queryType: 'route' | 'point';
  queryType: string;
}

const Reviews: React.FC<ReviewsProps> = ({ id, queryType }) => {
  // const Trail = useContext<TrailContextProps>(TrailContext);
  const User = useContext<UserContextProps>(UserContext);
  const classes = useStyles();
  const { loading: routeReviewsLoading, data: routeReviews } = useQuery<
    ReviewQueryData,
    ReviewQueryVars
  >(ROUTE_REVIEWS_QUERY, {
    variables: { id },
    skip: queryType !== 'route',
  });
  const { loading: pointReviewsLoading, data: pointReviews } = useQuery<
    ReviewQueryData,
    ReviewQueryVars
  >(POINT_REVIEWS_QUERY, {
    variables: { id },
    skip: queryType !== 'point',
  });
  const reviews = () =>
    queryType === 'route'
      ? !routeReviewsLoading &&
        !!routeReviews &&
        !!routeReviews.reviews &&
        routeReviews.reviews.length > 0
        ? routeReviews.reviews
        : undefined
      : !pointReviewsLoading &&
        !!pointReviews &&
        !!pointReviews.reviews &&
        pointReviews.reviews.length > 0
      ? pointReviews.reviews
      : undefined;
  return (
    <Grid className={classes.root} container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <List>
            <ListItem>
              <Typography variant="h4" display="inline">
                Reviews
              </Typography>
              {User.loggedIn && <ReviewForm />}
            </ListItem>
            {reviews() !== undefined ? (
              reviews()!.map((review: any) => (
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
                    primary={
                      <Typography className="MuiListItemText-primary">
                        {`${review.user.firstname} ${review.user.lastname}`}
                      </Typography>
                    }
                    secondary={
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
                    }
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Typography variant="body2">No Reviews</Typography>
              </ListItem>
            )}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Reviews;

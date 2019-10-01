import React from 'react';
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

import ReviewForm from './reviews/ReviewForm';

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

interface SubmitReviewProps {
  review: string;
  rating: number;
}

interface ReviewsProps {
  reviews: any[];
  loggedIn: boolean;
  submitReview: (options: SubmitReviewProps) => void;
}

const Reviews: React.FC<ReviewsProps> = ({
  submitReview,
  reviews,
  loggedIn,
}) => {
  const classes = useStyles();
  return (
    <Grid className={classes.root} container>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <List>
            <ListItem>
              <Typography variant="h4" display="inline">
                Reviews
              </Typography>
              {loggedIn && <ReviewForm submitReview={submitReview} />}
            </ListItem>
            {reviews.length > 0 ? (
              reviews.map((review: any) => (
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

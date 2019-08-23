import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
// list stuff
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const Reviews: React.FC<any> = ({ id }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(
    gql`
      query($id: Int!) {
        reviews(where: { route_review: { route_id: { _eq: $id } } }) {
          rating
          body
          id
          created_at
        }
      }
    `,
    {
      variables: { id },
      onCompleted: () => {
      },
    },
  );
  return (
    <>
      {!loading && data.reviews.length > 0 && (
        <>
          <Typography variant="h4">Reviews</Typography>
          <List className={classes.root}>
            {data.reviews.map((review: any) => (
              <ListItem alignItems="flex-start" key={review.id}>
                <ListItemAvatar>
                  <Avatar>
                    FP
                  </Avatar>
                </ListItemAvatar>
                { /*
                <ListItemAvatar>
                  <Avatar>
                    {`${review.user.firstName.charAt(
                      0,
                    )}${review.user.lastName.charAt(0)}`}
                  </Avatar>
                </ListItemAvatar>
                     */ }
                <ListItemText
                  disableTypography
                  primary={(
                    <Typography className="MuiListItemText-primary">
                      { /* {`${review.user.firstName} ${review.user.lastName}`} */ }
                        Frontend Placeholder
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
      )}
    </>
  );
};
export default Reviews;

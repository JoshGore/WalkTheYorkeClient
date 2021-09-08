import React from 'react';
import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Paper,
  Grid,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import DownloadMenu from './DownloadMenu';
import Markdown from '../../components/Markdown';
import Reviews from './Reviews';
import ReviewSummary from './reviews/ReviewSummary';
import Comments from './Comments';
import Carousel from '../../components/Carousel';

interface SubmitCommentProps {
  commentText: string;
  commentThreadId?: number | undefined;
}

interface SubmitReviewProps {
  review: string;
  rating: number;
}

interface BodyProps {
  loading: boolean;
  title: string | undefined;
  body: string | undefined;
  multimedia: Multimedium[] | undefined;
  files: File[] | undefined;
  count: number | undefined;
  avgRating: number | undefined;
  id: number;
  showDownloads?: boolean;
  showReviews?: boolean;
  showComments?: boolean;
  // queryType: 'route' | 'point';
  queryType: string;
  commentThreads?: any[];
  reviews?: any[];
  loggedIn: boolean;
  submitComment: (options: SubmitCommentProps) => void;
  submitReview: (options: SubmitReviewProps) => void;
  user: {
    firstname: string | undefined;
    lastname: string | undefined;
  };
}

interface Multimedium {
  multimedium: {
    id: number;
    name: string;
    link: string;
  };
}

interface File {
  file: {
    id: number;
    name: string;
    link: string;
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    markdown: {
      ...theme.typography.body2,
      padding: theme.spacing(1, 0),
    },
    root: {
      backgroundColor: '#F5F5F5',
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
    },
  }),
);

interface LoadingOrTextProps {
  loading: boolean;
  text: string | undefined;
}

const BodyTextSkeleton: React.FC = () => (
  <>
    <Skeleton width="90%" height={10} />
    <Skeleton width="95%" height={10} />
    <Skeleton width="80%" height={10} />
    <Skeleton width="90%" height={10} />
    <Skeleton width="40%" height={10} />
  </>
);

const BodyText: React.FC<LoadingOrTextProps> = ({ loading, text }) => {
  const classes = useStyles({});
  return loading ? (
    <BodyTextSkeleton />
  ) : (
    <Markdown className={classes.markdown}>{text}</Markdown>
  );
};

const BodyTitle: React.FC<LoadingOrTextProps> = ({ loading, text }) =>
  loading ? (
    <Skeleton width="70%" height={30} />
  ) : (
    <Typography variant="h4" gutterBottom>
      {text}
    </Typography>
  );

const DisplayDetails: React.FC<BodyProps> = ({
  loading,
  title = '',
  body = '',
  multimedia = [],
  files = [],
  count = 0,
  avgRating = 0,
  id,
  showDownloads = true,
  showReviews = true,
  showComments = true,
  queryType,
  commentThreads = [],
  reviews = [],
  loggedIn,
  submitComment,
  submitReview,
  user,
}) => {
  const classes = useStyles({});
  return (
    <>
      <Carousel multimedia={multimedia} loading={loading} />
      <Grid className={classes.root} container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <BodyTitle loading={loading} text={title} />
            {user.firstname !== undefined && (
              <Typography variant="subtitle2">{`submitted by ${user.firstname} ${user.lastname}`}</Typography>
            )}
            {!loading && showDownloads && <DownloadMenu links={files!} />}
            {!loading && showReviews && (
              <ReviewSummary count={count} average={avgRating} />
            )}
            {body && <BodyText loading={loading} text={body} />}
          </Paper>
        </Grid>
      </Grid>
      {showReviews && (
        <Reviews
          reviews={reviews}
          loggedIn={loggedIn}
          submitReview={submitReview}
        />
      )}
      {showComments && (
        <Comments
          commentThreads={commentThreads}
          submitComment={submitComment}
          loggedIn={loggedIn}
        />
      )}
    </>
  );
};

export default DisplayDetails;

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
import Comments from './chat/Comments';
import Carousel from '../../components/Carousel';

interface BodyProps {
  loading: boolean;
  title: string | undefined;
  body: string | undefined;
  multimedia: Multimedium[] | undefined;
  files: File[] | undefined;
  count: number | undefined;
  avgRating: number | undefined;
  id: number;
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
  const classes = useStyles();
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

const RouteBody: React.FC<BodyProps> = ({
  loading,
  title = '',
  body = '',
  multimedia = [],
  files = [],
  count = 0,
  avgRating = 0,
  id,
}) => {
  const classes = useStyles();
  return (
    <>
      <Carousel multimedia={multimedia} loading={loading} />
      <Grid className={classes.root} container>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <BodyTitle loading={loading} text={title} />
            {!loading && <DownloadMenu links={files!} />}
            {!loading && <ReviewSummary count={count} average={avgRating} />}
            <BodyText loading={loading} text={body} />
          </Paper>
        </Grid>
      </Grid>
      <Reviews id={id} type="route" />
      <Comments id={id} type="route" />
    </>
  );
};

export default RouteBody;

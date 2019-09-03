import React from 'react';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import DownloadMenu from './DownloadMenu';
import Markdown from '../../components/Markdown';
import Reviews from './Reviews';
import ReviewSummary from './reviews/ReviewSummary';
import Chat from './Chat';
import Carousel from '../../components/Carousel';

interface BodyProps {
  loading: boolean;
  title: string | undefined;
  body: string | undefined;
  multimedia: Multimedium[] | undefined;
  files: File[] | undefined;
  count: number | undefined;
  avgRating: number | undefined;
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

const Body: React.FC<BodyProps> = ({
  loading,
  title = '',
  body = '',
  multimedia = [],
  files = [],
  count = 0,
  avgRating = 0,
}) => (
  <>
    <Carousel multimedia={multimedia} loading={loading} />
    <div style={{ padding: 12 }}>
      <BodyTitle loading={loading} text={title} />
      {!loading && <DownloadMenu links={files!} />}
      {!loading && <ReviewSummary count={count} average={avgRating} />}
      <BodyText loading={loading} text={body} />
    </div>
    <Reviews />
    <Chat />
  </>
);

export default Body;

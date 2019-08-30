import React, { useState, useEffect, useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
  RouteComponentProps, Link as RouterLink, BrowserRouter as Router, Route,
} from 'react-router-dom';
import {
  Breadcrumbs, Typography, makeStyles, createStyles, Theme,
} from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';
import useWindowSize from '../utils/WindowSize';
import Map from './app/Map';
import { TrailSectionProps, TrailObjectProps } from './types';
import MenuContainer from './app/menu/MenuContainer';
import DownloadMenu from './app/DownloadMenu';
import Markdown from '../components/Markdown';
import Reviews from './app/Reviews';
import ReviewSummary from './app/reviews/ReviewSummary';
import Chat from './app/Chat';
import UserContext, { UserProps } from '../contexts/UserContext';
import SignupLogin from './SignupLogin';
import Carousel from '../components/Carousel';
import CornerAvatar from './signupLogin/CornerAvatar';

const WTY_TRAIL_ID = 18;
const WTY_NAME = 'Walk the Yorke';
const WTY_SHORT_NAME = 'Home';

type MenuModes = 'side' | 'bottom';

interface AppProps {
  RouteProps: RouteComponentProps<{id: string, type: string}>;
}

interface MenuProps {
  menuMode: MenuModes;
  trailSection: TrailSectionProps;
  setTrailSection: (trailSection: TrailSectionProps) => void;
  trailObject: TrailObjectProps;
  setTrailObject: (trailObject: TrailObjectProps) => void;
  trailId: number;
}

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
  }
}

interface File {
    file: {
        id: number,
        name: string,
        link: string
    }
}

interface RouteDetails {
  routes_by_pk: {
    id: number;
    short_title: string;
    title: string;
    body: string
    route_multimedia: Multimedium[]
    route_files: File[]
  };
  reviews_aggregate: {
    aggregate: {
      avg: {
        rating: number
      }
      count: number
    }
  };
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    overflow: 'hidden',
  },
  portrait: {
    flexWrap: 'nowrap',
    flexDirection: 'column',
  },
  landscape: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(1, 0),
  },
}));

const ROUTE_QUERY = gql`
  query($id: Int!) {
    routes_by_pk(id: $id) {
      id
      short_title
      title
      body
      route_multimedia {
        multimedium {
          id
          name
          link
        }
      }
      route_files {
        file {
          id
          name
          link
        }
      }
    }
    reviews_aggregate(where: { route_review: { route_id: { _eq: $id } } }) {
      aggregate {
        avg {
          rating
        }
        count
      }
    }
  }
`;

interface BodyTextProps {
  loading: boolean;
  body: string | undefined;
}

const BodyText: React.FC<BodyTextProps> = ({ loading, body }) => {
  const classes = useStyles();
  return (
    loading ? (
      <>
        <Skeleton width="90%" height={10} />
        <Skeleton width="95%" height={10} />
        <Skeleton width="80%" height={10} />
        <Skeleton width="90%" height={10} />
        <Skeleton width="40%" height={10} />
      </>
    ) : (
      <Markdown className={classes.markdown}>{body}</Markdown>
    )
  );
};

const Body: React.FC<BodyProps> = ({
  loading, title, body, multimedia, files, count, avgRating,
}) => (
  <>
    <Carousel multimedia={multimedia} loading={loading} />
    <div style={{ padding: 12 }}>
      {loading ? (
        <Skeleton width="70%" height={30} />
      ) : (
        <Typography variant="h4" gutterBottom>{title}</Typography>
      )}
      {!loading && !!files!.length && <DownloadMenu links={files!} />}
      {!loading && (
        <ReviewSummary
          count={count !== undefined ? count : 0}
          average={count !== undefined ? count : 0}
        />
      )}
      <BodyText loading={loading} body={body} />
    </div>
  </>
);

const App: React.FC<AppProps> = ({ RouteProps }) => {
  const classes = useStyles();
  const windowSize = useWindowSize();
  const User = useContext<UserProps>(UserContext);
  const [menuMode, setMenuMode] = useState<MenuModes>('side');
  const [trailSection, setTrailSection] = useState<TrailSectionProps>({
    name: WTY_NAME, shortName: WTY_SHORT_NAME, id: WTY_TRAIL_ID, type: 'trail',
  });
  const [trailObject, setTrailObject] = useState<TrailObjectProps>({
    name: undefined, id: undefined, type: undefined,
  });
  const [trailId, setTrailId] = useState(WTY_TRAIL_ID);
  const {
    loading: selectionInfoLoading,
    error: selectionInfoError, data: selectionInfo,
  } = useQuery<RouteDetails>(ROUTE_QUERY,
    {
      variables: { id: trailSection.id },
    });
  useEffect(() => {
    RouteProps.history.listen(() => {
      if (RouteProps.match.params.id !== undefined) {
        setTrailSection({ ...trailSection, id: parseInt(RouteProps.match.params.id, 10) });
      } else {
        setTrailSection({ ...trailSection, id: trailId });
      }
      console.log(`Trail Section is :${trailSection.id}`);
    });
  }, []);
  useEffect(() => {
    if (windowSize.innerHeight > windowSize.innerWidth) {
      setMenuMode('bottom');
    } else {
      setMenuMode('side');
    }
  });
  return (
    <MenuContainer
      header={(
        <Router>
          <Breadcrumbs
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
          />
        </Router>
      )}
      body={(
        <>
          <Body
            loading={selectionInfoLoading}
            title={!selectionInfoLoading ? selectionInfo!.routes_by_pk.title : undefined}
            body={!selectionInfoLoading ? selectionInfo!.routes_by_pk.body : undefined}
            multimedia={!selectionInfoLoading ? selectionInfo!.routes_by_pk.route_multimedia : undefined}
            files={!selectionInfoLoading ? selectionInfo!.routes_by_pk.route_files : undefined}
            count={!selectionInfoLoading ? selectionInfo!.reviews_aggregate.aggregate.count : undefined}
            avgRating={!selectionInfoLoading ? selectionInfo!.reviews_aggregate.aggregate.avg.rating : undefined}
          />
          <div style={{ padding: 12 }}>
            <Reviews id={trailSection.id} />
            <Chat id={trailSection.id} />
          </div>
        </>
      )}
      mode={menuMode}
      mainContent={(
        <>
          <SignupLogin />
          <CornerAvatar />
          <Map
            trailSection={trailSection}
            setTrailSection={setTrailSection}
            trailObject={trailObject}
            setTrailObject={setTrailObject}
            trailId={trailId}
          />
        </>
      )}
    />
  );
};

export default App;

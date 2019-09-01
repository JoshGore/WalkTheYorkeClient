import React, {
  useState, useEffect, useLayoutEffect, useContext,
} from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
  Breadcrumbs, Typography, makeStyles, createStyles, Theme, Link,
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
import UserContext, { UserContextProps } from '../contexts/UserContext';
import TrailContext, { TrailContextProps, TrailEntityTypes } from '../contexts/TrailContext';
import SignupLogin from './SignupLogin';
import Carousel from '../components/Carousel';
import CornerAvatar from './signupLogin/CornerAvatar';

type MenuModes = 'side' | 'bottom';

interface BreadcrumbsLink {
  name: string;
  url: string;
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

interface RouteDetailQueryData {
  routes_by_pk: {
    id: number,
    short_title: string,
    title: string,
    body: string,
    typeByType: {
      name: TrailEntityTypes
    },
    route_multimedia: Multimedium[],
    route_files: File[],
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

interface RouteDetailQueryVars {
  id: number;
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
      typeByType {
        name
      }
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

      body ? (<Markdown className={classes.markdown}>{body}</Markdown>) : (<div />)
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
      {!loading && !!files && !!files.length && <DownloadMenu links={files!} />}
      {!loading && (
        <ReviewSummary
          count={count !== undefined ? count : 0}
          average={avgRating !== undefined ? avgRating : 0}
        />
      )}
      <BodyText loading={loading} body={body} />
    </div>
  </>
);

const App: React.FC = () => {
  const classes = useStyles();
  const windowSize = useWindowSize();
  const User = useContext<UserContextProps>(UserContext);
  const Trail = useContext<TrailContextProps>(TrailContext);
  const [menuMode, setMenuMode] = useState<MenuModes>(window.innerHeight > window.innerWidth ? 'bottom' : 'side');

  const {
    loading: selectionInfoLoading,
    error: selectionInfoError, data: selectionInfo,
  } = useQuery<RouteDetailQueryData, RouteDetailQueryVars>(ROUTE_QUERY, {
    variables: { id: Trail.trailSection.id! },
    skip: !Trail.trailSection.id,
  });

  useEffect(() => {
    if (!selectionInfoLoading && Trail.trailSection.id) {
      Trail.setTrailSection({
        id: selectionInfo && selectionInfo.routes_by_pk && selectionInfo.routes_by_pk.id,
        name: selectionInfo && selectionInfo.routes_by_pk && selectionInfo.routes_by_pk.title,
        shortName: selectionInfo && selectionInfo.routes_by_pk && selectionInfo.routes_by_pk.short_title,
        type: selectionInfo && selectionInfo.routes_by_pk && selectionInfo.routes_by_pk.typeByType.name,
      });
    } else if (!selectionInfoLoading && !Trail.trailSection.id) {
      Trail.setTrailSection({
        ...Trail.trail,
      });
    }
  }, [selectionInfoLoading, Trail.trailSection.id]);

  useLayoutEffect(() => {
    if (windowSize.innerHeight > windowSize.innerWidth) {
      setMenuMode('bottom');
    } else {
      setMenuMode('side');
    }
  });

  const handleHomeLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    Trail.setTrailSection({ ...Trail.trail });
  };

  return (
    <MenuContainer
      header={
        Trail.trailSection.type === 'trail' || Trail.trailSection.type === undefined ? (
          <Breadcrumbs style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <Typography color="textPrimary">Home</Typography>
          </Breadcrumbs>
        ) : (
          <Breadcrumbs style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <Link href="/" onClick={handleHomeLinkClick}>Home</Link>
            <Typography color="textPrimary">{Trail.trailSection.shortName}</Typography>
          </Breadcrumbs>
        )
          }
      body={(
        <>
          <Body
            loading={selectionInfoLoading}
            title={Trail.trailSection.name}
            body={!selectionInfoLoading && !!selectionInfo ? selectionInfo.routes_by_pk.body : undefined}
            multimedia={!selectionInfoLoading && !!selectionInfo ? selectionInfo.routes_by_pk.route_multimedia : undefined}
            files={!selectionInfoLoading && !!selectionInfo ? selectionInfo.routes_by_pk.route_files : undefined}
            count={!selectionInfoLoading && !!selectionInfo ? selectionInfo.reviews_aggregate.aggregate.count : undefined}
            avgRating={!selectionInfoLoading && !!selectionInfo ? selectionInfo.reviews_aggregate.aggregate.avg.rating : undefined}
          />
          <div style={{ padding: 12 }}>
            <Reviews />
            <Chat />
          </div>
        </>
        )}
      mode={menuMode}
      mainContent={(
        <>
          <SignupLogin />
          <CornerAvatar />
          <Map />
        </>
        )}
    />
  );
};

export default App;

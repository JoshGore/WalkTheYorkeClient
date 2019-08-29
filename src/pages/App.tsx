import React, { useState, useEffect, useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
  RouteComponentProps, Link as RouterLink, BrowserRouter as Router, Route,
} from 'react-router-dom';
import {
  Breadcrumbs, Typography, Grid, makeStyles, createStyles, Theme, IconButton, Avatar,
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Skeleton from '@material-ui/lab/Skeleton';
import Map from './app/Map';
import { TrailSectionProps, TrailObjectProps } from './types';
import MenuContainer from './app/menu/MenuContainer';
import DownloadMenu from '../DownloadMenu';
import Markdown from '../Markdown';
import Reviews from '../Reviews';
import ReviewSummary from '../ReviewSummary';
import Chat from '../Chat';
import UserContext from '../UserContext';
import SignupLogin from '../SignupLogin';

type MenuModes = 'side' | 'bottom';
interface MenuProps {
  menuMode: MenuModes;
  trailSection: TrailSectionProps;
  setTrailSection: (trailSection: TrailSectionProps) => void;
  trailObject: TrailObjectProps;
  setTrailObject: (trailObject: TrailObjectProps) => void;
  trailId: number;
}

interface Multimedium {
  multimedium: {
    id: number;
    name: string;
    link: string;
  }
}

interface Files {
  id: number;
  name: string;
  link: string;
}

interface RouteDetails {
  routes_by_pk: {
    id: number;
    short_title: string;
    title: string;
    body: string
    route_multimedia: Multimedium[]
    route_files: Files[]
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

/*
        trailSection.id === undefined
          ? [{ link: '/', name: 'Home' }]
          : [
            { link: '/', name: 'Home' },
            {
              link: `/stage/${trailSection.id}`,
              name: loading ? '' : data.routes_by_pk.short_title,
            },
          ]
*/
// header and body render downloaded content

interface BodyProps {
  loading: boolean;
  title: string | undefined;
  body: string | undefined;
  multimedia: Multimedium[] | undefined;
  files: Files[] | undefined;
  count: number | undefined;
  avgRating: number | undefined;
}

interface MultimediaCarouselProps {
  multimedia: Multimedium[] | undefined;
  loading: boolean;
}

const MultimediaCarousel: React.FC<MultimediaCarouselProps> = ({ multimedia, loading }) => (
  <div style={{ width: '100%' }}>
    {!loading ? (multimedia!.length ? (
      <img
        alt=""
        className="d-block w-100"
        style={{ width: '100%' }}
        src={multimedia![0].multimedium.link}
      />
    ) : ('no images')

    ) : (
      <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{ maxWidth: 'calc(90vh * 9 / 16)' }}>
          <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, right: 0,
            }}
            >
              <Skeleton variant="rect" width="100%" height="100%" />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

const Body: React.FC<BodyProps> = ({
  loading, title, body, multimedia, files, count, avgRating,
}) => (
  <>
    <MultimediaCarousel multimedia={multimedia} loading={loading} />
    <div style={{ padding: 12 }}>
      {!loading ? (
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      ) : (
        <Skeleton width="70%" height={30} />
      )}
      {!loading && files && <DownloadMenu links={files} />}
      {!loading
        && (
        <ReviewSummary
          type="route"
          count={count}
          average={avgRating}
        />
        )}
      {/* <Markdown className={classes.markdown}> */}
      {!loading ? (
        <Markdown>
          {body}
        </Markdown>
      ) : (
        <>
          <Skeleton width="90%" height={10} />
          <Skeleton width="95%" height={10} />
          <Skeleton width="80%" height={10} />
          <Skeleton width="90%" height={10} />
          <Skeleton width="40%" height={10} />
        </>
      )}
    </div>
  </>
);

const WTY_TRAIL_ID = 18;
const WTY_NAME = 'Walk the Yorke';
const WTY_SHORT_NAME = 'Home';

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
}));

interface AppProps {
  RouteProps: RouteComponentProps<{id: string, type: string}>;
}

const App: React.FC<AppProps> = ({ RouteProps }) => {
  const classes = useStyles();
  const [portrait, setPortrait] = useState(false);
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
  const User = useContext<any>(UserContext);
  const handleLoginToggle = () => {
    User.setShowLoginMenu(!User.showLoginMenu);
  };
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
          <IconButton
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              margin: 4,
              boxShadow: '4px 4px 10px -5px rgba(0,0,0,0.75)',
              padding: 0,
              zIndex: 999,
            }}
            onClick={handleLoginToggle}
          >
            <Avatar
              style={{
                backgroundColor: User.loggedIn ? '#3f51b5' : '',
              }}
            >
              {User.loggedIn

                ? `${User.firstname.charAt(0)}${User.lastname.charAt(0)}` : <PersonAddIcon />}
            </Avatar>
          </IconButton>
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

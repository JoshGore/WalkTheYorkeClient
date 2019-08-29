import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import {
  Grid, Breadcrumbs, Typography, Link,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link as RouterLink, BrowserRouter as Router, Route } from 'react-router-dom';
import MenuContainer from './menu/MenuContainer';
import { TrailSectionProps, TrailObjectProps } from '../types';
import DownloadMenu from '../../DownloadMenu';
import Markdown from '../../Markdown';
import Reviews from '../../Reviews';
import ReviewSummary from '../../ReviewSummary';
import Chat from '../../Chat';
import UserContext from '../../UserContext';

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

const Menu: React.FC<MenuProps> = ({
  menuMode, trailSection, trailObject, trailId,
}) => {
  const {
    loading: selectionInfoLoading,
    error: selectionInfoError, data: selectionInfo,
  } = useQuery<RouteDetails>(ROUTE_QUERY,
    {
      variables: { id: trailSection.id },
    });

  /*
  const breadcrumbLinks = () => {
    if (trailSection.id === trailId) {
      return [{ link: '/', name: 'Home' }];
    }
    return [{ link: '/', name: 'Home' }, { link: `/section/${trailSection.id}`, name: selectionInfo.routes_by_pk.short_title }];
  };
   */

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
      mainContent={<div />}
    />
  );
};

export default Menu;

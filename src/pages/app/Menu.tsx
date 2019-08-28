import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Breadcrumbs, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
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
  id: number;
  name: string;
  link: string;
}

interface Files {
  id: number;
  name: string;
  link: string;
}

interface RouteDetails {
  id: number;
  short_title: string;
  title: string;
  body: string
  route_multimedia: Multimedium[]
  route_files: Files[]
  reviews_aggregate: {
    aggregate: {
      ave: {
        rating: number
      }
      count: number
    }
  }
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
  title: string;
  body: string;
  multimedia: [];
  files: [];
  count: number;
  avgRating: number;
  id: number;
}

const Body: React.FC<BodyProps> = ({loading, title, body, multimedia, files, count, avgRating, id}) => ({
  return (
    <>
    {!loading && 
      <>
      {/* replace with image carosel */}
      {!!multimedia.length && 
        <img
          alt=""
          className="d-block w-100"
          style={{ width: '100%' }}
          src={multimedia[0].multimedium.link}
        />
      }
      <div style={{ padding: 12 }}>
        <Typography variant="h4" gutterBottom>
            {title}
        </Typography>
          {files && (
            <DownloadMenu links={files} />
          )}
        <ReviewSummary
          type="route"
          count={count}
          average={avgRating}
        />
            {/*<Markdown className={classes.markdown}>*/}
          <Markdown>
              {body}
          </Markdown>
        </div>
      </>
    }
    <div style={{ padding: 12 }}>
      <Reviews id={id} />
      <Chat id={id} />
    </div>
    </>
  )
});
const Menu: React.FC<MenuProps> = ({
  menuMode, trailSection, trailObject, trailId,
}) => {
  const { loading: selectionInfoLoading, error: selectionInfoError, data: selectionInfo } = useQuery<RouteDetails>(ROUTE_QUERY,
    {
      variables: { id: trailSection.id },
    });

  const breadcrumbLinks = () => {
    if (trailSection.id === trailId) {
      return [{ link: '/', name: 'Home' }];
    }
    return [{ link: '/', name: 'Home' }, { link: `/section/${trailSection.id}`, name: selectionInfo!.short_title }];
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
      )}
      mode={menuMode}
    />
  );
};

export default Menu;

// @format
import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import MenuContainer from './MenuContainer';
import DownloadMenu from './DownloadMenu';
import Markdown from './Markdown';
import Reviews from './Reviews';
import ReviewSummary from './ReviewSummary';
import Chat from './Chat';

const useStyles = makeStyles((theme: Theme) => createStyles({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(1, 0),
  },
  breadcrumbs: {
    padding: theme.spacing(1, 2),
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

interface MenuProps {
  trail: any;
  trailSection: any;
  setTrailSection: any;
  trailObject: any;
  setTrailObject: any;
  user: any;
  setUser: any;
  portrait: boolean;
}

const Menu: React.FC<any> = ({ portrait, trail, trailSection }) => {
  const classes = useStyles();
  const [newSelection, setNewSelection] = useState(true);
  const { loading, error, data } = useQuery(
    gql`
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
    `,
    {
      variables: { id: trailSection.id || trail },
      onCompleted: () => {
      },
    },
  );

  return (
    <MenuContainer
      newSelection={newSelection}
      portrait={portrait}
      links={
        trailSection.id === undefined
          ? [{ link: '/', name: 'Home' }]
          : [
            { link: '/', name: 'Home' },
            {
              link: `/stage/${trailSection.id}`,
              name: loading ? '' : data.routes_by_pk.short_title,
            },
          ]
      }
    >
      {/* replace with image carosel */}
      {!loading && (
        <>
          {!!data.routes_by_pk.route_multimedia.length && (
            <img
              alt=""
              className="d-block w-100"
              style={{ width: '100%' }}
              src={data.routes_by_pk.route_multimedia[0].multimedium.link}
            />
          )}
          <div style={{ padding: 12 }}>
            <Typography variant="h4" gutterBottom>
              {data.routes_by_pk.title}
            </Typography>
            {data.routes_by_pk.route_files && (
              <DownloadMenu links={data.routes_by_pk.route_files} />
            )}
            <ReviewSummary
              type="route"
              count={data.reviews_aggregate.aggregate.count}
              average={data.reviews_aggregate.aggregate.avg.rating}
            />
            <Markdown className={classes.markdown}>
              {data.routes_by_pk.body}
            </Markdown>
          </div>
        </>
      )}
      <div style={{ padding: 12 }}>
        <Reviews id={trailSection.id | trail} />
        <Chat id={trailSection.id} />
      </div>
    </MenuContainer>
  );
};

export default Menu;

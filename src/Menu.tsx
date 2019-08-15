//@format
import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MenuContainer from './MenuContainer';
import DownloadMenu from './DownloadMenu';
import Markdown from './Markdown';
import Reviews from './Reviews';
import ReviewSummary from './ReviewSummary';
import Chat from './Chat';

const { FacebookProvider, Comments } = require('react-facebook');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
);

interface MenuProps {
  trailSection: any;
  setTrailSection: any;
  trailObject: any;
  setTrailObject: any;
  user: any;
  setUser: any;
  portrait: boolean;
}

const Menu: React.FC<any> = ({
  title,
  multimedia,
  description,
  fileLinks,
  comments,
  reviews,
}) => {
  const classes = useStyles();

  return (
    <>
      {/* replace with image carosel */}
      <img
        alt=''
        className='d-block w-100'
        style={{ width: '100%' }}
        src={multimedia[0]}
      />
      <div style={{ padding: 12 }}>
        <Typography variant='h4' gutterBottom>
          {title}
        </Typography>
        {/*<ReactMarkdown source={description} />*/}
        {/* display links to GPX files - replace with menu */}
        <DownloadMenu links={fileLinks} />
        <ReviewSummary reviews={reviews} />
        {description && (
          <Markdown className={classes.markdown}>{description}</Markdown>
        )}
        <div>
          <Reviews reviews={reviews} />
          <Chat comments={comments} />
        </div>
      </div>
    </>
  );
};

export default Menu;

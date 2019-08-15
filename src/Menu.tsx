//@format
import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Markdown from './Markdown';
import MenuContainer from './MenuContainer';
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
      padding: theme.spacing(3, 0),
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
      <div style={{ padding: 10 }}>
        <Typography variant='h4' gutterBottom>
          {title}
        </Typography>
        {/* display links to GPX files - replace with menu */}
        <div style={{ display: 'inline-block' }}>
          {fileLinks.map((file: any) => (
            <Button
              className={classes.margin}
              size='small'
              variant='contained'
              key={file.name}
              href={process.env.PUBLIC_URL + file.link}
            >
              {file.name}
            </Button>
          ))}
        </div>
        {/*<ReactMarkdown source={description} />*/}
        {description !== undefined && (
          <Markdown className={classes.markdown}>{description}</Markdown>
        )}
        <div>
          {reviews.map((review: any) => (
            <div key={review.title}>
              <Rating value={review.rating} size='small' readOnly />
              <Typography variant='h6'>{review.title}</Typography>
              <Typography variant='body2'>{review.body}</Typography>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;

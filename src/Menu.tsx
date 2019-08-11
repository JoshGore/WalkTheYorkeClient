//@format
import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import ReactMarkdown from 'react-markdown';
// import { useTransition, animated } from 'react-spring';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';
import Markdown from './Markdown';

const infoLinks = require('./data/information/infolinks.json');

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
    menu: {
      // transition: 'width 0.5s',
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

const Menu: React.FC<MenuProps> = ({
  trailSection,
  setTrailSection,
  trailObject,
  setTrailObject,
  user,
  setUser,
  portrait,
}) => {
  const classes = useStyles();
  // store retrieved current description text
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [images, setImages] = useState([]);
  const [menuShown, setMenuShown] = useState(1);
  const handleMenuToggle = () => {
    menuShown == 1 ? setMenuShown(2) : setMenuShown(1);
  };
  // retreive json object descriptions which link to markdown and image files
  useEffect(() => {
    const fetchData = async () => {
      // set description to none to prevent rendering for wrong object
      setDescription('');
      // find stage with id of trailSection.id then fetch
      let result: any;
      let text: string = '';
      if (trailSection.type === undefined && trailObject.type === undefined) {
        setImages(infoLinks.default.images);
        result = await fetch(
          process.env.PUBLIC_URL + infoLinks.default.description.link
        );
        text = await result.text();
      } else if (
        trailSection.type === 'stage' &&
        trailObject.type === undefined
      ) {
        setImages(
          infoLinks.stages.find((stage: any) => stage.id === trailSection.id)
            .images
        );
        result = await fetch(
          process.env.PUBLIC_URL +
            infoLinks.stages.find((stage: any) => stage.id === trailSection.id)
              .description.link
        );
        text = await result.text();
      }
      await setDescription(text);
    };
    fetchData();
  }, [trailSection.id, trailSection.type, trailObject.id, trailObject.type]);
  return (
    <div
      className={classes.menu}
      style={{
        transition: 'width 0.25s, height 0.25s',
        width: portrait ? '100vw' : menuShown == 2 ? '100vw' : '33vw',
        height: portrait
          ? menuShown == 0
            ? ''
            : menuShown == 1
            ? '33%'
            : '100%'
          : '100%',
        order: window.innerWidth < window.innerHeight ? 15 : 5,
        boxShadow: '0px 0px 30px 10px rgba(0,0,0,0.2)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ width: '100%' }}>
        <Paper elevation={0} className={classes.breadcrumbs}>
          <Breadcrumbs
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
          >
            {trailSection.id === undefined && (
              <Typography color='textPrimary'>All</Typography>
            )}
            {trailSection.id !== undefined && (
              <Link component={RouterLink} to='/'>
                All
              </Link>
            )}
            {trailSection.id !== undefined && (
              <Typography color='textPrimary'>
                {trailSection.type + ' ' + trailSection.id}
              </Typography>
            )}
          </Breadcrumbs>
          <IconButton
            size='small'
            onClick={handleMenuToggle}
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              float: 'right',
              transform: `rotate(${
                menuShown == 1 ? (portrait ? 180 : 270) : portrait ? 0 : 90
              }deg)`,
              transition: 'transform 0.25s',
            }}
          >
            <ExpandMore />
          </IconButton>
        </Paper>
      </div>
      <Scrollbars>
        {/* replace with image carosel */}
        <img
          alt=''
          className='d-block w-100'
          style={{ width: '100%' }}
          src={images[0]}
        />
        <div style={{ padding: 10 }}>
          <Typography variant='h4' gutterBottom>
            {
              (trailSection.type === undefined
                ? infoLinks.default
                : infoLinks.stages.find(
                    (stage: any) => stage.id === trailSection.id
                  )
              ).name
            }
          </Typography>
          {(trailSection.type === undefined || trailSection.type === 'stage') &&
            trailObject.type === undefined && (
              <div style={{ display: 'inline-block' }}>
                {(trailSection.type === undefined
                  ? infoLinks.default
                  : infoLinks.stages.find(
                      (stage: any) => stage.id === trailSection.id
                    )
                ).gpx.map((file: any) => (
                  <Button
                    className={classes.margin}
                    size='small'
                    variant='contained'
                    key={file.name}
                    href={process.env.PUBLIC_URL + file.link}
                  >
                    GPX: {file.name}
                  </Button>
                ))}
              </div>
            )}
          {/*<ReactMarkdown source={description} />*/}
          {description !== undefined && (
            <Markdown className={classes.markdown}>{description}</Markdown>
          )}
          {trailSection.type === 'stage' && trailObject.type === undefined && (
            <div>
              {infoLinks.stages
                .find((stage: any) => stage.id === trailSection.id)
                .reviews.map((review: any) => (
                  <div key={review.title}>
                    <Rating value={review.rating} size='small' readOnly />
                    <Typography variant='h6'>{review.title}</Typography>
                    <Typography variant='body2'>{review.body}</Typography>
                  </div>
                ))}
            </div>
          )}
        </div>
      </Scrollbars>
    </div>
  );
};

export default Menu;

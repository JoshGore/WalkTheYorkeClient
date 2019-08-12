//@format
import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Markdown from './Markdown';
import MenuContainer from './MenuContainer';

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
    <MenuContainer
      portrait={portrait}
      links={
        trailSection.id === undefined
          ? [{ link: '/', name: 'home' }]
          : [
              { link: '/', name: 'home' },
              {
                link: `/${trailSection.type}/${trailSection.id}`,
                name: `${trailSection.type} ${trailSection.id}`,
              },
            ]
      }
    >
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
    </MenuContainer>
  );
};

export default Menu;

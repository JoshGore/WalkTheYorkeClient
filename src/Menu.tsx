//@format
import React, { useEffect, useState } from 'react';
// import Input from '@material-ui/core/Input';
import ReactMarkdown from 'react-markdown';
// import { useTransition, animated } from 'react-spring';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Scrollbars from 'react-custom-scrollbars';
/*
const {
  MDBCarousel,
  MDBCarouselCaption,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBView,
  MDBMask,
  MDBContainer,
} = require('mdbreact');
 */

const infoLinks = require('./data/information/infolinks.json');

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
  // store retrieved current description text
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [images, setImages] = useState([]);
  // retreive json object descriptions which link to markdown and image files
  useEffect(() => {
    const fetchData = async () => {
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
  }, [trailSection, trailObject]);
  return (
    <Scrollbars
      style={{
        width: window.innerWidth < window.innerHeight ? '' : '33vw',
        height: window.innerWidth < window.innerHeight ? '33%' : '100%',
        order: window.innerWidth < window.innerHeight ? 15 : 5,
        boxShadow: '0px 0px 30px 10px rgba(0,0,0,0.2)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* replace with image carosel */}
      <img
        className='d-block w-100'
        style={{ width: '100%' }}
        src={images[0]}
      />
      <div style={{ padding: 10 }}>
        <h1>
          {
            (trailSection.type === undefined
              ? infoLinks.default
              : infoLinks.stages.find(
                  (stage: any) => stage.id === trailSection.id
                )
            ).name
          }
        </h1>
        {(trailSection.type === undefined || trailSection.type === 'stage') &&
          trailObject.type === undefined && (
            <ButtonGroup
              variant='contained'
              size='small'
              aria-label='small contained button group'
              style={{ display: 'inline-block' }}
            >
              {(trailSection.type === undefined
                ? infoLinks.default
                : infoLinks.stages.find(
                    (stage: any) => stage.id === trailSection.id
                  )
              ).gpx.map((file: any) => (
                <Button
                  key={file.name}
                  href={process.env.PUBLIC_URL + file.link}
                >
                  GPX: {file.name}
                </Button>
              ))}
            </ButtonGroup>
          )}
        <ReactMarkdown source={description} />
      </div>
    </Scrollbars>
  );
};

export default Menu;

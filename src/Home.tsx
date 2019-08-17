//@format
import 'typeface-roboto';
import React, { useState, useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import Map from './Map';
import Menu from './Menu';
import MenuContainer from './MenuContainer';
const {
  AutoRotatingCarousel,
  Slide,
} = require('material-auto-rotating-carousel');

const infoLinks = require('./data/information/infolinks.json');

interface User {
  id: number | null;
  name: string | null;
  preferences: { activity: string };
}

function getPortrait() {
  return window.innerHeight > window.innerWidth;
}

const Home: React.FC<RouteComponentProps<any>> = ({
  match: {
    params: { type, id },
  },
}) => {
  const [trailSection, setTrailSection] = useState<{
    type: string | undefined;
    id: number | undefined;
    // }>({ type: undefined, id: undefined });
  }>({ type: type, id: isNaN(id) ? undefined : parseInt(id) });
  // store selected object (POI/Issue etc), null and null if none
  const [trailObject, setTrailObject] = useState<{
    type: string | undefined;
    id: number | undefined;
  }>({ type: undefined, id: undefined });
  // store user (general/casual/hiker/cyclist)
  const [user, setUser] = useState({
    id: null,
    name: null,
    preferences: { activity: 'general' },
  });
  const [portrait, setPortrait] = useState(getPortrait);
  useEffect(() => {
    document.title =
      trailSection.type !== undefined
        ? `${trailSection.type.charAt(0).toUpperCase() +
            trailSection.type.slice(1)} ${trailSection.id}`
        : 'Home';
  });
  useEffect(() => {
    function handleResize() {
      setPortrait(getPortrait());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    setTrailSection({ type: type, id: isNaN(id) ? undefined : parseInt(id) });
  }, [type, id]);
  // store retrieved current description text
  const [title, setTitle] = useState('');
  const [multimedia, setMultimedia] = useState<any>([]);
  const [fileLinks, setFileLinks] = useState<any>([]);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [comments, setComments] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [newSelection, setNewSelection] = useState(false);

  // retreive json object descriptions which link to markdown and image files
  useEffect(() => {
    const fetchData = async () => {
      // set description to none to prevent rendering for wrong object
      setDescription('');
      // find stage with id of trailSection.id then fetch
      let result: any;
      let text: string = '';
      if (trailSection.type === undefined && trailObject.type === undefined) {
        setMultimedia(infoLinks.default.images);
        result = await fetch(
          process.env.PUBLIC_URL + infoLinks.default.description.link
        );
        text = await result.text();
      } else if (
        trailSection.type === 'stage' &&
        trailObject.type === undefined
      ) {
        setMultimedia(
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
      await setFileLinks(
        (trailSection.type === undefined
          ? infoLinks.default
          : infoLinks.stages.find((stage: any) => stage.id === trailSection.id)
        ).downloads
      );
      await setTitle(
        (trailSection.type === undefined
          ? infoLinks.default
          : infoLinks.stages.find((stage: any) => stage.id === trailSection.id)
        ).name
      );
      await setReviews(
        trailSection.type !== undefined
          ? infoLinks.stages.find((stage: any) => stage.id === trailSection.id)
              .reviews
          : []
      );
      await setLoading(false);
      await setNewSelection(true);
    };
    fetchData();
  }, [trailSection.id, trailSection.type, trailObject.id, trailObject.type]);
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexWrap: portrait ? 'nowrap' : 'wrap',
        overflow: 'hidden',
        flexDirection: portrait ? 'column' : 'row',
      }}
    >
      {/*menu - whether horizontal overlay or vertical side bar depends on orientation. order > 10 to place after, < 10 to place before*/}
      <MenuContainer
        portrait={portrait}
        links={
          trailSection.id === undefined
            ? [{ link: '/', name: 'Home' }]
            : [
                { link: '/', name: 'Home' },
                {
                  link: `/${trailSection.type}/${trailSection.id}`,
                  name: `${trailSection.type!.charAt(0).toUpperCase() +
                    trailSection.type!.slice(1)} ${trailSection.id}`,
                },
              ]
        }
        newSelection={newSelection}
        setNewSelection={setNewSelection}
      >
        <Menu
          title={title}
          multimedia={multimedia}
          fileLinks={fileLinks}
          description={description}
          comments={comments}
          reviews={reviews}
          loading={loading}
        />
      </MenuContainer>
      {/*map - order = 10*/}
      <Map
        trailSection={trailSection}
        setTrailSection={setTrailSection}
        trailObject={trailObject}
        setTrailObject={setTrailObject}
        user={user}
        setUser={setUser}
        portrait={portrait}
      />
      <Redirect
        push
        to={
          trailSection.type !== undefined
            ? `/${trailSection.type}/${trailSection.id}`
            : '/'
        }
      />
      <AutoRotatingCarousel
        open={false}
        mobile={window.innerWidth < 600}
        autoplay={false}
      >
        <div
          style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
        >
          About this map
        </div>
        <div
          style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
        >
          Options
        </div>
        {/*
      <Slide
        media=''
        mediaBackgroundStyle={{
          display: 'none',
            background: 'rgba(10,0,0,0.2)',
        }}
        title='About this map'
        subtitle=''
      />
      <Slide
        media=''
        mediaBackgroundStyle={{
          display: 'none',
            background: 'rgba(10,0,0,0.2)',
        }}
        title='Options'
        subtitle=''
      />
        */}
      </AutoRotatingCarousel>
    </div>
  );
};

export default Home;

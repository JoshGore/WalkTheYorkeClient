import 'typeface-roboto';
import React, { useState, useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Map from './Map';
import Menu from './Menu';
import MenuContainer from './MenuContainer';
import SignupLogin from './SignupLogin';

const WTYTrailID = 18;

interface User {
  id: number | null;
  name: string | null;
  preferences: { activity: string };
}

interface Selection {
  type: string | undefined;
  id: number | undefined;
}

function getPortrait() {
  return window.innerHeight > window.innerWidth;
}

const Home: React.FC<RouteComponentProps<any>> = ({
  match: {
    params: { type, id },
  },
}) => {
  const [trail, setTrail] = useState(WTYTrailID);

  // store user (general/casual/hiker/cyclist)
  const [user, setUser] = useState({
    id: null,
    name: null,
    preferences: { activity: 'general' },
  });

  const [trailSection, setTrailSection] = useState<Selection>({
    type,
    id: isNaN(id) ? undefined : parseInt(id, 10),
  });

  // store selected object (POI/Issue etc), null and null if none
  const [trailObject, setTrailObject] = useState<Selection>({
    type: undefined,
    id: undefined,
  });

  const [portrait, setPortrait] = useState(getPortrait);

  useEffect(() => {
    function handleResize() {
      setPortrait(getPortrait());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setTrailSection({ type, id: isNaN(id) ? undefined : parseInt(id) });
  }, [type, id]);

  useEffect(() => {
    document.title = trailSection.type !== undefined
      ? `${trailSection.type.charAt(0).toUpperCase()
            + trailSection.type.slice(1)} ${trailSection.id}`
      : 'Home';
  });

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
      {/* menu - whether horizontal overlay or vertical side bar depends on orientation. order > 10 to place after, < 10 to place before */}
      <Menu
        portrait={portrait}
        trail={trail}
        setTrail={setTrail}
        trailSection={trailSection}
        setTrailSection={setTrailSection}
        trailObject={trailObject}
        setTrailObject={setTrailObject}
      />
      <Map
        trailSection={trailSection}
        setTrailSection={setTrailSection}
        trailObject={trailObject}
        setTrailObject={setTrailObject}
        user={user}
        setUser={setUser}
        portrait={portrait}
      />
      <SignupLogin />
      <Redirect
        push
        to={
          trailSection.type !== undefined
            ? `/${trailSection.type}/${trailSection.id}`
            : '/'
        }
      />
    </div>
  );
};

export default Home;

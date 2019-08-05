//@format
import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import { Router, Link, RouteComponentProps } from '@reach/router';
import Map from './Map';
import Menu from './Menu';

interface User {
  id: number | null;
  name: string | null;
  preferences: { activity: string };
}

function getPortrait() {
  return window.innerHeight > window.innerWidth;
}

const Home: React.FC<RouteComponentProps> = () => {
  // store current walk/stage type and id (map retreives spatial, menu textual)
  // if no walk/stage selected then type 'all' and id null
  const [trailSection, setTrailSection] = useState<{
    type: string;
    id: number | undefined;
  }>({ type: 'all', id: undefined });
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
    function handleResize() {
      setPortrait(getPortrait());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: portrait ? 'column' : 'row',
      }}
    >
      {/*menu - whether horizontal overlay or vertical side bar depends on orientation. order > 10 to place after, < 10 to place before*/}
      <Menu
        trailSection={trailSection}
        setTrailSection={setTrailSection}
        trailObject={trailObject}
        setTrailObject={setTrailObject}
        user={user}
        setUser={setUser}
        portrait={portrait}
      />
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
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <Home path='/' />
  </Router>
);

export default App;

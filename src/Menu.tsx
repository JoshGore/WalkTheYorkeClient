//@format
import React, { useEffect, useState } from 'react';
import Input from '@material-ui/core/Input';
import ReactMarkdown from 'react-markdown';

const stageInfo = require('./data/information/stageinfo.json');

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
  // retreive json object descriptions which link to markdown and image files
  useEffect(() => {
    const fetchData = async () => {
      // find stage with id of trailSection.id then fetch
      let result: any;
      if (trailSection.type === 'stage' && trailObject.id === undefined) {
        result = await fetch(
          process.env.PUBLIC_URL +
            stageInfo.stages.find((stage: any) => stage.id === trailSection.id)
              .description
        );
      }
      if (result != undefined) {
        const text = await result.text();
        setDescription(text);
      }
    };
    fetchData();
  }, [trailSection, trailObject]);
  return (
    <div
      style={{
        width: window.innerWidth < window.innerHeight ? '' : '33vw',
        height: window.innerWidth < window.innerHeight ? '33%' : '100%',
        order: window.innerWidth < window.innerHeight ? 15 : 5,
        background: 'pink',
        boxShadow: '0px 0px 3px 3px rgba(0,0,0,0.2)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
      }}
    >
      <img
        style={{ width: '100%' }}
        src={process.env.PUBLIC_URL + stageInfo.stages[0].images[0]}
      />
      <div>
        <ReactMarkdown source={description} />
      </div>
    </div>
  );
};

export default Menu;

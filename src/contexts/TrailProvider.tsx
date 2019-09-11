import React, { useState } from 'react';
import TrailContext, {
  TrailEntityProps,
  NewTrailPointProps,
} from './TrailContext';

const WTY_TRAIL_ID = 18;
const WTY_NAME = 'Walk the Yorke';
const WTY_SHORT_NAME = 'Home';

const TrailProvider: React.FC = ({ children }) => {
  const [trail, setTrail] = useState<TrailEntityProps>({
    name: WTY_NAME,
    shortName: WTY_SHORT_NAME,
    id: WTY_TRAIL_ID,
    type: 'trail',
  });
  const [trailSection, setTrailSection] = useState<TrailEntityProps>({
    name: WTY_NAME,
    shortName: WTY_SHORT_NAME,
    id: WTY_TRAIL_ID,
    type: 'trail',
  });
  const [trailObject, setTrailObject] = useState<TrailEntityProps>({
    name: undefined,
    shortName: undefined,
    id: undefined,
    type: undefined,
  });

  const [newTrailPoint, setNewTrailPoint] = useState<NewTrailPointProps>({
    type: undefined,
    subType: undefined,
    point: undefined,
    // name: undefined,
    // description: undefined,
  });

  const currentTrailObject = (): TrailEntityProps | NewTrailPointProps => {
    if (newTrailPoint.type !== undefined) {
      return newTrailPoint;
    }
    if (trailObject.id !== undefined) {
      return trailObject;
    }
    return trailSection;
  };

  return (
    <TrailContext.Provider
      value={{
        trail,
        setTrail,
        trailSection,
        setTrailSection,
        trailObject,
        setTrailObject,
        newTrailPoint,
        setNewTrailPoint,
        currentTrailObject,
      }}
    >
      {children}
    </TrailContext.Provider>
  );
};

export default TrailProvider;

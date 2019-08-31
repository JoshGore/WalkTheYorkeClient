import React, { useState } from 'react';
import TrailContext, {TrailSectionProps, TrailObjectProps} from './TrailContext';

const TrailProvider: React.FC = ({ children }) => {
  const [trailId, setTrailId] = useState<number | undefined>(undefined);
  const [trailSection, setTrailSection] = useState<TrailSectionProps>({
    name: undefined,
    shortName: undefined,
    id: undefined,
    type: undefined,
  });
  const [trailObject, setTrailObject] = useState<TrailObjectProps>({
    name: undefined,
    id: undefined,
    type: undefined,
  });
  return (
    <TrailContext.Provider value={{
      trailId, setTrailId, trailSection, setTrailSection, trailObject, setTrailObject
    }}
    >
      {children}
    </TrailContext.Provider>
  );
};

export default TrailProvider;
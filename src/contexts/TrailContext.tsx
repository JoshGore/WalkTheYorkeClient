import React from 'react';

export interface TrailSectionProps {
  name: string | undefined;
  shortName: string | undefined;
  id: number | undefined;
  type: 'trail' | 'stage' | 'short' | undefined;
}

export interface TrailObjectProps {
  name: string | undefined;
  id: number | undefined;
  type: 'issue' | 'campsite' | 'interest' | undefined
}

export interface TrailProps {
  trailId: number | undefined;
  setTrailId: (trailId: number | undefined) => void;
  trailSection: TrailSectionProps;
  setTrailSection: (trailSection: TrailSectionProps) => void;
  trailObject: TrailObjectProps;
  setTrailObject: (trailObject: TrailObjectProps) => void;
}

const TrailContext = React.createContext<TrailProps>({
      trailId: undefined,
  setTrailId: () => {},
  trailSection: {
    name: undefined,
    shortName: undefined,
    id: undefined,
    type: undefined,
  },
  setTrailSection: () => {},
  setTrailObject: () => {},
    trailObject: {
    name: undefined,
    id: undefined,
    type: undefined,
  },
});

export default TrailContext;

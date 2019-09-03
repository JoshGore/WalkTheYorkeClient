import React from 'react';

export type TrailEntityTypes = 'trail' | 'stage' | 'short' | undefined;

export interface TrailEntityProps {
  name: string | undefined;
  shortName: string | undefined;
  id: number | undefined;
  type: TrailEntityTypes;
}

export interface TrailContextProps {
  trail: TrailEntityProps;
  setTrail: (trail: TrailEntityProps) => void;
  trailSection: TrailEntityProps;
  setTrailSection: (trailSection: TrailEntityProps) => void;
  trailObject: TrailEntityProps;
  setTrailObject: (trailObject: TrailEntityProps) => void;
  currentTrailObject: () => TrailEntityProps;
}
const trail = {
  name: undefined,
  shortName: undefined,
  id: undefined,
  type: undefined,
};
const setTrail = () => {};
const trailSection = {
  name: undefined,
  shortName: undefined,
  id: undefined,
  type: undefined,
};
const setTrailSection = () => {};
const trailObject = {
  name: undefined,
  shortName: undefined,
  id: undefined,
  type: undefined,
};
const setTrailObject = () => {};
const currentTrailObject = (): TrailEntityProps => {
  if (trailObject.id === undefined) {
    return trailSection;
  }
  return trailObject;
};

const TrailContext = React.createContext<TrailContextProps>({
  trail,
  setTrail,
  trailSection,
  setTrailSection,
  trailObject,
  setTrailObject,
  currentTrailObject,
});

export default TrailContext;

import React from 'react';

export type TrailEntityTypes =
  | 'trail'
  | 'stage'
  | 'short'
  | 'point'
  | 'userPoint'
  | 'userIssue'
  | undefined;

export interface TrailEntityProps {
  name: string | undefined;
  shortName: string | undefined;
  id: number | undefined;
  type: TrailEntityTypes;
}

export interface NewTrailPointProps {
  type: 'userIssue' | 'userPoint' | undefined;
  subType: string | undefined;
  point: [number, number] | undefined;
  id?: undefined;
}

export interface TrailContextProps {
  trail: TrailEntityProps;
  setTrail: (trail: TrailEntityProps) => void;
  trailSection: TrailEntityProps;
  setTrailSection: (trailSection: TrailEntityProps) => void;
  trailObject: TrailEntityProps;
  setTrailObject: (trailObject: TrailEntityProps) => void;
  newTrailPoint: NewTrailPointProps;
  setNewTrailPoint: (newTrailPoint: NewTrailPointProps) => void;
  currentTrailObject: () => TrailEntityProps | NewTrailPointProps;
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
const newTrailPoint = {
  // name: undefined,
  // description: undefined,
  type: undefined,
  subType: undefined,
  point: undefined,
};
const setNewTrailPoint = () => {};
const setTrailObject = () => {};
const currentTrailObject = (): TrailEntityProps | NewTrailPointProps => {
  if (newTrailPoint.type !== undefined) {
    return newTrailPoint;
  }
  if (trailObject.id !== undefined) {
    return trailObject;
  }
  return trailSection;
};

const TrailContext = React.createContext<TrailContextProps>({
  trail,
  setTrail,
  trailSection,
  setTrailSection,
  trailObject,
  setTrailObject,
  newTrailPoint,
  setNewTrailPoint,
  currentTrailObject,
});

export default TrailContext;

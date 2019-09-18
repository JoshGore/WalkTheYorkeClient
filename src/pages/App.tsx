import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import loadable from '@loadable/component';
import MenuContainer from './app/menu/MenuContainer';
import TrailContext, {
  TrailEntityProps,
  TrailContextProps,
  NewTrailPointProps,
} from '../contexts/TrailContext';
import CornerMenu from './CornerMenu';
import {
  RouteDetailQuery,
  RouteDetailQueryData,
  RouteDetailQueryVars,
  PointDetailQuery,
  PointDetailQueryData,
  PointDetailQueryVars,
} from '../queries/objectInfoQueries';
import PointDetails from './app/PointDetails';
import NewPointMenu from './app/NewPointMenu';
import MenuBreadcrumbs from './app/MenuBreadcrumbs';
import SelectionDetails from './app/SelectionDetails';

const SignupLogin = loadable(() => import('./SignupLogin'));
const Map = loadable(() => import('./app/Map'));

interface LoadingOrTextProps {
  loading: boolean;
  text: string | undefined;
}

const App: React.FC = () => {
  const TrailSelections = useContext<TrailContextProps>(TrailContext);
  const handleHomeLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    TrailSelections.setTrailSection({ ...TrailSelections.trail });
  };
  const getCurrentSelectionName = () =>
    TrailSelections.trailSection.type === 'trail' ||
    TrailSelections.trailSection.type === undefined
      ? undefined
      : TrailSelections.trailSection.shortName;

  // body={bodyFromSelection(TrailSelections.currentTrailObject())}
  return (
    <MenuContainer
      header={
        <MenuBreadcrumbs
          currentSelectionIfNotHome={getCurrentSelectionName()}
          handleHomeLinkClick={handleHomeLinkClick}
        />
      }
      body={
        TrailSelections.newTrailPoint.type === undefined ? (
          <SelectionDetails
            type={
              TrailSelections.trailObject.type !== undefined
                ? TrailSelections.trailObject.type
                : TrailSelections.trailSection.type!
            }
            id={
              TrailSelections.trailObject.id !== undefined
                ? TrailSelections.trailObject.id
                : TrailSelections.trailSection.id!
            }
          />
        ) : (
          <NewPointMenu />
        )
      }
      mainContent={
        <>
          <SignupLogin />
          <CornerMenu />
          <Map />
        </>
      }
    />
  );
};

export default App;

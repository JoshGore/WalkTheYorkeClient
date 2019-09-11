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
import TrailSectionDetails from './app/TrailSectionDetails';
import PointDetails from './app/PointDetails';
import NewPointMenu from './app/NewPointMenu';
import MenuBreadcrumbs from './app/MenuBreadcrumbs';

const SignupLogin = loadable(() => import('./SignupLogin'));
const Map = loadable(() => import('./app/Map'));

interface LoadingOrTextProps {
  loading: boolean;
  text: string | undefined;
}

interface BreadcrumbProps {
  trailSection: TrailEntityProps;
  handleHomeLinkClick: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => void;
}

const App: React.FC = () => {
  const TrailSelections = useContext<TrailContextProps>(TrailContext);
  const handleHomeLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    TrailSelections.setTrailSection({ ...TrailSelections.trail });
  };
  const bodyFromSelection = (
    currentTrailObject: TrailEntityProps | NewTrailPointProps,
  ) => {
    if (
      currentTrailObject.type === 'issue' ||
      currentTrailObject.type === 'newFeature'
    ) {
      return <NewPointMenu />;
    }
    if (
      currentTrailObject.type === 'trail' ||
      currentTrailObject.type === 'stage'
    ) {
      return <TrailSectionDetails />;
    }
    if (currentTrailObject.type === 'shelter') {
      return <PointDetails />;
    }
    return <></>;
  };

  return (
    <MenuContainer
      header={
        <MenuBreadcrumbs
          trailSection={TrailSelections.trailSection}
          handleHomeLinkClick={handleHomeLinkClick}
        />
      }
      body={bodyFromSelection(TrailSelections.currentTrailObject())}
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

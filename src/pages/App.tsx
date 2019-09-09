import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import loadable from '@loadable/component';
import MenuContainer from './app/menu/MenuContainer';
import TrailContext, {
  TrailEntityProps,
  TrailContextProps,
} from '../contexts/TrailContext';
import CornerAvatar from './signupLogin/CornerAvatar';
import {
  RouteDetailQuery,
  RouteDetailQueryData,
  RouteDetailQueryVars,
} from '../queries/objectInfoQueries';
import MenuBreadcrumbs from './app/MenuBreadcrumbs';

const SignupLogin = loadable(() => import('./SignupLogin'));
const Body = loadable(() => import('./app/Body'));
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

const TrailSection: React.FC = () => {
  const TrailSelections = useContext<TrailContextProps>(TrailContext);
  const { loading: sectionInfoLoading, data: sectionInfo } = useQuery<
    RouteDetailQueryData,
    RouteDetailQueryVars
  >(RouteDetailQuery, {
    variables: { id: TrailSelections.trailSection.id! },
    skip: !TrailSelections.trailSection.id,
  });
  const id = () =>
    !sectionInfoLoading ? sectionInfo!.routes_by_pk.id : undefined;
  const name = () =>
    !sectionInfoLoading ? sectionInfo!.routes_by_pk.title : undefined;
  const shortName = () =>
    !sectionInfoLoading ? sectionInfo!.routes_by_pk.short_title : undefined;
  const type = () =>
    !sectionInfoLoading ? sectionInfo!.routes_by_pk.typeByType.name : undefined;
  const body = () =>
    !sectionInfoLoading ? sectionInfo!.routes_by_pk.body : undefined;
  const multimedia = () =>
    !sectionInfoLoading
      ? sectionInfo!.routes_by_pk.route_multimedia
      : undefined;
  const files = () =>
    !sectionInfoLoading ? sectionInfo!.routes_by_pk.route_files : undefined;
  const count = () =>
    !sectionInfoLoading
      ? sectionInfo!.reviews_aggregate.aggregate.count
      : undefined;
  const avgRating = () =>
    !sectionInfoLoading
      ? sectionInfo!.reviews_aggregate.aggregate.avg.rating
      : undefined;
  const title = () => TrailSelections.trailSection.name;

  useEffect(() => {
    if (!sectionInfoLoading && !!TrailSelections.trailSection.id) {
      TrailSelections.setTrailSection({
        id: id(),
        name: name(),
        shortName: shortName(),
        type: type(),
      });
    } else if (!sectionInfoLoading && !TrailSelections.trailSection.id) {
      TrailSelections.setTrailSection({ ...TrailSelections.trail });
    }
  }, [sectionInfoLoading, TrailSelections.trailSection.id]);
  return (
    <Body
      loading={sectionInfoLoading}
      title={title()}
      body={body()}
      multimedia={multimedia()}
      files={files()}
      count={count()}
      avgRating={avgRating()}
    />
  );
};

const Point: React.FC = () => {
  const TrailSelections = useContext<TrailContextProps>(TrailContext);
  const { loading: pointInfoLoading, data: pointInfo } = useQuery<
    RouteDetailQueryData,
    RouteDetailQueryVars
  >(RouteDetailQuery, {
    variables: { id: TrailSelections.trailSection.id! },
    skip: !TrailSelections.trailSection.id,
  });
  const id = () => (!pointInfoLoading ? pointInfo!.routes_by_pk.id : undefined);
  const name = () =>
    !pointInfoLoading ? pointInfo!.routes_by_pk.title : undefined;
  const shortName = () =>
    !pointInfoLoading ? pointInfo!.routes_by_pk.short_title : undefined;
  const type = () =>
    !pointInfoLoading ? pointInfo!.routes_by_pk.typeByType.name : undefined;
  const body = () =>
    !pointInfoLoading ? pointInfo!.routes_by_pk.body : undefined;
  const multimedia = () =>
    !pointInfoLoading ? pointInfo!.routes_by_pk.route_multimedia : undefined;
  const files = () =>
    !pointInfoLoading ? pointInfo!.routes_by_pk.route_files : undefined;
  const count = () =>
    !pointInfoLoading
      ? pointInfo!.reviews_aggregate.aggregate.count
      : undefined;
  const avgRating = () =>
    !pointInfoLoading
      ? pointInfo!.reviews_aggregate.aggregate.avg.rating
      : undefined;
  const title = () => TrailSelections.trailSection.name;

  useEffect(() => {
    if (!pointInfoLoading && !!TrailSelections.trailSection.id) {
      TrailSelections.setTrailSection({
        id: id(),
        name: name(),
        shortName: shortName(),
        type: type(),
      });
    } else if (!pointInfoLoading && !TrailSelections.trailSection.id) {
      TrailSelections.setTrailSection({ ...TrailSelections.trail });
    }
  }, [pointInfoLoading, TrailSelections.trailSection.id]);
  return (
    <Body
      loading={pointInfoLoading}
      title={title()}
      body={body()}
      multimedia={multimedia()}
      files={files()}
      count={count()}
      avgRating={avgRating()}
    />
  );
};

const App: React.FC = () => {
  const TrailSelections = useContext<TrailContextProps>(TrailContext);
  const handleHomeLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.preventDefault();
    TrailSelections.setTrailSection({ ...TrailSelections.trail });
  };

  return (
    <MenuContainer
      header={
        <MenuBreadcrumbs
          trailSection={TrailSelections.trailSection}
          handleHomeLinkClick={handleHomeLinkClick}
        />
      }
      body={<TrailSection />}
      mainContent={
        <>
          <SignupLogin />
          <CornerAvatar />
          <Map />
        </>
      }
    />
  );
};

export default App;

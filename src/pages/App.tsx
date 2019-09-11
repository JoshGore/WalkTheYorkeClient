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
import MenuBreadcrumbs from './app/MenuBreadcrumbs';

const SignupLogin = loadable(() => import('./SignupLogin'));
const RouteBody = loadable(() => import('./app/RouteBody'));
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
    // !sectionInfoLoading ? sectionInfo!.routes_by_pk.id : undefined;
    TrailSelections.trailSection.id!;
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
    <RouteBody
      loading={sectionInfoLoading}
      title={title()}
      body={body()}
      multimedia={multimedia()}
      files={files()}
      count={count()}
      avgRating={avgRating()}
      id={id()}
    />
  );
};

const Point: React.FC = () => {
  const TrailSelections = useContext<TrailContextProps>(TrailContext);
  const { loading: pointInfoLoading, data: pointInfo } = useQuery<
    PointDetailQueryData,
    PointDetailQueryVars
  >(PointDetailQuery, {
    variables: { id: TrailSelections.trailSection.id! },
    skip: !TrailSelections.trailSection.id,
  });
  const id = () => (!pointInfoLoading ? pointInfo!.points_by_pk.id : undefined);
  const name = () =>
    !pointInfoLoading ? pointInfo!.points_by_pk.name : undefined;
  const type = () =>
    !pointInfoLoading ? pointInfo!.points_by_pk.types[0].type.name : undefined;
  const body = () =>
    !pointInfoLoading ? pointInfo!.points_by_pk.description : undefined;

  useEffect(() => {
    if (!pointInfoLoading && !!TrailSelections.trailSection.id) {
      TrailSelections.setTrailObject({
        id: id(),
        name: name(),
        shortName: name(),
        type: type(),
      });
    } else if (!pointInfoLoading && !TrailSelections.trailSection.id) {
      TrailSelections.setTrailObject({
        name: undefined,
        shortName: undefined,
        id: undefined,
        type: undefined,
      });
    }
  }, [pointInfoLoading, TrailSelections.trailSection.id]);
  return (
    <div>
      {!pointInfoLoading && <h4>{`${name()} ${type()}`}</h4>}
      {!pointInfoLoading && <p>{body()}</p>}
    </div>
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
  const bodyFromSelection = (
    currentTrailObject: TrailEntityProps | NewTrailPointProps,
  ) => {
    if (
      currentTrailObject.type === 'trail' ||
      currentTrailObject.type === 'stage'
    ) {
      return <TrailSection />;
    }
    if (currentTrailObject.type === 'shelter') {
      return <Point />;
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

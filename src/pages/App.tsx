import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Map from './app/Map';
import MenuContainer from './app/menu/MenuContainer';
import TrailContext, {
  TrailEntityProps,
  TrailContextProps,
} from '../contexts/TrailContext';
import SignupLogin from './SignupLogin';
import CornerAvatar from './signupLogin/CornerAvatar';
import Body from './app/Body';
import RouteDetailQuery, {
  RouteDetailQueryData,
  RouteDetailQueryVars,
} from './app/RouteDetailQuery';
import MenuBreadcrumbs from './app/MenuBreadcrumbs';

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
  const {
    loading: selectionInfoLoading,
    error: selectionInfoError,
    data: selectionInfo,
  } = useQuery<RouteDetailQueryData, RouteDetailQueryVars>(RouteDetailQuery, {
    variables: { id: TrailSelections.trailSection.id! },
    skip: !TrailSelections.trailSection.id,
  });
  const id = () =>
    selectionInfo &&
    selectionInfo.routes_by_pk &&
    selectionInfo.routes_by_pk.id;
  const name = () =>
    selectionInfo &&
    selectionInfo.routes_by_pk &&
    selectionInfo.routes_by_pk.title;
  const shortName = () =>
    selectionInfo &&
    selectionInfo.routes_by_pk &&
    selectionInfo.routes_by_pk.short_title;
  const type = () =>
    selectionInfo &&
    selectionInfo.routes_by_pk &&
    selectionInfo.routes_by_pk.typeByType.name;
  const body = () =>
    !selectionInfoLoading && !!selectionInfo
      ? selectionInfo.routes_by_pk.body
      : undefined;
  const multimedia = () =>
    !selectionInfoLoading && !!selectionInfo
      ? selectionInfo.routes_by_pk.route_multimedia
      : undefined;
  const files = () =>
    !selectionInfoLoading && !!selectionInfo
      ? selectionInfo.routes_by_pk.route_files
      : undefined;
  const count = () =>
    !selectionInfoLoading && !!selectionInfo
      ? selectionInfo.reviews_aggregate.aggregate.count
      : undefined;
  const avgRating = () =>
    !selectionInfoLoading && !!selectionInfo
      ? selectionInfo.reviews_aggregate.aggregate.avg.rating
      : undefined;
  const title = () => TrailSelections.trailSection.name;

  useEffect(() => {
    if (!selectionInfoLoading && !!TrailSelections.trailSection.id) {
      TrailSelections.setTrailSection({
        id: id(),
        name: name(),
        shortName: shortName(),
        type: type(),
      });
    } else if (!selectionInfoLoading && !TrailSelections.trailSection.id) {
      TrailSelections.setTrailSection({ ...TrailSelections.trail });
    }
  }, [selectionInfoLoading, TrailSelections.trailSection.id]);

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
      body={
        <Body
          loading={selectionInfoLoading}
          title={title()}
          body={body()}
          multimedia={multimedia()}
          files={files()}
          count={count()}
          avgRating={avgRating()}
        />
      }
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

import React, { useContext, useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';
import {
  RouteDetailQuery,
  RouteDetailQueryData,
  RouteDetailQueryVars,
  PointDetailQuery,
  PointDetailQueryData,
  PointDetailQueryVars,
} from '../../queries/objectInfoQueries';

import TrailContext, {
  TrailContextProps,
  TrailEntityProps,
  TrailEntityTypes,
} from '../../contexts/TrailContext';

import DisplayDetails from './DisplayDetails';

interface SelectionDetailsProps {
  type: TrailEntityTypes;
  id: number;
}

const SelectionDetails: React.FC<{
  id: number;
  type: string;
}> = ({ id, type }) => {
  const TrailSelections = useContext<TrailContextProps>(TrailContext);
  const queryType = () =>
    type === 'trail' || type === 'stage' ? 'route' : type;
  const { loading: routeInfoLoading, data: routeInfo } = useQuery<
    RouteDetailQueryData,
    RouteDetailQueryVars
  >(RouteDetailQuery, {
    variables: { id: id as number },
    skip: queryType() !== 'route',
  });
  const { loading: pointInfoLoading, data: pointInfo } = useQuery<
    PointDetailQueryData,
    PointDetailQueryVars
  >(PointDetailQuery, {
    variables: { id: id as number },
    skip: queryType() !== 'point',
  });
  /*
  const id = () =>
    // !sectionInfoLoading ? sectionInfo!.routes_by_pk.id : undefined;
    TrailSelections.trailSection.id!;
   */
  const name = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.name
        : undefined
      : queryType() === 'point'
      ? !pointInfoLoading
        ? pointInfo!.points_by_pk.name
        : undefined
      : undefined;
  const shortName = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.short_name
        : undefined
      : undefined;
  // const type = () =>
  //   !sectionInfoLoading ? sectionInfo!.routes_by_pk.typeByType.name : undefined;
  const body = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.description
        : undefined
      : queryType() === 'point'
      ? !pointInfoLoading
        ? pointInfo!.points_by_pk.description
        : undefined
      : undefined;
  const multimedia = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.route_multimedia
        : undefined
      : queryType() === 'point'
      ? !pointInfoLoading
        ? pointInfo!.points_by_pk.point_multimedia
        : undefined
      : undefined;
  const files = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.route_files
        : undefined
      : undefined;
  const count = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.reviews_aggregate.aggregate.count
        : undefined
      : queryType() === 'point'
      ? !pointInfoLoading
        ? pointInfo!.reviews_aggregate.aggregate.count
        : undefined
      : undefined;
  const avgRating = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.reviews_aggregate.aggregate.avg.rating
        : undefined
      : queryType() === 'point'
      ? !pointInfoLoading
        ? pointInfo!.reviews_aggregate.aggregate.avg.rating
        : undefined
      : undefined;

  // const title = () => TrailSelections.trailSection.name;
  const title = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.name
        : undefined
      : queryType() === 'route'
      ? !pointInfoLoading
        ? pointInfo!.points_by_pk.name
        : undefined
      : undefined;

  useEffect(() => {
    if (!routeInfoLoading && !!TrailSelections.trailSection.id) {
      TrailSelections.setTrailSection({
        id,
        name: name(),
        shortName: shortName(),
        type: TrailSelections.trailSection.type,
      });
    } else if (!routeInfoLoading && !TrailSelections.trailSection.id) {
      TrailSelections.setTrailSection({ ...TrailSelections.trail });
    }
  }, [routeInfoLoading, TrailSelections.trailSection.id]);
  return (
    <DisplayDetails
      loading={routeInfoLoading}
      title={title()}
      body={body()}
      multimedia={multimedia()}
      files={files()}
      count={count()}
      avgRating={avgRating()}
      id={id as number}
      queryType={queryType()}
      showReviews={queryType() === 'route'}
      showComments={queryType() === 'route'}
    />
  );
};

/*
const SelectionDetails: React.FC<SelectionDetailsProps> = ({ type, id }) => {
  return <TrailSectionDetails id={id} type={type} />;
};
 */

export default SelectionDetails;

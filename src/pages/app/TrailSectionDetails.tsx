import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import TrailContext, { TrailContextProps } from '../../contexts/TrailContext';
import {
  RouteDetailQuery,
  RouteDetailQueryData,
  RouteDetailQueryVars,
} from '../../queries/objectInfoQueries';
import RouteBody from './RouteBody';

const TrailSectionDetails: React.FC = () => {
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

export default TrailSectionDetails;

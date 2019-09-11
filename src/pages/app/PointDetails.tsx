import React, { useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import TrailContext, { TrailContextProps } from '../../contexts/TrailContext';
import {
  PointDetailQuery,
  PointDetailQueryData,
  PointDetailQueryVars,
} from '../../queries/objectInfoQueries';

const PointDetails: React.FC = () => {
  const Trail = useContext<TrailContextProps>(TrailContext);
  const { loading: pointInfoLoading, data: pointInfo } = useQuery<
    PointDetailQueryData,
    PointDetailQueryVars
  >(PointDetailQuery, {
    variables: { id: Trail.trailObject.id! },
    skip: !Trail.trailObject.id,
  });
  const id = () => (!pointInfoLoading ? pointInfo!.points_by_pk.id : undefined);
  const name = () =>
    !pointInfoLoading ? pointInfo!.points_by_pk.name : undefined;
  const type = () =>
    !pointInfoLoading ? pointInfo!.points_by_pk.types[0].type.name : undefined;
  const body = () =>
    !pointInfoLoading ? pointInfo!.points_by_pk.description : undefined;

  useEffect(() => {
    if (!pointInfoLoading && !!Trail.trailSection.id) {
      Trail.setTrailObject({
        id: id(),
        name: name(),
        shortName: name(),
        type: type(),
      });
    } else if (!pointInfoLoading && !Trail.trailSection.id) {
      Trail.setTrailObject({
        name: undefined,
        shortName: undefined,
        id: undefined,
        type: undefined,
      });
    }
  }, [pointInfoLoading, Trail.trailSection.id]);
  return (
    <div>
      {!pointInfoLoading && <h4>{`${name()} ${type()}`}</h4>}
      {!pointInfoLoading && <p>{body()}</p>}
    </div>
  );
};

export default PointDetails;

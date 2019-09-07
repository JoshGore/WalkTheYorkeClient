import React, { useState, useEffect, useContext } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import ReactResizeDetector from 'react-resize-detector';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import bbox from '@turf/bbox';
import { BBox, featureCollection } from '@turf/helpers';
import { FeatureCollection, Feature, LineString, Point } from 'geojson';
import MapGeneral from './map/MapGeneral';
import TrailContext, { TrailContextProps } from '../../contexts/TrailContext';
import { TrailSectionProps, TrailObjectProps } from '../types';
import {
  TRAIL_GEOMETRY_QUERY,
  TrailGeometryQueryVars,
  TrailGeometryQueryData,
  LineTypes,
  PointTypes,
  TrailGeometryQueryPoint,
  TrailGeometryQueryLine,
} from '../../queries/queries';

const MapComponent = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoiam9zaGciLCJhIjoiTFBBaE1JOCJ9.-BaGpeSYz4yPrpxh1eqT2A',
  trackResize: false,
});
const WTY_TRAIL_BOUNDS: BBox = [136.585109, -35.314486, 138.366868, -33.99099];

interface LineFeatureProps {
  routeId: number;
  routeUsageType: LineTypes;
}
interface PointFeatureProps {
  name: string;
  id: number;
}

const Map: React.FC = () => {
  const Trail = useContext<TrailContextProps>(TrailContext);
  const { loading, error, data } = useQuery<
    TrailGeometryQueryData,
    TrailGeometryQueryVars
  >(TRAIL_GEOMETRY_QUERY, {
    partialRefetch: false,
    returnPartialData: false,
    variables: { trailId: 18 },
    fetchPolicy: 'no-cache',
    // cache-first cache-and-network network-only cache-only no-cache standby
  });
  // in state prevents reloading on map changes
  const [initialBounds] = useState<BBox>(WTY_TRAIL_BOUNDS);
  const [transformedInitialBounds] = useState<
    [[number, number], [number, number]]
  >([
    [WTY_TRAIL_BOUNDS[0], WTY_TRAIL_BOUNDS[1]],
    [WTY_TRAIL_BOUNDS[2], WTY_TRAIL_BOUNDS[3]],
  ]);
  const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapClickCoordinates, setMapClickCoordinates] = useState<any>({});

  const transformLinesToFeatures = (
    queryData: TrailGeometryQueryData,
  ): Feature<LineString, LineFeatureProps>[] =>
    queryData.routes_by_pk.line_routes.map(feature => ({
      type: 'Feature',
      properties: {
        routeId: feature.line.line_routes.map(route => route.route_id)[0],
        routeUsageType: feature.line.types
          .map(({ type }) => type.name)
          .filter(
            name => name === 'bike' || name === 'walk' || name === 'shared',
          )[0],
      },
      geometry: feature.line.geom,
    }));

  const transformPointsToFeatures = (
    queryData: TrailGeometryQueryData,
    type: PointTypes,
  ): Feature<Point, PointFeatureProps>[] => {
    console.log(queryData);
    return queryData.routes_by_pk.point_routes
      .filter(feature =>
        feature.point.types.some(({ type: { name } }) => name === type),
      )
      .map(feature => ({
        type: 'Feature',
        properties: {
          id: feature.point.id,
          name: feature.point.name,
        },
        geometry: feature.point.geom,
      }));
  };

  // set map when component loads
  const onStyleLoad = (map: any) => {
    setMap(map);
    setMapLoading(false);
  };
  // handle map click/tap events
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const handleResize = (height: number, width: number) => {
    setHeight(height);
    setWidth(width);
    map && map.resize();
  };
  const mapClick = (map: any, evt: any) => {
    setMapClickCoordinates({
      point: [evt.point.x, evt.point.y],
      lngLat: evt.lngLat,
    });
  };
  // query map when clicked
  useEffect(() => {
    if (map) {
      // check if interactive feature(s) returned at point based on layer id
      const feature = map
        .queryRenderedFeatures(mapClickCoordinates.point)
        .filter(
          (feature: any) => feature.layer.id === 'trail_line_all_target',
        )[0];
      if (feature) {
        // if trail section selected and currently in all mode then update trailSection
        if (feature.layer.id === 'trail_line_all_target') {
          Trail.setTrailSection({
            ...Trail.trailSection,
            type: 'stage',
            id: feature.properties!.routeId,
          });
        }
      } else {
        Trail.setTrailSection({ ...Trail.trail });
      }
    }
  }, [mapClickCoordinates]);

  const calculateExtent = (): BBox => {
    const bounds = bbox(
      featureCollection(
        transformLinesToFeatures(data!).filter(
          (feature: any) =>
            feature.properties.routeId === Trail.trailSection.id,
        ),
      ),
    );
    if (bounds[0] === Infinity) {
      return initialBounds;
    }
    return bounds;
  };

  const zoomPadding = () => (height > width ? height / 20 : width / 20);

  const zoomToExtent = () => {
    map!.fitBounds(calculateExtent() as mapboxgl.LngLatBoundsLike, {
      padding: zoomPadding(),
    });
  };
  useEffect(() => {
    if (map && !mapLoading && !loading) {
      zoomToExtent();
    }
  }, [Trail.trailSection.id, Trail.trailSection.type, mapLoading, loading]);
  const selectedFeature = () =>
    Trail.currentTrailObject().type === 'stage'
      ? {
          layer: {
            id: 'trail_line_all_target',
          },
          properties: {
            routeId: Trail.currentTrailObject().id,
          },
        }
      : undefined;
  return (
    <>
      <ReactResizeDetector
        handleWidth
        handleHeight
        refreshMode="throttle"
        refreshRate={100}
        onResize={handleResize}
      />
      <MapComponent
        containerStyle={{ flex: 1 }}
        fitBounds={transformedInitialBounds}
        onStyleLoad={onStyleLoad}
        onClick={(map, evt) => mapClick(map, evt)}
        style="mapbox://styles/joshg/cjsv8vxg371cm1fmo1sscgou2"
      >
        {/* sources for trail lines, short walk lines, day walk lines, hero walk lines */}
        {!loading && !!data && (
          <MapGeneral
            trailSection={Trail.trailSection}
            trailObject={Trail.trailObject}
            selectedFeature={selectedFeature()}
            stagesData={featureCollection(transformLinesToFeatures(data!))}
            sheltersData={featureCollection(
              transformPointsToFeatures(data!, 'shelter'),
            )}
            markersData={featureCollection(
              transformPointsToFeatures(data!, 'marker'),
            )}
          />
        )}
      </MapComponent>
    </>
  );
};

export default Map;

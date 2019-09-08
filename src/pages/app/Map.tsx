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
import { LineTypes } from '../../queries/queries';

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
  const { loading, error, data } = useQuery(
    gql`
      {
        routes_extent {
          id
          extent
        }
      }
    `,
  );
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
            id: feature.properties!.route_id,
          });
        }
      } else {
        Trail.setTrailSection({ ...Trail.trail });
      }
    }
  }, [mapClickCoordinates]);

  const calculateExtent = (): BBox => {
    return bbox(
      loading
        ? initialBounds
        : data.routes_extent.find(
            (route: any) => route.id === Trail.trailSection.id,
          ).extent,
    );
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
        <MapGeneral
          trailSection={Trail.trailSection}
          trailObject={Trail.trailObject}
          selectedFeature={selectedFeature()}
        />
      </MapComponent>
    </>
  );
};

export default Map;

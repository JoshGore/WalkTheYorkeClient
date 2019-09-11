import React, { useState, useEffect, useContext } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import ReactResizeDetector from 'react-resize-detector';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import bbox from '@turf/bbox';
import { BBox, featureCollection } from '@turf/helpers';
import MapGeneral from './map/MapGeneral';
import TrailContext, { TrailContextProps } from '../../contexts/TrailContext';
import { TrailSectionProps, TrailObjectProps } from '../types';
import { LineTypes } from '../../queries/queries';

const Issue: React.FC<{ coordinates: [number, number] }> = ({
  coordinates,
}) => (
  <Layer
    id="issue"
    type="circle"
    paint={{
      'circle-radius': 8,
      'circle-color': 'red',
      'circle-stroke-width': 3,
      'circle-stroke-color': 'white',
    }}
  >
    <Feature coordinates={coordinates} />
  </Layer>
);

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

  interface ExtentQueryProps {
    routes_extent: {
      id: number;
      extent: any;
    }[];
  }
  const { loading, error, data } = useQuery<ExtentQueryProps>(
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
  const [issueCoordinates, setIssueCoordinates] = useState<
    [number, number] | undefined
  >(undefined);

  const onStyleLoad = (map: mapboxgl.Map) => {
    setMap(map);
  };
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const handleResize = (height: number, width: number) => {
    setMapDimensions({ height, width });
    map && map.resize();
  };

  const updateTrailContextFromClickedPoint = (
    map: any,
    mapClickCoordinates: any,
  ) => {
    const firstInteractive = interactiveFeatureTypeId(
      map.queryRenderedFeatures(mapClickCoordinates.point),
    );
    const undefinedProperties = {
      name: undefined,
      shortName: undefined,
      id: undefined,
      type: undefined,
    };
    if (firstInteractive.type === undefined) {
      Trail.setTrailSection({ ...Trail.trail });
      Trail.setTrailObject(undefinedProperties);
    } else if (firstInteractive.type === 'stage') {
      Trail.setTrailObject(undefinedProperties);
      Trail.setTrailSection({
        ...Trail.trailSection,
        type: firstInteractive.type,
        id: firstInteractive.id,
      });
    } else {
      Trail.setTrailObject({
        ...Trail.trailObject,
        type: firstInteractive.type,
        id: firstInteractive.id,
      });
    }
  };

  const mapClick = (map: any, evt: any) => {
    updateTrailContextFromClickedPoint(map, {
      point: [evt.point.x, evt.point.y],
      lngLat: [evt.lngLat.lng, evt.lngLat.lat],
    });
    setIssueCoordinates([evt.lngLat.lng, evt.lngLat.lat]);
  };

  const mapLayerTypes: any = {
    trail_shelters: {
      type: 'shelter',
      id: (feature: any) => feature.layer.id,
    },
    trail_line_all_target: {
      type: 'stage',
      id: (feature: any) => feature.properties.route_id,
    },
  };

  const featureType = (feature: any) =>
    feature && feature.layer && mapLayerTypes[feature.layer.id].type;

  const featureId = (feature: any) =>
    feature && feature.layer && mapLayerTypes[feature.layer.id].id(feature);

  const firstInteractiveFeature = (renderedFeatures: any) =>
    renderedFeatures.find((feature: any) =>
      Object.hasOwnProperty.call(mapLayerTypes, feature.layer.id),
    );

  interface interactiveFeatureTypeIdProps {
    type: 'stage' | 'shelter' | undefined;
    id: number | undefined;
  }

  const interactiveFeatureTypeId = (
    renderedFeatures: any,
  ): interactiveFeatureTypeIdProps => {
    return {
      type: featureType(firstInteractiveFeature(renderedFeatures)),
      id: featureId(firstInteractiveFeature(renderedFeatures)),
    };
  };

  // eslint-disable-next-line @typescript-eslint/camelcase
  const findExtentById = ({ routes_extent }: ExtentQueryProps) =>
    // eslint-disable-next-line @typescript-eslint/camelcase
    routes_extent.find((route: any) => route.id === Trail.trailSection.id)!
      .extent;

  const calculateExtent = (): BBox => {
    return bbox(
      loading || Trail.trailSection.id === undefined
        ? initialBounds
        : findExtentById(data!),
    );
  };

  const dimensionsArePortrait = (dimensions: {
    height: number;
    width: number;
  }) => dimensions.height > dimensions.width;

  const selectionExtentPadding = () =>
    dimensionsArePortrait(mapDimensions)
      ? mapDimensions.height / 20
      : mapDimensions.width / 20;

  const zoomToExtent = () => {
    map!.fitBounds(calculateExtent() as mapboxgl.LngLatBoundsLike, {
      padding: selectionExtentPadding(),
    });
  };

  useEffect(() => {
    if (map && !loading) {
      zoomToExtent();
    }
  }, [Trail.trailSection.id, Trail.trailSection.type, loading]);

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
        {issueCoordinates && <Issue coordinates={issueCoordinates} />}
        <MapGeneral
          trailSection={Trail.trailSection}
          trailObject={Trail.trailObject}
          selectedFeature={Trail.currentTrailObject()}
        />
      </MapComponent>
    </>
  );
};

export default Map;

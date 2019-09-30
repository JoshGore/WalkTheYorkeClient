import React, { useState, useEffect, useContext } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import ReactResizeDetector from 'react-resize-detector';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import bbox from '@turf/bbox';
import { BBox, featureCollection } from '@turf/helpers';
import mapboxgl from 'mapbox-gl';
import MapLayers from './map/MapLayers';
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
  const { loading: extentsLoading, data: extents } = useQuery<ExtentQueryProps>(
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

  interface MapClickCoordinatesProps {
    point: [number, number];
    lngLat: [number, number];
  }

  const [mapClickCoordinates, setMapClickCoordinates] = useState<
    MapClickCoordinatesProps | undefined
  >(undefined);

  const onStyleLoad = (map: mapboxgl.Map) => {
    setMap(map);
    const geolocate = new mapboxgl.GeolocateControl({
      trackUserLocation: true,
      fitBoundsOptions: {
        maxZoom: map.getZoom(),
      },
    });
    map.addControl(geolocate, 'top-left');
  };
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });
  const handleResize = (height: number, width: number) => {
    setMapDimensions({ height, width });
    map && map.resize();
  };

  const [selectedFeatureLayerId, setSelectedFeatureLayerId] = useState<{
    id: number | undefined;
    layer: string | undefined;
  }>({
    id: undefined,
    layer: undefined,
  });

  // needs to be in effect to ensure state is not stale
  useEffect(() => {
    // this function is extremely slow due to object spreading and stale props
    const updateTrailContextFromClickedPoint = (
      map: any,
      clickLocation: [number, number],
    ) => {
      const firstInteractive = interactiveFeatureTypeId(
        map.queryRenderedFeatures(clickLocation),
      );
      setSelectedFeatureLayerId({
        layer: firstInteractive.layerId,
        id: firstInteractive.id,
      });
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
      } else if (firstInteractive.type !== undefined) {
        Trail.setTrailObject({
          ...Trail.trailObject,
          type: firstInteractive.type,
          id: firstInteractive.id,
        });
      }
    };
    if (mapClickCoordinates !== undefined) {
      if (Trail.newTrailPoint.type !== undefined) {
        Trail.setNewTrailPoint({
          ...Trail.newTrailPoint,
          point: mapClickCoordinates.lngLat,
        });
      } else {
        updateTrailContextFromClickedPoint(map, mapClickCoordinates.point);
      }
    }
  }, [mapClickCoordinates]);

  const mapClick = (map: any, evt: any) => {
    setMapClickCoordinates({
      point: [evt.point.x, evt.point.y],
      lngLat: [evt.lngLat.lng, evt.lngLat.lat],
    });
  };

  const mapLayerTypes: any = {
    shelter: {
      type: 'point',
      id: (feature: any) => feature.id,
    },
    'trail-line-target': {
      type: 'stage',
      id: (feature: any) => feature.properties.route_id,
    },
    user_issues: {
      type: 'userPoint',
      id: (feature: any) => feature.id,
    },
    user_points: {
      type: 'userPoint',
      id: (feature: any) => feature.id,
    },
  };

  const featureType = (feature: any) =>
    feature && feature.layer && mapLayerTypes[feature.layer.id].type;

  const featureId = (feature: any) =>
    feature && feature.layer && mapLayerTypes[feature.layer.id].id(feature);
  const featureLayerId = (feature: any) =>
    feature && feature.layer && feature.layer.id;

  const firstInteractiveFeature = (renderedFeatures: any) =>
    renderedFeatures.find((feature: any) =>
      Object.hasOwnProperty.call(mapLayerTypes, feature.layer.id),
    );

  interface interactiveFeatureTypeIdProps {
    type: 'stage' | 'point' | 'userPoint' | undefined;
    id: number | undefined;
    layerId: string | undefined;
  }

  const interactiveFeatureTypeId = (
    renderedFeatures: any,
  ): interactiveFeatureTypeIdProps => {
    return {
      type: featureType(firstInteractiveFeature(renderedFeatures)),
      id: featureId(firstInteractiveFeature(renderedFeatures)),
      layerId: featureLayerId(firstInteractiveFeature(renderedFeatures)),
    };
  };

  // eslint-disable-next-line @typescript-eslint/camelcase
  const findExtentById = ({ routes_extent }: ExtentQueryProps) =>
    // eslint-disable-next-line @typescript-eslint/camelcase
    routes_extent.find((route: any) => route.id === Trail.trailSection.id)!
      .extent;

  const calculateExtent = (): BBox => {
    return bbox(
      extentsLoading || Trail.trailSection.id === undefined
        ? initialBounds
        : findExtentById(extents!),
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
    if (map && !extentsLoading) {
      zoomToExtent();
    }
  }, [Trail.trailSection.id, Trail.trailSection.type, extentsLoading]);

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
        onClick={mapClick}
        style="mapbox://styles/joshg/cjsv8vxg371cm1fmo1sscgou2"
      >
        {Trail.newTrailPoint.point && (
          <Issue coordinates={Trail.newTrailPoint.point} />
        )}
        <MapLayers
          trailSection={Trail.trailSection}
          trailObject={Trail.trailObject}
          selectedStage={
            Trail.trailSection.type !== 'trail'
              ? Trail.trailSection.id
              : undefined
          }
          selectedFeatureLayerId={selectedFeatureLayerId}
        />
      </MapComponent>
    </>
  );
};

export default Map;

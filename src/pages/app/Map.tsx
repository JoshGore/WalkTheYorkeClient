import React, { useState, useEffect } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import ReactResizeDetector from 'react-resize-detector';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import bbox from '@turf/bbox';
import { featureCollection } from '@turf/helpers';
import MapGeneral from './map/MapGeneral';

import { TrailSectionProps, TrailObjectProps } from '../types';

// const shelters = require('/data/walktheyorke_oldcouncil_shelters.geojson');

const MapComponent = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoiam9zaGciLCJhIjoiTFBBaE1JOCJ9.-BaGpeSYz4yPrpxh1eqT2A',
  trackResize: false,
});

const WTY_TRAIL_BOUNDS: mapboxgl.LngLatBoundsLike = [
  [136.585109, -35.314486],
  [138.366868, -33.99099],
];

interface MapProps {
  trailSection: TrailSectionProps;
  setTrailSection: (trailSection: TrailSectionProps) => void;
  trailObject: TrailObjectProps;
  setTrailObject: (trailObject: TrailObjectProps) => void;
  trailId: number;
}

const Map: React.FC<MapProps> = ({
  trailSection,
  setTrailSection,
  trailObject,
  setTrailObject,
}) => {
  const WTY_TRAIL_ID = trailSection.id;
  const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [mapClickCoordinates, setMapClickCoordinates] = useState<any>({});
  // in state prevents reloading on map changes
  // <[[number, number], [number, number]]>
  const [initialBounds] = useState<mapboxgl.LngLatBoundsLike>(WTY_TRAIL_BOUNDS);
  const [mapLoading, setMapLoading] = useState(true);
  const {
    loading: linesLoading,
    error: linesError,
    data: linesQueryData,
  } = useQuery(
    gql`
      {
        lines(
          where: {
            line_routes: { route: { typeByType: { name: { _eq: "stage" } } } }
          }
        ) {
          geom
          line_routes(
            where: { route: { typeByType: { name: { _eq: "stage" } } } }
          ) {
            route_id
          }
          line_types {
            type {
              name
            }
          }
        }
      }
    `,
  );
  const {
    loading: WTYLinesLoading,
    error: WTYLinesError,
    data: WTYLinesData,
  } = useQuery(
    gql`
      query($trailId: Int!) {
        routes_by_pk(id: $trailId) {
          routes(where: { typeByType: { name: { _eq: "stage" } } }) {
            id
            line_routes {
              line {
                id
                geom
                line_types {
                  type {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      variables: { trailId: WTY_TRAIL_ID },
    },
  );
  const geoJsonLines = (lines: any) => ({
    type: 'FeatureCollection',
    features: lines.map((line: any) => ({
      type: 'Feature',
      properties: {
        routeId: line.line_routes[0].route_id,
        routeType: line.line_types[0].type.name,
      },
      geometry: line.geom,
    })),
  });
  // set map when component loads
  const onStyleLoad = (map: any) => {
    setMap(map);
    setMapLoading(false);
  };
  // handle map click/tap events
  const handleResize = () => map && map.resize();
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
          setTrailSection({
            ...trailSection, type: 'stage', id: feature.properties!.routeId,
          });
        }
      } else {
        // if no interactive features returned then set trailObject to none
        setTrailObject({ name: 'undefined', type: undefined, id: undefined });
      }
    }
  }, [mapClickCoordinates]);

  // zoom to stage if stage selected
  const calculateExtent = (): mapboxgl.LngLatBoundsLike => (trailSection.type === 'trail'
    ? initialBounds
    : bbox(
      featureCollection(
        trailSection.type === 'stage'
          && geoJsonLines(linesQueryData.lines).features.filter(
            (feature: any) => feature.properties.routeId === trailSection.id,
          ),
      ),
    )
  );
  const zoomToExtent = () => {
    map!.fitBounds(
      calculateExtent(), { padding: 100 },
    );
  };
  useEffect(() => {
    if (map && !mapLoading && !linesLoading) {
      zoomToExtent();
    }
  }, [trailSection.id, trailSection.type, mapLoading, linesLoading]);

  return (
    <>
      <ReactResizeDetector handleWidth handleHeight onResize={handleResize} />
      <MapComponent
        style="mapbox://styles/joshg/cjsv8vxg371cm1fmo1sscgou2"
        containerStyle={{ flex: 1 }}
        fitBounds={initialBounds as [[number, number], [number, number]]}
        onStyleLoad={onStyleLoad}
        onClick={(map, evt) => mapClick(map, evt)}
      >
        {/* sources for trail lines, short walk lines, day walk lines, hero walk lines */}
        {!linesLoading && (
          <MapGeneral
            trailSection={trailSection}
            trailObject={trailObject}
            selectedFeature={selectedFeature}
            stagesData={geoJsonLines(linesQueryData.lines)}
            shelters={undefined}
          />
        )}
      </MapComponent>
    </>
  );
};

export default Map;

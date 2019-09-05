import React, { useState, useEffect, useContext } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import ReactResizeDetector from 'react-resize-detector';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import bbox from '@turf/bbox';
import { BBox, featureCollection } from '@turf/helpers';

import {
  Feature, FeatureCollection, LineString, GeoJsonProperties,
} from 'geojson';
import MapGeneral from './map/MapGeneral';
// import MapOutdoorsAll from './map/MapOutdoorsAll';
import TrailContext, { TrailContextProps } from '../../contexts/TrailContext';

import { TrailSectionProps, TrailObjectProps } from '../types';

// const shelters = require('/data/walktheyorke_oldcouncil_shelters.geojson');

const MapComponent = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoiam9zaGciLCJhIjoiTFBBaE1JOCJ9.-BaGpeSYz4yPrpxh1eqT2A',
  trackResize: false,
});

// const WTY_TRAIL_BOUNDS: mapboxgl.LngLatBoundsLike = [
const WTY_TRAIL_BOUNDS: BBox = [
  136.585109, -35.314486,
  138.366868, -33.99099,
];

interface LineFeatureProps {
  routeId: number;
  routeType: string;
}

interface LinesQueryData {
  routes_by_bk: {
    routes: {
      id: number,
      line_routes: {
        line: {
          id: number,
          geom: any,
          line_types: {
            type: {
              name: string
            }
          }
        }
      }
    }
  }
}

interface LinesQueryVars {
  id: number
}

const Map: React.FC = () => {
  const Trail = useContext<TrailContextProps>(TrailContext);

  const [map, setMap] = useState<mapboxgl.Map | undefined>(undefined);
  const [selectedFeature, setSelectedFeature] = useState<any>(undefined);
  const [mapClickCoordinates, setMapClickCoordinates] = useState<any>({});
  // in state prevents reloading on map changes
  const [initialBounds] = useState<BBox>(WTY_TRAIL_BOUNDS);
  const [transformedInitialBounds] = useState<[[number, number], [number, number]]>([[WTY_TRAIL_BOUNDS[0], WTY_TRAIL_BOUNDS[1]], [WTY_TRAIL_BOUNDS[2], WTY_TRAIL_BOUNDS[3]]]);
  const [mapLoading, setMapLoading] = useState(true);

  const {
    loading: linesLoading,
    error: linesError,
    data: linesData,
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

  /*
  const {
    loading: linesLoading,
    error: linesError,
    data: linesData,
  } = useQuery<LinesQueryData,LinesQueryVars>(
    gql`
      query($trailId: Int!) {
        routes_by_pk(id: $id) {
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
      variables: { id: Trail.trailId! },
      skip: !!!Trail.trailSection.id
    },
  );
  */
  const geoJsonLines = (lines: any) : FeatureCollection<LineString, LineFeatureProps> => ({
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
          Trail.setTrailSection({
            ...Trail.trailSection, type: 'stage', id: feature.properties!.routeId,
          });
        }
      } else {
        // if no interactive features returned then set trailObject to none
        Trail.setTrailObject({ ...Trail.trail });
      }
    }
  }, [mapClickCoordinates]);

  const calculateExtent = (): BBox => {
    const bounds = bbox(
      featureCollection(
        geoJsonLines(linesData.lines).features.filter(
          feature => feature.properties.routeId === Trail.trailSection.id,
        ),
      ),
    );
    if (bounds[0] === Infinity) {
      return initialBounds;
    }
    return bounds;
  };

  const zoomToExtent = () => {
    map!.fitBounds(
      calculateExtent() as mapboxgl.LngLatBoundsLike, { padding: 100 },
    );
  };
  useEffect(() => {
    if (map && !mapLoading && !linesLoading) {
      zoomToExtent();
    }
  }, [Trail.trailSection.id, Trail.trailSection.type, mapLoading, linesLoading]);


  // blank style if convert to individual layers style={"mapbox://styles/joshg/cjzzmubza0zw21cuxtrntf6ny"}
  return (
    <>
      <ReactResizeDetector handleWidth handleHeight refreshMode="throttle" refreshRate={100} onResize={handleResize} />
      <MapComponent
        containerStyle={{ flex: 1 }}
        fitBounds={transformedInitialBounds}
        onStyleLoad={onStyleLoad}
        onClick={(map, evt) => mapClick(map, evt)}
        style="mapbox://styles/joshg/cjsv8vxg371cm1fmo1sscgou2"
      >
        {/* sources for trail lines, short walk lines, day walk lines, hero walk lines */}
        {!linesLoading && !!linesData.lines && (
          <MapGeneral
            trailSection={Trail.trailSection}
            trailObject={Trail.trailObject}
            selectedFeature={selectedFeature}
            stagesData={geoJsonLines(linesData.lines)}
          />
        )}
      </MapComponent>
    </>
  );
};

export default Map;

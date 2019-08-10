import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Source, Layer, Image } from 'react-mapbox-gl';
// (possibly update to actual typescript swizec)
import useDimensions from 'react-use-dimensions';
import shelter from './icons/custom-shelter-15.png';
import bbox from '@turf/bbox';
import { featureCollection } from '@turf/helpers';
let stages = require('./data/walktheyorke_naturemaps_stages_simplified2.geojson');
let shelters = require('./data/walktheyorke_oldcouncil_shelters.geojson');

const MapComponent = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoiam9zaGciLCJhIjoiTFBBaE1JOCJ9.-BaGpeSYz4yPrpxh1eqT2A',
});

interface MapProps {
  trailSection: any;
  setTrailSection: any;
  trailObject: any;
  setTrailObject: any;
  user: any;
  setUser: any;
  portrait: boolean;
}

const Map: React.FC<MapProps> = ({
  trailSection,
  setTrailSection,
  trailObject,
  setTrailObject,
  user,
  setUser,
  portrait,
}) => {
  const [map, setMap] = useState<any>(false);
  const [ref, { width, height }] = useDimensions();
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [mapClickCoordinates, setMapClickCoordinates] = useState<any>({});
  const [stagesData, setStagesData] = useState<any>({});
  const [initialBounds] = useState<[[number, number], [number, number]]>([
    [136.585109, -35.314486],
    [138.366868, -33.99099],
  ]);
  const [mapLoading, setMapLoading] = useState(true);
  const [jsonLoading, setJsonLoading] = useState(true);
  // fetch trail geojson data
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(stages);
      const json = await result.json();
      await setStagesData(json);
      await setJsonLoading(false);
    };
    fetchData();
  }, []);
  // set map when component loads
  const onStyleLoad = (map: any) => {
    setMap(map);
    setMapLoading(false);
  };
  // resize map on container size change
  useEffect(() => {
    map && map.resize();
  }, [width, height]);
  // }, [width, height, map]);
  // handle map click/tap events
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
          (feature: any) => feature.layer.id === 'trail_line_all_target'
        )[0];
      if (feature) {
        // if trail section selected and currently in all mode then update trailSection
        if (feature.layer.id === 'trail_line_all_target') {
          setTrailSection({ type: 'stage', id: feature.properties.STAGE });
        }
      } else {
        // if no interactive features returned then set trailObject to none
        setTrailObject({ type: undefined, id: undefined });
      }
    }
  }, [mapClickCoordinates]);

  // zoom to stage if stage selected
  useEffect(() => {
    map &&
      !mapLoading &&
      !jsonLoading &&
      map.fitBounds(
        trailSection.type === undefined
          ? initialBounds
          : bbox(
              featureCollection(
                trailSection.type === 'stage' &&
                  stagesData.features.filter(
                    (feature: any) =>
                      feature.properties.STAGE === trailSection.id
                  )
              )
            ),
        { padding: 100 }
      );
  }, [trailSection.id, trailSection.type, mapLoading, jsonLoading]);

  return (
    <div
      style={{ display: 'flex', alignItems: 'stretch', flexGrow: 1, order: 10 }}
      ref={ref}
    >
      <MapComponent
        style={'mapbox://styles/joshg/cjsv8vxg371cm1fmo1sscgou2'}
        containerStyle={{ flex: 1 }}
        fitBounds={initialBounds}
        onStyleLoad={onStyleLoad}
        onClick={(map, evt) => mapClick(map, evt)}
      >
        {/* sources for trail lines, short walk lines, day walk lines, hero walk lines */}
        <Source
          id='trail_line_all'
          geoJsonSource={{ type: 'geojson', data: stagesData }}
        />
        {/* sources for trail assets */}
        <Source
          id='trail_point_shelters'
          geoJsonSource={{ type: 'geojson', data: shelters }}
        />
        <Image
          id={'custom-shelter-icon'}
          url={shelter}
          onError={() => console.log('image loading error')}
        />
        {/* data-stack-placeholder is a placeholder in mapbox styles placing data under existing labels */}
        <Layer
          id='trail_shelters'
          type='symbol'
          sourceId='trail_point_shelters'
          layout={{
            'icon-image': 'custom-shelter-icon',
            'icon-size': 0.8,
            'icon-allow-overlap': true,
            'text-allow-overlap': false,
            'icon-optional': false,
            'text-optional': true,
            'text-field': '{NAME}',
            'text-font': ['Open Sans Italic', 'Arial Unicode MS Regular'],
            'text-size': 10,
            'text-anchor': 'right',
            'text-justify': 'right',
            'text-max-width': 12,
            'text-offset': [-1, 0],
          }}
          paint={{
            'icon-opacity': 1,
            'text-color': 'hsl(131, 83%, 19%)',
          }}
        />
        {/* layer showing trail selections */}
        {/* case layer showing trail selections */}
        {/* layer showing trail */}
        {/* case layer showing trail */}
        {/* layer showing trail highlights */}
        {/* case layer showing trail highlights */}
        <Layer
          id='trail_line_all_target'
          before='data-stack-placeholder'
          type='line'
          sourceId='trail_line_all'
          onMouseMove={(evt: any) => {
            evt.target.getCanvas().style.cursor = 'pointer';
          }}
          onMouseLeave={(evt: any) => {
            evt.target.getCanvas().style.cursor = '';
          }}
          paint={{
            'line-width': 40,
            'line-opacity': 0,
          }}
        />
        <Layer
          id='trail_line_all_highlight'
          before='trail_line_all_target'
          type='line'
          sourceId='trail_line_all'
          layout={{
            'line-join': 'round',
            'line-cap': 'round',
          }}
          paint={{
            'line-color': [
              'case',
              ['match', ['get', 'TRAILTYPE'], ['', 'WALKING'], true, false],
              'hsl(33, 100%, 64%)',
              ['match', ['get', 'TRAILTYPE'], ['', 'CYCLING'], true, false],
              'hsl(0, 100%, 69%)',
              [
                'match',
                ['get', 'TRAILTYPE'],
                ['', 'SU:WALK,BIKE'],
                true,
                false,
              ],
              'hsl(82, 100%, 41%)',
              'hsl(46, 98%, 30%)',
            ],
            'line-width': ['interpolate', ['linear'], ['zoom'], 4, 2, 22, 10],
          }}
          filter={[
            'in',
            'STAGE',
            selectedFeature != undefined &&
              selectedFeature.layer.id === 'trail_line_all_target' &&
              selectedFeature.properties.STAGE,
          ]}
        />
        <Layer
          id='trail_line_all_highlight_case'
          before='trail_line_all_highlight'
          type='line'
          sourceId='trail_line_all'
          layout={{
            'line-join': 'round',
            'line-cap': 'round',
          }}
          paint={{
            'line-color': 'white',
            'line-width': ['interpolate', ['linear'], ['zoom'], 4, 4, 22, 20],
          }}
          filter={[
            'in',
            'STAGE',
            selectedFeature != undefined &&
              selectedFeature.layer.id === 'trail_line_all_target' &&
              selectedFeature.properties.STAGE,
          ]}
        />
        ]} />
        <Layer
          id='trail_line_all'
          before='trail_line_all_highlight_case'
          type='line'
          sourceId='trail_line_all'
          layout={{
            'line-join': 'round',
            'line-cap': 'round',
          }}
          paint={{
            'line-color': [
              'case',
              ['match', ['get', 'TRAILTYPE'], ['', 'WALKING'], true, false],
              'hsl(33, 100%, 64%)',
              ['match', ['get', 'TRAILTYPE'], ['', 'CYCLING'], true, false],
              'hsl(0, 100%, 69%)',
              [
                'match',
                ['get', 'TRAILTYPE'],
                ['', 'SU:WALK,BIKE'],
                true,
                false,
              ],
              'hsl(82, 100%, 41%)',
              'hsl(46, 98%, 30%)',
            ],
            'line-width': ['interpolate', ['linear'], ['zoom'], 4, 1, 22, 5],
          }}
        />
        <Layer
          id='trail_line_all_case'
          before='trail_line_all'
          type='line'
          sourceId='trail_line_all'
          layout={{
            'line-join': 'round',
            'line-cap': 'round',
          }}
          paint={{
            'line-color': 'white',
            'line-width': ['interpolate', ['linear'], ['zoom'], 4, 2, 22, 10],
          }}
        />
      </MapComponent>
    </div>
  );
};

export default Map;

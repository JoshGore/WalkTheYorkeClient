//@format
// import React, { useState, useEffect } from 'react';
import React, {useState, useEffect} from 'react';
import ReactMapboxGl, {Source, Layer, Image} from 'react-mapbox-gl';
// (possibly update to actual typescript swizec])
import useDimensions from 'react-use-dimensions';
// import useDimensions from './react-use-dimensions/index';
// import stages from './data/walktheyorke_naturemaps_stages_simplified2.geojson';
import shelter from './icons/custom-shelter-15.png';
import bbox from '@turf/bbox';
import {featureCollection} from '@turf/helpers';
let stages = require('./data/walktheyorke_naturemaps_stages_simplified2.geojson');
let shelters = require('./data/walktheyorke_oldcouncil_shelters.geojson');

const MapComponent = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoiam9zaGciLCJhIjoiTFBBaE1JOCJ9.-BaGpeSYz4yPrpxh1eqT2A',
});

interface MapProps {
  // selection: (type: string, id: number): object;
  // selection: {type: string, id: number};
  selection: any;
  setSelection: any;
}

const Map: React.FC<MapProps> = ({selection, setSelection}) => {
  const [map, setMap] = useState<any>(false);
  const [ref, {width, height}] = useDimensions();
  const [selectedFeature, setSelectedFeature] = useState<any>(false);
  const [mapClickCoordinates, setMapClickCoordinates] = useState<any>({});
  // set map when component loads
  const onStyleLoad = (map: object) => {
    setMap(map);
  };
  // resize map on container size change
  useEffect(() => {
    map && map.resize();
  }, [width, height, map]);

  // handle map click/tap events
  const mapClick = (map: any, evt: any) => {
    // setMap(map);
    setMapClickCoordinates({
      point: [evt.point.x, evt.point.y],
      lngLat: evt.lngLat,
    });
  };

  // query map when clicked
  useEffect(() => {
    // updateHighlight();
    if (map) {
      console.log(map);
      // check if interactive feature returned at point
      const feature = map
        .queryRenderedFeatures(mapClickCoordinates.point)
        .filter(
          (feature: any) => feature.layer.id === 'trail_line_all_target',
        )[0];
      // if interactive feature returned set selected
      if (feature) {
        // id will show what kind of interactive feature is selected
        if (feature.layer.id === 'trail_line_all_target') {
          setSelectedFeature(feature);
          setSelection({type: 'stage', id: feature.properties.STAGE});
        }
      } else {
        setSelectedFeature(false);
      }
    }
  }, [mapClickCoordinates]);

  // zoom to stage if stage selected
  useEffect(() => {
    selection.type === 'stage' &&
      console.log(
        bbox(
          featureCollection(
            map.queryRenderedFeatures({
              layers: ['trail_line_all_highlight'],
              filter: ['==', 'STAGE', selection.id],
            }),
          ),
        ),
      );
    // console.log(map.queryRenderedFeatures('trail_line_all', {filter: ["==", 'STAGE', 1]}))
    // map.fitBounds(bbox(map.querySourceFeatures('trail_line_all')))
  }, [selection]);

  // state management - selected
  // state management - user type
  // state management - map interactions

  return (
    <div
      style={{display: 'flex', alignItems: 'stretch', flexGrow: 1, order: 10}}
      ref={ref}>
      <MapComponent
        style={'mapbox://styles/joshg/cjsv8vxg371cm1fmo1sscgou2'}
        containerStyle={{flex: 1}}
        onStyleLoad={onStyleLoad}
        fitBounds={[[136.585109, -35.314486], [138.366868, -33.99099]]}
        onClick={(map, evt) => mapClick(map, evt)}>
        {/* sources for trail lines, short walk lines, day walk lines, hero walk lines */}
        <Source
          id="trail_line_all"
          geoJsonSource={{type: 'geojson', data: stages}}
        />
        {/* sources for trail assets */}
        <Source
          id="trail_point_shelters"
          geoJsonSource={{type: 'geojson', data: shelters}}
        />
        <Image
          id={'custom-shelter-icon'}
          url={shelter}
          onError={() => console.log('image loading error')}
        />
        {/* data-stack-placeholder is a placeholder in mapbox styles placing data under existing labels */}
        <Layer
          id="trail_shelters"
          type="symbol"
          sourceId="trail_point_shelters"
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
          id="trail_line_all_target"
          before="data-stack-placeholder"
          type="line"
          sourceId="trail_line_all"
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
          id="trail_line_all_highlight"
          before="trail_line_all_target"
          type="line"
          sourceId="trail_line_all"
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
            selectedFeature &&
              selectedFeature.layer.id === 'trail_line_all_target' &&
              selectedFeature.properties.STAGE,
          ]}
        />
        <Layer
          id="trail_line_all_highlight_case"
          before="trail_line_all_highlight"
          type="line"
          sourceId="trail_line_all"
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
            selectedFeature &&
              selectedFeature.layer.id === 'trail_line_all_target' &&
              selectedFeature.properties.STAGE,
          ]}
        />
        ]} />
        <Layer
          id="trail_lines"
          before="trail_line_all_highlight_case"
          type="line"
          sourceId="trail_line_all"
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
          id="trail_lines_case"
          before="trail_lines"
          type="line"
          sourceId="trail_line_all"
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

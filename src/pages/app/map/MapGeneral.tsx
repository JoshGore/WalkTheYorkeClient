import React from 'react';
import { Source, Layer, Image } from 'react-mapbox-gl';
import { FeatureCollection } from 'geojson';
// import shelter from './icons/custom-shelter-15.png';
const shelter = require('./icons/custom-shelter-15.png');
const marker = require('./icons/custom-trail-sign.png');

interface MapGeneralProps {
  trailSection: any;
  trailObject: any;
  selectedFeature: any;
  stagesData: FeatureCollection;
  sheltersData: FeatureCollection;
  markersData: FeatureCollection;
}
const MapGeneral: React.FC<MapGeneralProps> = ({
  stagesData,
  sheltersData,
  markersData,
  selectedFeature,
}) => {
  React.useEffect(() => console.log(markersData.features.length));
  return (
    <>
      <Source
        id="trail_line_all"
        geoJsonSource={{ type: 'geojson', data: stagesData }}
      />
      <Source
        id="trail_point_shelters"
        geoJsonSource={{ type: 'geojson', data: sheltersData }}
      />
      <Source
        id="trail_point_markers"
        geoJsonSource={{ type: 'geojson', data: markersData }}
      />
      <Image
        id="custom-shelter-icon"
        url={shelter}
        onError={() => console.log('image loading error')}
      />
      <Image
        id="custom-marker-icon"
        url={marker}
        onError={() => console.log('image loading error')}
      />
      {/* data-stack-placeholder layer places data under labels */}
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
          'text-field': '{name}',
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
      <Layer
        id="trail_markers"
        type="symbol"
        sourceId="trail_point_markers"
        layout={{
          'icon-image': 'custom-marker-icon',
          'icon-size': 0.8,
          'icon-allow-overlap': true,
          'text-allow-overlap': false,
          'icon-optional': false,
          'text-optional': true,
          'text-field': '{name}',
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
            ['match', ['get', 'routeUsageType'], ['', 'walk'], true, false],
            'hsl(33, 100%, 64%)',
            ['match', ['get', 'routeUsageType'], ['', 'bike'], true, false],
            'hsl(0, 100%, 69%)',
            ['match', ['get', 'routeUsageType'], ['', 'shared'], true, false],
            'hsl(82, 100%, 41%)',
            'hsl(46, 98%, 30%)',
          ],
          'line-width': ['interpolate', ['linear'], ['zoom'], 4, 2, 22, 6],
        }}
        filter={[
          'in',
          'routeId',
          selectedFeature !== undefined &&
            selectedFeature.layer.id === 'trail_line_all_target' &&
            selectedFeature.properties.routeId,
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
          'line-width': ['interpolate', ['linear'], ['zoom'], 4, 4, 22, 12],
        }}
        filter={[
          'in',
          'routeId',
          selectedFeature !== undefined &&
            selectedFeature.layer.id === 'trail_line_all_target' &&
            selectedFeature.properties.routeId,
        ]}
      />
      <Layer
        id="trail_line_all"
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
            ['match', ['get', 'routeUsageType'], ['', 'walk'], true, false],
            'hsl(33, 100%, 64%)',
            ['match', ['get', 'routeUsageType'], ['', 'bike'], true, false],
            'hsl(0, 100%, 69%)',
            ['match', ['get', 'routeUsageType'], ['', 'shared'], true, false],
            'hsl(82, 100%, 41%)',
            'hsl(46, 98%, 30%)',
          ],
          'line-width': ['interpolate', ['linear'], ['zoom'], 4, 1, 22, 5],
        }}
      />
      <Layer
        id="trail_line_all_case"
        before="trail_line_all"
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
    </>
  );
};

export default MapGeneral;

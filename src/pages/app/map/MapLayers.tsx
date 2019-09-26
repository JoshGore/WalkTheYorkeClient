import React from 'react';
import { Source, Layer, Image } from 'react-mapbox-gl';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { TrailEntityProps } from '../../../contexts/TrailContext';
// import shelter from './icons/custom-shelter-15.png';
const shelter = require('./icons/custom-shelter-15.png');
const marker = require('./icons/custom-trail-sign.png');
const toilet = require('./icons/Toilet.png');
const seat = require('./icons/Bench.png');
const sign = require('./icons/Sign.png');

interface MapLayersProps {
  trailSection: any;
  trailObject: any;
  selectedStage: number | undefined;
}

const WALKTHEYORKE_TILE_SERVER_SOURCE = {
  type: 'vector',
  tiles: [process.env.REACT_APP_TILES_URL],
};

const MapLayers: React.FC<MapLayersProps> = ({ selectedStage }) => {
  const includeTempStackPlaceholder = false;
  const { loading: userPointsLoading, data: userPoints } = useQuery(
    gql`
      query allUserPoints {
        user_points {
          id
          description
          type {
            typeId: id
            name
            parentTypeId: type_id
          }
          geom
        }
      }
    `,
  );

  const userPointsToGeoJson = (userPoints: any) => ({
    type: 'FeatureCollection',
    features: userPoints.map(
      ({ id, type: { typeId, parentTypeId, name }, geom }: any) => ({
        type: 'Feature',
        id,
        properties: { type: name, typeId, parentTypeId },
        geometry: geom,
      }),
    ),
  });
  return (
    <>
      <Source
        id="walktheyorke_tile_server"
        tileJsonSource={WALKTHEYORKE_TILE_SERVER_SOURCE}
      />
      <Source
        id="all_user_points"
        geoJsonSource={{
          type: 'geojson',
          data: userPointsLoading
            ? userPointsToGeoJson([])
            : userPointsToGeoJson(userPoints.user_points),
        }}
      />
      <Image
        id="custom-shelter-icon"
        url={shelter}
        onError={() => console.log('image loading error')}
      />
      <Image
        id="custom-toilet-icon"
        url={toilet}
        onError={() => console.log('image loading error')}
      />
      <Image
        id="custom-seat-icon"
        url={seat}
        onError={() => console.log('image loading error')}
      />
      <Image
        id="custom-info-sign-icon"
        url={sign}
        onError={() => console.log('image loading error')}
      />
      <Image
        id="custom-marker-icon"
        url={marker}
        onError={() => console.log('image loading error')}
      />
      {/* data-stack-placeholder layer places data under labels */}
      <Layer
        id="user_points"
        type="circle"
        sourceId="all_user_points"
        paint={{'circle-color': 'mediumblue'}}
        onMouseMove={(evt: any) => {
          evt.target.getCanvas().style.cursor = 'pointer';
        }}
        onMouseLeave={(evt: any) => {
          evt.target.getCanvas().style.cursor = '';
        }}
        filter={['==', 17, ['get', 'parentTypeId']]}
      />
      <Layer
        id="user_issues"
        type="circle"
        sourceId="all_user_points"
        paint={{'circle-color': 'red'}}
        onMouseMove={(evt: any) => {
          evt.target.getCanvas().style.cursor = 'pointer';
        }}
        onMouseLeave={(evt: any) => {
          evt.target.getCanvas().style.cursor = '';
        }}
        filter={['==', 16, ['get', 'parentTypeId']]}
      />
      <Layer
        id="trail_shelters"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_shelters"
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
        onMouseMove={(evt: any) => {
          evt.target.getCanvas().style.cursor = 'pointer';
        }}
        onMouseLeave={(evt: any) => {
          evt.target.getCanvas().style.cursor = '';
        }}
      />
      <Layer
        id="trail_markers"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_markers"
        layout={{
          'icon-image': 'custom-marker-icon',
          'icon-size': 0.06,
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
        id="toilets"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="toilets"
        layout={{
          'icon-image': 'custom-toilet-icon',
          'icon-size': 0.2,
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
        id="seats"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="seats"
        layout={{
          'icon-image': 'custom-seat-icon',
          'icon-size': 0.2,
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
        id="info_signs"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="information"
        layout={{
          'icon-image': 'custom-info-sign-icon',
          'icon-size': 0.15,
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
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
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
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
        layout={{
          'line-join': 'round',
          'line-cap': 'round',
        }}
        paint={{
          'line-color': [
            'case',
            ['match', ['get', 'use'], ['', 'walk'], true, false],
            'hsl(33, 100%, 64%)',
            ['match', ['get', 'use'], ['', 'bike'], true, false],
            'hsl(0, 100%, 69%)',
            ['match', ['get', 'use'], ['', 'shared'], true, false],
            'hsl(82, 100%, 41%)',
            'hsl(46, 98%, 30%)',
          ],
          'line-width': ['interpolate', ['linear'], ['zoom'], 4, 2, 22, 6],
        }}
        filter={[
          'in',
          'route_id',
          selectedStage !== undefined && selectedStage,
        ]}
      />
      <Layer
        id="trail_line_all_highlight_case"
        before="trail_line_all_highlight"
        type="line"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
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
          'route_id',
          selectedStage !== undefined && selectedStage,
        ]}
      />
      <Layer
        id="trail_line_all"
        before="trail_line_all_highlight_case"
        type="line"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
        layout={{
          'line-join': 'round',
          'line-cap': 'round',
        }}
        paint={{
          'line-color': [
            'case',
            ['match', ['get', 'use'], ['', 'walk'], true, false],
            'hsl(33, 100%, 64%)',
            ['match', ['get', 'use'], ['', 'bike'], true, false],
            'hsl(0, 100%, 69%)',
            ['match', ['get', 'use'], ['', 'shared'], true, false],
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
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
        layout={{
          'line-join': 'round',
          'line-cap': 'round',
        }}
        paint={{
          'line-color': 'white',
          'line-width': ['interpolate', ['linear'], ['zoom'], 4, 2, 22, 10],
        }}
      />
      {includeTempStackPlaceholder && (
        <Layer
          id="data-stack-placeholder"
          paint={{ backgroundColor: 'white' }}
        />
      )}
    </>
  );
};

export default MapLayers;

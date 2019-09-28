import React from 'react';
import { Source, Layer, Image } from 'react-mapbox-gl';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { TrailEntityProps } from '../../../contexts/TrailContext';
// import shelter from './icons/custom-shelter-15.png';
const shelter = require('./icons/shelter_teardrop.png');
const marker = require('./icons/marker.png');
const toilet = require('./icons/Toilet.png');
const seat = require('./icons/Bench.png');
const sign = require('./icons/Sign.png');
const shared = require('./icons/shared.png');
const bicycling = require('./icons/bicycling.png');
const trailWalking = require('./icons/trail-walking.png');

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
      <Image
        id="bicycling"
        url={bicycling}
        onError={() => console.log('image loading error')}
      />
      <Image
        id="shared"
        url={shared}
        onError={() => console.log('image loading error')}
      />
      <Image
        id="trail-walking"
        url={trailWalking}
        onError={() => console.log('image loading error')}
      />
      {/* data-stack-placeholder layer places data under labels */}
      {includeTempStackPlaceholder && (
        <Layer
          id="data-stack-placeholder"
          paint={{ backgroundColor: 'white' }}
        />
      )}
      <Layer
        id="user_points"
        type="circle"
        sourceId="all_user_points"
        paint={{ 'circle-color': 'mediumblue' }}
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
        before="user_points"
        type="circle"
        sourceId="all_user_points"
        paint={{ 'circle-color': 'red' }}
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
        before="user_issues"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_shelters"
        layout={{
          'icon-image': 'custom-shelter-icon',
          'icon-size': 0.6,
          'icon-anchor': 'bottom',
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
        id="info_signs"
        before="trail_shelters"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="information"
        layout={{
          visibility: 'none',
          'icon-anchor': 'bottom',
          'icon-image': 'custom-info-sign-icon',
          'icon-size': 0.5,
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
        before="info_signs"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="toilets"
        layout={{
          visibility: 'none',
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
        before="toilets"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="seats"
        layout={{
          visibility: 'none',
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
        id="trail_markers"
        before="seats"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_markers"
        layout={{
          visibility: 'none',
          'icon-anchor': 'bottom',
          'icon-image': 'custom-marker-icon',
          'icon-size': 0.5,
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
        id="trail_line_all_symbol"
        before="trail_line_all_target"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
        layout={{
          'symbol-placement': 'line',
          'symbol-spacing': 100,
          'icon-rotation-alignment': 'viewport',
          'icon-image': [
            'match',
            ['get', 'use'],
            ['shared'],
            'shared',
            ['bike'],
            'bicycling',
            ['walk'],
            'trail-walking',
            '',
          ],
        }}
      />
      <Layer
        id="trail_line_all"
        before="trail_line_all_symbol"
        type="line"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
        layout={{
          'line-join': 'round',
          'line-cap': 'round',
          visibility: selectedStage === undefined ? 'visible' : 'none',
        }}
        paint={{
          'line-color': [
            'match',
            ['get', 'use'],
            ['shared'],
            'hsl(35, 93%, 52%)',
            ['bike'],
            '#179bde',
            ['walk'],
            'hsl(1, 68%, 61%)',
            '#000000',
          ],
          'line-width': 3,
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
          visibility: selectedStage === undefined ? 'visible' : 'none',
        }}
        paint={{
          'line-color': 'white',
          'line-width': 6,
        }}
      />
      <Layer
        id="trail_line_all_highlight"
        before="trail_line_all_case"
        type="line"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
        layout={{
          'line-join': 'round',
          'line-cap': 'round',
        }}
        paint={{
          'line-color': [
            'match',
            ['get', 'use'],
            ['shared'],
            'hsl(35, 93%, 52%)',
            ['bike'],
            '#179bde',
            ['walk'],
            'hsl(1, 68%, 61%)',
            '#000000',
          ],
          'line-width': 4,
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
          'line-width': 8,
        }}
        filter={[
          'in',
          'route_id',
          selectedStage !== undefined && selectedStage,
        ]}
      />
      <Layer
        id="trail_line_all_dashed"
        before="trail_line_all_highlight_case"
        type="line"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
        layout={{
          'line-join': 'round',
          'line-cap': 'round',
          visibility: selectedStage !== undefined ? 'visible' : 'none',
        }}
        paint={{
          'line-color': [
            'match',
            ['get', 'use'],
            ['shared'],
            'hsl(35, 93%, 52%)',
            ['bike'],
            '#179bde',
            ['walk'],
            'hsl(1, 68%, 61%)',
            '#000000',
          ],
          'line-width': 2.5,
          'line-dasharray': [1, 2],
        }}
      />
    </>
  );
};

export default MapLayers;

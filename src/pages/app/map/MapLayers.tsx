import React from 'react';
import { Source, Layer, Image } from 'react-mapbox-gl';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { TrailEntityProps } from '../../../contexts/TrailContext';

const shelter = require('./icons/shelter_teardrop.png');
const selected = require('./icons/selected_teardrop.png');
const marker = require('./icons/marker.png');
const toilet = require('./icons/Toilet.png');
const bench = require('./icons/Bench.png');
const infoSign = require('./icons/info_sign.png');
const shared = require('./icons/shared.png');
const bicycling = require('./icons/bicycling.png');
const trailWalking = require('./icons/trail-walking.png');

interface MapLayersProps {
  trailSection: any;
  trailObject: any;
  selectedStage: number | undefined;
  selectedFeatureLayerId: {
    layer: string | undefined;
    id: number | undefined;
  };
}

const WALKTHEYORKE_TILE_SERVER_SOURCE = {
  type: 'vector',
  tiles: [process.env.REACT_APP_TILES_URL],
};

const MapLayers: React.FC<MapLayersProps> = ({
  selectedStage,
  selectedFeatureLayerId,
}) => {
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
        id="shelter_teardrop"
        url={shelter}
        onError={() => console.log('image loading error')}
      />
      <Image
        id="selected_teardrop"
        url={selected}
        onError={() => console.log('image loading error')}
      />
      <Image
        id="toilet"
        url={toilet}
        onError={() => console.log('image loading error')}
      />
      <Image
        id="bench"
        url={bench}
        onError={() => console.log('image loading error')}
      />
      <Image
        id="info_sign"
        url={infoSign}
        onError={() => console.log('image loading error')}
      />
      <Image
        id="marker"
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
        id="shelter"
        before="user_issues"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_shelters"
        layout={{
          'icon-image': [
            'match',
            ['id'],
            [
              selectedFeatureLayerId.layer === 'shelter'
                ? selectedFeatureLayerId.id
                : '',
            ],
            'selected_teardrop',
            'shelter_teardrop',
          ],
          'icon-size': ['interpolate', ['linear'], ['zoom'], 8, 0.3, 22, 0.5],
          'icon-offset': [0, 0],
          'text-field': ['to-string', ['get', 'name']],
          'text-size': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            [
              'match',
              ['id'],
              [
                selectedFeatureLayerId.layer === 'shelter'
                  ? selectedFeatureLayerId.id
                  : '',
              ],
              8,
              6,
            ],
            22,
            [
              'match',
              ['id'],
              [
                selectedFeatureLayerId.layer === 'shelter'
                  ? selectedFeatureLayerId.id
                  : '',
              ],
              14,
              12,
            ],
          ],
          'text-anchor': 'top',
          'icon-anchor': 'bottom',
          'icon-allow-overlap': true,
          'text-allow-overlap': true,
        }}
        paint={{
          'text-color': [
            'match',
            ['id'],
            [
              selectedFeatureLayerId.layer === 'shelter'
                ? selectedFeatureLayerId.id
                : '',
            ],
            '#9e0000',
            'hsl(304, 100%, 31%)',
          ],
          'text-halo-color': 'hsl(0, 2%, 100%)',
          'text-halo-width': 1,
          'text-translate': [0, 3],
          'icon-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8,
            [
              'match',
              ['id'],
              [
                selectedFeatureLayerId.layer === 'shelter'
                  ? selectedFeatureLayerId.id
                  : '',
              ],
              1,
              0,
            ],
            8.25,
            1,
            22,
            1,
          ],
          'text-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            9,
            [
              'match',
              ['id'],
              [
                selectedFeatureLayerId.layer === 'shelter'
                  ? selectedFeatureLayerId.id
                  : '',
              ],
              1,
              0,
            ],
            9.2,
            1,
            22,
            1,
          ],
        }}
        onMouseMove={(evt: any) => {
          evt.target.getCanvas().style.cursor = 'pointer';
        }}
        onMouseLeave={(evt: any) => {
          evt.target.getCanvas().style.cursor = '';
        }}
      />
      <Layer
        id="information-sign"
        before="shelter"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="information"
        layout={{
          'icon-image': 'info_sign',
          'text-field': ['to-string', ['get', 'name']],
          'text-anchor': 'top',
          'text-size': 9,
          'icon-allow-overlap': true,
          'icon-padding': 0,
          'icon-anchor': 'bottom',
        }}
        paint={{
          'text-color': '#591a03',
          'text-halo-color': 'hsl(0, 91%, 100%)',
          'text-halo-width': 1,
          'text-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            11,
            0,
            11.2,
            1,
            22,
            1,
          ],
          'icon-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            10,
            0,
            10.2,
            1,
            22,
            1,
          ],
        }}
      />
      <Layer
        id="toilet"
        before="information-sign"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="toilets"
        layout={{
          'icon-image': 'toilet',
          'text-field': ['to-string', ['get', 'name']],
          'text-anchor': 'top',
          'text-size': 11,
          'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
          'icon-padding': 0,
        }}
        paint={{
          'icon-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            10,
            0,
            10.5,
            1,
            22,
            1,
          ],
          'text-color': 'hsl(36, 80%, 16%)',
          'text-translate': [0, 9],
          'text-halo-color': 'hsl(0, 0%, 100%)',
          'text-halo-width': 0.5,
          'text-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            0,
            13,
            0,
            13.25,
            1,
            22,
            1,
          ],
        }}
      />
      <Layer
        id="seat"
        before="toilet"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="seats"
        layout={{
          'icon-image': 'bench',
          'icon-size': 1,
          'icon-padding': 0,
        }}
        paint={{
          'icon-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            0,
            12,
            0,
            12.2,
            1,
            22,
            1,
          ],
        }}
      />
      <Layer
        id="trail-marker"
        before="seat"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_markers"
        layout={{
          'icon-image': 'marker',
          'text-field': ['to-string', ['get', 'name']],
          'text-size': 9,
          'text-anchor': 'bottom-left',
          'text-font': ['Open Sans Light Italic', 'Arial Unicode MS Regular'],
          'icon-allow-overlap': true,
          'icon-padding': 0,
          'icon-anchor': 'bottom',
        }}
        paint={{
          'text-color': '#591a03',
          'text-translate': [6, -4],
          'text-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            0,
            14,
            0,
            14.25,
            1,
            22,
            1,
          ],
          'icon-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            0,
            13,
            0,
            13.25,
            1,
            22,
            1,
          ],
        }}
      />
      <Layer
        id="trail-line-target"
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
        id="trail-line-icons"
        before="trail-line-target"
        type="symbol"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
        layout={{
          visibility: 'visible',
          'symbol-placement': 'line',
          'symbol-spacing': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8,
            20,
            22,
            200,
          ],
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
          'icon-padding': 0,
        }}
        paint={{
          'icon-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8,
            0,
            8.2,
            1,
            22,
            1,
          ],
        }}
      />
      <Layer
        id="trail-line-plain"
        before="trail-line-icons"
        type="line"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
        layout={{
          visibility: selectedStage === undefined ? 'visible' : 'none',
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
          'line-width': 3,
        }}
      />
      <Layer
        id="trail-line-case"
        before="trail-line-plain"
        type="line"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
        layout={{
          visibility: selectedStage === undefined ? 'visible' : 'none',
          'line-join': 'round',
          'line-cap': 'round',
        }}
        paint={{
          'line-color': 'hsl(0, 0%, 100%)',
          'line-width': 6,
        }}
      />
      <Layer
        id="trail-line-selection"
        before="trail-line-case"
        type="line"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
        layout={{
          'line-join': 'round',
          'line-cap': 'round',
          visibility: 'visible',
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
        id="trail-line-case-selection"
        before="trail-line-selection"
        type="line"
        sourceId="walktheyorke_tile_server"
        sourceLayer="trail_stages"
        layout={{
          'line-join': 'round',
          'line-cap': 'round',
          visibility: 'visible',
        }}
        paint={{
          'line-color': 'hsl(0, 0%, 100%)',
          'line-width': 8,
        }}
        filter={[
          'in',
          'route_id',
          selectedStage !== undefined && selectedStage,
        ]}
      />
      <Layer
        id="trail-line-dashed"
        before="trail-line-case-selection"
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

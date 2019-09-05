import React from 'react';
import { Layer } from 'react-mapbox-gl';

const SettlementSubdivisionLabel: React.FC = () => (
  <Layer
    minZoom={10}
    layout={{
      'text-field': ['coalesce', ['get', 'name_en'], ['get', 'name']],
      'text-transform': 'uppercase',
      'text-font': ['DIN Offc Pro Regular', 'Arial Unicode MS Regular'],
      'text-letter-spacing': [
        'match',
        ['get', 'type'],
        'suburb',
        0.15,
        ['quarter', 'neighborhood'],
        0.1,
        0.1,
      ],
      'text-max-width': 7,
      'text-padding': 3,
      'text-size': [
        'interpolate',
        ['cubic-bezier', 0.5, 0, 1, 1],
        ['zoom'],
        11,
        [
          'match',
          ['get', 'type'],
          'suburb',
          11,
          ['quarter', 'neighborhood'],
          10.5,
          10.5,
        ],
        15,
        [
          'match',
          ['get', 'type'],
          'suburb',
          17,
          ['quarter', 'neighborhood'],
          16,
          16,
        ],
      ],
    }}
    maxZoom={15}
    filter={[
      'all',
      ['==', ['get', 'class'], 'settlement_subdivision'],
      ['<=', ['get', 'filterrank'], 4],
    ]}
    type="symbol"
    source="composite"
    id="settlement-subdivision-label"
    paint={{
      'text-halo-color': 'hsl(0, 0%, 100%)',
      'text-halo-width': 1,
      'text-color': 'hsl(230, 29%, 35%)',
      'text-halo-blur': 0.5,
    }}
    sourceLayer="place_label"
  />
);

export default SettlementSubdivisionLabel;

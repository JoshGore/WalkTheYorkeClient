import React from 'react';
import { Source, Layer } from 'react-mapbox-gl';

const StateLabel: React.FC = () => (
  <Layer
    minZoom={3}
    layout={{
      'text-size': [
        'interpolate',
        [
          'cubic-bezier',
          0.85,
          0.7,
          0.65,
          1,
        ],
        [
          'zoom',
        ],
        4,
        [
          'step',
          [
            'get',
            'symbolrank',
          ],
          10,
          6,
          9.5,
          7,
          9,
        ],
        9,
        [
          'step',
          [
            'get',
            'symbolrank',
          ],
          24,
          6,
          18,
          7,
          14,
        ],
      ],
      'text-transform': 'uppercase',
      'text-font': [
        'DIN Offc Pro Bold',
        'Arial Unicode MS Bold',
      ],
      'text-field': [
        'step',
        [
          'zoom',
        ],
        [
          'step',
          [
            'get',
            'symbolrank',
          ],
          [
            'coalesce',
            [
              'get',
              'name_en',
            ],
            [
              'get',
              'name',
            ],
          ],
          5,
          [
            'coalesce',
            [
              'get',
              'abbr',
            ],
            [
              'get',
              'name_en',
            ],
            [
              'get',
              'name',
            ],
          ],
        ],
        5,
        [
          'coalesce',
          [
            'get',
            'name_en',
          ],
          [
            'get',
            'name',
          ],
        ],
      ],
      'text-letter-spacing': 0.15,
      'text-max-width': 6,
    }}
    maxzoom={9}
    filter={[
      '==',
      [
        'get',
        'class',
      ],
      'state',
    ]}
    type="symbol"
    source="composite"
    id="state-label"
    paint={{
      'text-color': 'hsl(0, 0%, 0%)',
      'text-halo-color': 'hsl(0, 0%, 100%)',
      'text-halo-width': 1,
    }}
    sourceLayer="place_label"
  />
);

export default StateLabel;

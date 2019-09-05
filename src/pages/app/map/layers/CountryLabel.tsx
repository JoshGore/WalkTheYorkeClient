import React from 'react';
import { Source, Layer } from 'react-mapbox-gl';

const CountryLabel: React.FC = () => (
  <Layer
    minZoom={1}
    layout={{
      'text-line-height': 1.1,
      'text-size': [
        'interpolate',
        ['cubic-bezier', 0.2, 0, 0.7, 1],
        ['zoom'],
        1,
        ['step', ['get', 'symbolrank'], 11, 4, 9, 5, 8],
        9,
        ['step', ['get', 'symbolrank'], 28, 4, 22, 5, 21],
      ],
      'icon-image': 'dot-11',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Regular'],
      'text-justify': [
        'step',
        ['zoom'],
        [
          'match',
          ['get', 'text_anchor'],
          ['bottom', 'top'],
          'center',
          ['left', 'bottom-left', 'top-left'],
          'left',
          ['right', 'bottom-right', 'top-right'],
          'right',
          'center',
        ],
        7,
        'center',
      ],
      'text-offset': [
        'step',
        ['zoom'],
        [
          'match',
          ['get', 'text_anchor'],
          'bottom',
          ['literal', [0, -0.25]],
          'bottom-left',
          ['literal', [0.2, -0.05]],
          'left',
          ['literal', [0.4, 0.05]],
          'top-left',
          ['literal', [0.2, 0.05]],
          'top',
          ['literal', [0, 0.25]],
          'top-right',
          ['literal', [-0.2, 0.05]],
          'right',
          ['literal', [-0.4, 0.05]],
          'bottom-right',
          ['literal', [-0.2, -0.05]],
          ['literal', [0, -0.25]],
        ],
        7,
        ['literal', [0, 0]],
      ],
      'text-anchor': [
        'step',
        ['zoom'],
        ['coalesce', ['get', 'text_anchor'], 'center'],
        7,
        'center',
      ],
      'text-field': ['coalesce', ['get', 'name_en'], ['get', 'name']],
      'text-max-width': 6,
    }}
    maxzoom={10}
    filter={['==', ['get', 'class'], 'country']}
    type="symbol"
    source="composite"
    id="country-label"
    paint={{
      'icon-opacity': [
        'step',
        ['zoom'],
        ['case', ['has', 'text_anchor'], 1, 0],
        7,
        0,
      ],
      'text-color': 'hsl(0, 0%, 0%)',
      'text-halo-color': [
        'interpolate',
        ['linear'],
        ['zoom'],
        2,
        'rgba(255,255,255,0.75)',
        3,
        'hsl(0, 0%, 100%)',
      ],
      'text-halo-width': 1.25,
    }}
    sourceLayer="place_label"
  />
);

export default CountryLabel;

export const style = {
  version: 8,
  name: 'WTY Outdoors',
  metadata: {
    'mapbox:type': 'default',
    'mapbox:origin': 'outdoors-v11',
    'mapbox:autocomposite': true,
    'mapbox:groups': {
      1444855786460.0557: {
        name: 'Roads',
        collapsed: true,
      },
      1444934295202.7542: {
        name: 'Admin boundaries',
        collapsed: true,
      },
      1444855799204.86: {
        name: 'Bridges',
        collapsed: true,
      },
      1444855769305.6016: {
        name: 'Tunnels',
        collapsed: true,
      },
    },
    'mapbox:sdk-support': {
      js: '0.50.0',
      android: '6.7.0',
      ios: '4.6.0',
    },
  },
  center: [
    138.23658420194397,
    -34.79276194845292,
  ],
  zoom: 8.32990885760482,
  bearing: 0,
  pitch: 0,
  sources: {
    composite: {
      url: 'mapbox://mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2',
      type: 'vector',
    },
  },
  sprite: 'mapbox://sprites/joshg/cjsv8vxg371cm1fmo1sscgou2/ayuihl2d38ufkjhmu0pwx0cto',
  glyphs: 'mapbox://fonts/joshg/{fontstack}/{range}.pbf',
  layers: [
    {
      id: 'land',
      type: 'background',
      layout: {},
      paint: {
        'background-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          11,
          'hsl(35, 32%, 91%)',
          13,
          'hsl(35, 12%, 89%)',
        ],
      },
    },
    {
      id: 'landcover',
      type: 'fill',
      source: 'composite',
      'source-layer': 'landcover',
      maxzoom: 12,
      layout: {},
      paint: {
        'fill-color': [
          'match',
          [
            'get',
            'class',
          ],
          'snow',
          'hsl(0, 0%, 100%)',
          'hsl(75, 62%, 81%)',
        ],
        'fill-opacity': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          2,
          0.3,
          12,
          0,
        ],
        'fill-antialias': false,
      },
    },
    {
      minzoom: 5,
      layout: {},
      filter: [
        '==',
        [
          'get',
          'class',
        ],
        'national_park',
      ],
      type: 'fill',
      source: 'composite',
      id: 'national-park',
      paint: {
        'fill-color': 'hsl(100, 58%, 76%)',
        'fill-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          5,
          0,
          6,
          0.75,
          10,
          0.35,
        ],
      },
      'source-layer': 'landuse_overlay',
    },
    {
      minzoom: 9,
      layout: {
        'line-cap': 'round',
      },
      filter: [
        '==',
        [
          'get',
          'class',
        ],
        'national_park',
      ],
      type: 'line',
      source: 'composite',
      id: 'national_park-tint-band',
      paint: {
        'line-color': 'hsl(100, 62%, 74%)',
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.4,
          ],
          [
            'zoom',
          ],
          9,
          1,
          14,
          8,
        ],
        'line-offset': [
          'interpolate',
          [
            'exponential',
            1.4,
          ],
          [
            'zoom',
          ],
          9,
          0,
          14,
          -2.5,
        ],
        'line-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          9,
          0,
          10,
          0.75,
        ],
        'line-blur': 3,
      },
      'source-layer': 'landuse_overlay',
    },
    {
      minzoom: 5,
      layout: {},
      filter: [
        'match',
        [
          'get',
          'class',
        ],
        [
          'park',
          'airport',
          'cemetery',
          'glacier',
          'hospital',
          'pitch',
          'sand',
          'school',
          'agriculture',
          'wood',
          'grass',
          'scrub',
        ],
        true,
        false,
      ],
      type: 'fill',
      source: 'composite',
      id: 'landuse',
      paint: {
        'fill-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          15,
          [
            'match',
            [
              'get',
              'class',
            ],
            'park',
            [
              'match',
              [
                'get',
                'type',
              ],
              [
                'garden',
                'playground',
                'zoo',
              ],
              'hsl(100, 59%, 81%)',
              'hsl(100, 58%, 76%)',
            ],
            'airport',
            'hsl(230, 15%, 86%)',
            'cemetery',
            'hsl(75, 37%, 81%)',
            'glacier',
            'hsl(196, 72%, 93%)',
            'hospital',
            'hsl(340, 37%, 87%)',
            'pitch',
            'hsl(100, 57%, 72%)',
            'sand',
            'hsl(60, 46%, 87%)',
            'school',
            'hsl(50, 47%, 81%)',
            'agriculture',
            'hsl(75, 37%, 81%)',
            [
              'wood',
              'grass',
              'scrub',
            ],
            'hsl(75, 41%, 74%)',
            'hsla(0, 0%, 0%, 0)',
          ],
          16,
          [
            'match',
            [
              'get',
              'class',
            ],
            'park',
            [
              'match',
              [
                'get',
                'type',
              ],
              [
                'garden',
                'playground',
                'zoo',
              ],
              'hsl(100, 59%, 81%)',
              'hsl(100, 58%, 76%)',
            ],
            'airport',
            'hsl(230, 29%, 89%)',
            'cemetery',
            'hsl(75, 37%, 81%)',
            'glacier',
            'hsl(196, 72%, 93%)',
            'hospital',
            'hsl(340, 63%, 89%)',
            'pitch',
            'hsl(100, 57%, 72%)',
            'sand',
            'hsl(60, 46%, 87%)',
            'school',
            'hsl(50, 63%, 84%)',
            'agriculture',
            'hsl(75, 37%, 81%)',
            [
              'wood',
              'grass',
              'scrub',
            ],
            'hsl(75, 41%, 74%)',
            'hsla(0, 0%, 0%, 0)',
          ],
        ],
        'fill-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          5,
          0,
          6,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'agriculture',
              'wood',
              'grass',
              'scrub',
            ],
            0,
            'glacier',
            0.5,
            1,
          ],
          15,
          [
            'match',
            [
              'get',
              'class',
            ],
            'agriculture',
            0.75,
            [
              'wood',
              'glacier',
            ],
            0.5,
            'grass',
            0.4,
            'scrub',
            0.2,
            1,
          ],
        ],
      },
      'source-layer': 'landuse',
    },
    {
      minzoom: 15,
      layout: {},
      filter: [
        '==',
        [
          'get',
          'class',
        ],
        'pitch',
      ],
      type: 'line',
      source: 'composite',
      id: 'pitch-outline',
      paint: {
        'line-color': 'hsl(75, 57%, 84%)',
      },
      'source-layer': 'landuse',
    },
    {
      id: 'waterway-shadow',
      type: 'line',
      source: 'composite',
      'source-layer': 'waterway',
      minzoom: 8,
      layout: {
        'line-cap': [
          'step',
          [
            'zoom',
          ],
          'butt',
          11,
          'round',
        ],
        'line-join': 'round',
      },
      paint: {
        'line-color': 'hsl(215, 84%, 69%)',
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.3,
          ],
          [
            'zoom',
          ],
          9,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'canal',
              'river',
            ],
            0.1,
            0,
          ],
          20,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'canal',
              'river',
            ],
            8,
            3,
          ],
        ],
        'line-translate': [
          'interpolate',
          [
            'exponential',
            1.2,
          ],
          [
            'zoom',
          ],
          7,
          [
            'literal',
            [
              0,
              0,
            ],
          ],
          16,
          [
            'literal',
            [
              -1,
              -1,
            ],
          ],
        ],
        'line-translate-anchor': 'viewport',
        'line-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          8,
          0,
          8.5,
          1,
        ],
      },
    },
    {
      id: 'water-shadow',
      type: 'fill',
      source: 'composite',
      'source-layer': 'water',
      layout: {},
      paint: {
        'fill-color': 'hsl(215, 84%, 69%)',
        'fill-translate': [
          'interpolate',
          [
            'exponential',
            1.2,
          ],
          [
            'zoom',
          ],
          7,
          [
            'literal',
            [
              0,
              0,
            ],
          ],
          16,
          [
            'literal',
            [
              -1,
              -1,
            ],
          ],
        ],
        'fill-translate-anchor': 'viewport',
      },
    },
    {
      id: 'waterway',
      type: 'line',
      source: 'composite',
      'source-layer': 'waterway',
      minzoom: 8,
      layout: {
        'line-cap': [
          'step',
          [
            'zoom',
          ],
          'butt',
          11,
          'round',
        ],
        'line-join': 'round',
      },
      paint: {
        'line-color': 'hsl(205, 87%, 76%)',
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.3,
          ],
          [
            'zoom',
          ],
          9,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'canal',
              'river',
            ],
            0.1,
            0,
          ],
          20,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'canal',
              'river',
            ],
            8,
            3,
          ],
        ],
        'line-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          8,
          0,
          8.5,
          1,
        ],
      },
    },
    {
      id: 'water',
      type: 'fill',
      source: 'composite',
      'source-layer': 'water',
      layout: {},
      paint: {
        'fill-color': 'hsl(196, 80%, 70%)',
      },
    },
    {
      id: 'wetland',
      type: 'fill',
      source: 'composite',
      'source-layer': 'landuse_overlay',
      minzoom: 5,
      filter: [
        'match',
        [
          'get',
          'class',
        ],
        [
          'wetland',
          'wetland_noveg',
        ],
        true,
        false,
      ],
      paint: {
        'fill-color': 'hsl(185, 43%, 74%)',
        'fill-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          10,
          0.25,
          10.5,
          0.15,
        ],
      },
    },
    {
      id: 'wetland-pattern',
      type: 'fill',
      source: 'composite',
      'source-layer': 'landuse_overlay',
      minzoom: 5,
      filter: [
        'match',
        [
          'get',
          'class',
        ],
        [
          'wetland',
          'wetland_noveg',
        ],
        true,
        false,
      ],
      paint: {
        'fill-color': 'hsl(185, 43%, 74%)',
        'fill-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          10,
          0,
          10.5,
          1,
        ],
        'fill-pattern': 'wetland',
        'fill-translate-anchor': 'viewport',
      },
    },
    {
      id: 'hillshade',
      type: 'fill',
      source: 'composite',
      'source-layer': 'hillshade',
      maxzoom: 16,
      layout: {},
      paint: {
        'fill-color': [
          'match',
          [
            'get',
            'class',
          ],
          'shadow',
          'hsl(56, 59%, 22%)',
          'hsl(0, 0%, 100%)',
        ],
        'fill-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          14,
          [
            'match',
            [
              'get',
              'level',
            ],
            [
              67,
              56,
            ],
            0.08,
            [
              89,
              78,
            ],
            0.07,
            0.15,
          ],
          16,
          0,
        ],
        'fill-antialias': false,
      },
    },
    {
      minzoom: 11,
      layout: {},
      filter: [
        '!=',
        [
          'get',
          'index',
        ],
        -1,
      ],
      type: 'line',
      source: 'composite',
      id: 'contour-line',
      paint: {
        'line-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          11,
          [
            'match',
            [
              'get',
              'index',
            ],
            [
              1,
              2,
            ],
            0.15,
            0.25,
          ],
          12,
          [
            'match',
            [
              'get',
              'index',
            ],
            [
              1,
              2,
            ],
            0.3,
            0.5,
          ],
        ],
        'line-color': 'hsl(100, 100%, 20%)',
        'line-width': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          13,
          [
            'match',
            [
              'get',
              'index',
            ],
            [
              1,
              2,
            ],
            0.5,
            0.6,
          ],
          16,
          [
            'match',
            [
              'get',
              'index',
            ],
            [
              1,
              2,
            ],
            0.8,
            1.2,
          ],
        ],
        'line-offset': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          13,
          [
            'match',
            [
              'get',
              'index',
            ],
            [
              1,
              2,
            ],
            1,
            0.6,
          ],
          16,
          [
            'match',
            [
              'get',
              'index',
            ],
            [
              1,
              2,
            ],
            1.6,
            1.2,
          ],
        ],
      },
      'source-layer': 'contour',
    },
    {
      minzoom: 13,
      layout: {},
      filter: [
        'all',
        [
          '==',
          [
            'geometry-type',
          ],
          'Polygon',
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'land',
        ],
      ],
      type: 'fill',
      source: 'composite',
      id: 'land-structure-polygon',
      paint: {
        'fill-color': 'hsl(35, 12%, 89%)',
      },
      'source-layer': 'structure',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
      },
      filter: [
        'all',
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'land',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'land-structure-line',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.99,
          ],
          [
            'zoom',
          ],
          14,
          0.75,
          20,
          40,
        ],
        'line-color': 'hsl(35, 12%, 89%)',
      },
      'source-layer': 'structure',
    },
    {
      minzoom: 11,
      layout: {},
      filter: [
        'all',
        [
          '==',
          [
            'geometry-type',
          ],
          'Polygon',
        ],
        [
          'match',
          [
            'get',
            'type',
          ],
          [
            'runway',
            'taxiway',
            'helipad',
          ],
          true,
          false,
        ],
      ],
      type: 'fill',
      source: 'composite',
      id: 'aeroway-polygon',
      paint: {
        'fill-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          15,
          'hsl(230, 23%, 82%)',
          16,
          'hsl(230, 37%, 84%)',
        ],
        'fill-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          11,
          0,
          11.5,
          1,
        ],
      },
      'source-layer': 'aeroway',
    },
    {
      minzoom: 9,
      layout: {},
      filter: [
        '==',
        [
          'geometry-type',
        ],
        'LineString',
      ],
      type: 'line',
      source: 'composite',
      id: 'aeroway-line',
      paint: {
        'line-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          15,
          'hsl(230, 23%, 82%)',
          16,
          'hsl(230, 37%, 84%)',
        ],
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          9,
          [
            'match',
            [
              'get',
              'type',
            ],
            'runway',
            1,
            'taxiway',
            0.5,
            0.5,
          ],
          18,
          [
            'match',
            [
              'get',
              'type',
            ],
            'runway',
            80,
            'taxiway',
            20,
            20,
          ],
        ],
      },
      'source-layer': 'aeroway',
    },
    {
      minzoom: 15,
      layout: {},
      filter: [
        'all',
        [
          '!=',
          [
            'get',
            'type',
          ],
          'building:part',
        ],
        [
          '==',
          [
            'get',
            'underground',
          ],
          'false',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'building-outline',
      paint: {
        'line-color': 'hsl(35, 6%, 79%)',
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          0.75,
          20,
          3,
        ],
        'line-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          15,
          0,
          16,
          1,
        ],
      },
      'source-layer': 'building',
    },
    {
      minzoom: 15,
      layout: {},
      filter: [
        'all',
        [
          '!=',
          [
            'get',
            'type',
          ],
          'building:part',
        ],
        [
          '==',
          [
            'get',
            'underground',
          ],
          'false',
        ],
      ],
      type: 'fill',
      source: 'composite',
      id: 'building',
      paint: {
        'fill-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          15,
          'hsl(35, 11%, 86%)',
          16,
          'hsl(35, 8%, 85%)',
        ],
        'fill-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          15,
          0,
          16,
          1,
        ],
        'fill-outline-color': 'hsl(35, 6%, 79%)',
      },
      'source-layer': 'building',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'track',
              'primary_link',
            ],
            true,
            false,
          ],
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'track',
              'primary_link',
              'secondary_link',
              'tertiary_link',
              'service',
            ],
            true,
            false,
          ],
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-street-minor-low',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'primary_link',
            ],
            2,
            'track',
            1,
            0.5,
          ],
          18,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'primary_link',
            ],
            18,
            12,
          ],
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          1,
          14,
          0,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'track',
              'primary_link',
            ],
            true,
            false,
          ],
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'track',
              'primary_link',
              'secondary_link',
              'tertiary_link',
              'service',
            ],
            true,
            false,
          ],
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-street-minor-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.75,
          20,
          2,
        ],
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'track',
          'hsl(50, 100%, 40%)',
          'hsl(230, 19%, 75%)',
        ],
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'primary_link',
            ],
            2,
            'track',
            1,
            0.5,
          ],
          18,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'primary_link',
            ],
            18,
            12,
          ],
        ],
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            'track',
            1,
            0,
          ],
          14,
          1,
        ],
        'line-dasharray': [
          3,
          3,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'primary',
            'secondary',
            'tertiary',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-primary-secondary-tertiary-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          10,
          [
            'match',
            [
              'get',
              'class',
            ],
            'primary',
            1,
            [
              'secondary',
              'tertiary',
            ],
            0.75,
            0.75,
          ],
          18,
          2,
        ],
        'line-color': 'hsl(230, 19%, 75%)',
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          [
            'match',
            [
              'get',
              'class',
            ],
            'primary',
            0.75,
            [
              'secondary',
              'tertiary',
            ],
            0.1,
            0.1,
          ],
          18,
          [
            'match',
            [
              'get',
              'class',
            ],
            'primary',
            32,
            [
              'secondary',
              'tertiary',
            ],
            26,
            26,
          ],
        ],
        'line-dasharray': [
          3,
          3,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway_link',
            'trunk_link',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-major-link-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.75,
          20,
          2,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          2,
          18,
          18,
        ],
        'line-dasharray': [
          3,
          3,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'trunk',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-motorway-trunk-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          10,
          1,
          18,
          2,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          0.75,
          18,
          32,
        ],
        'line-dasharray': [
          3,
          3,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 14,
      layout: {},
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'construction',
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-construction',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          2,
          18,
          18,
        ],
        'line-color': 'hsl(230, 24%, 87%)',
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              0.4,
              0.8,
            ],
          ],
          15,
          [
            'literal',
            [
              0.3,
              0.6,
            ],
          ],
          16,
          [
            'literal',
            [
              0.2,
              0.3,
            ],
          ],
          17,
          [
            'literal',
            [
              0.2,
              0.25,
            ],
          ],
          18,
          [
            'literal',
            [
              0.15,
              0.15,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'path',
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'type',
            ],
            [
              'bridleway',
              'footway',
              'path',
              'hiking',
              'mountain_bike',
              'trail',
            ],
            true,
            false,
          ],
          16,
          [
            'match',
            [
              'get',
              'type',
            ],
            [
              'bridleway',
              'footway',
              'path',
              'hiking',
              'mountain_bike',
              'trail',
              'corridor',
              'sidewalk',
              'crossing',
            ],
            true,
            false,
          ],
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-path-smooth-rough',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          1,
          18,
          4,
        ],
        'line-color': 'hsl(35, 26%, 95%)',
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              4,
              0.4,
            ],
          ],
          15,
          [
            'literal',
            [
              3,
              0.4,
            ],
          ],
          16,
          [
            'literal',
            [
              3,
              0.35,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'path',
        ],
        [
          'match',
          [
            'get',
            'type',
          ],
          [
            'cycleway',
            'piste',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-path-cycleway-piste',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          1,
          18,
          4,
        ],
        'line-color': 'hsl(35, 26%, 95%)',
      },
      'source-layer': 'road',
    },
    {
      minzoom: 14,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'steps',
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-steps',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          1,
          16,
          1.6,
          18,
          6,
        ],
        'line-color': 'hsl(35, 26%, 95%)',
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              1,
              0,
            ],
          ],
          15,
          [
            'literal',
            [
              1.75,
              1,
            ],
          ],
          16,
          [
            'literal',
            [
              1,
              0.75,
            ],
          ],
          17,
          [
            'literal',
            [
              0.3,
              0.3,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway_link',
            'trunk_link',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-major-link',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          2,
          18,
          18,
        ],
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'motorway_link',
          'hsl(26, 74%, 81%)',
          'trunk_link',
          'hsl(46, 77%, 78%)',
          'hsl(46, 77%, 78%)',
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'pedestrian',
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-pedestrian',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          0.5,
          18,
          12,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              1,
              0,
            ],
          ],
          15,
          [
            'literal',
            [
              1.5,
              0.4,
            ],
          ],
          16,
          [
            'literal',
            [
              1,
              0.2,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'track',
              'primary_link',
            ],
            true,
            false,
          ],
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'track',
              'primary_link',
              'secondary_link',
              'tertiary_link',
              'service',
            ],
            true,
            false,
          ],
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-street-minor',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'primary_link',
            ],
            2,
            'track',
            1,
            0.5,
          ],
          18,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'primary_link',
            ],
            18,
            12,
          ],
        ],
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'street_limited',
          'hsl(35, 14%, 93%)',
          'hsl(0, 0%, 100%)',
        ],
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            'track',
            1,
            0,
          ],
          14,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'primary',
            'secondary',
            'tertiary',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-primary-secondary-tertiary',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          [
            'match',
            [
              'get',
              'class',
            ],
            'primary',
            0.75,
            [
              'secondary',
              'tertiary',
            ],
            0.1,
            0.1,
          ],
          18,
          [
            'match',
            [
              'get',
              'class',
            ],
            'primary',
            32,
            [
              'secondary',
              'tertiary',
            ],
            26,
            26,
          ],
        ],
        'line-color': 'hsl(0, 0%, 100%)',
      },
      'source-layer': 'road',
    },
    {
      minzoom: 15,
      layout: {
        'symbol-placement': 'line',
        'icon-image': [
          'step',
          [
            'zoom',
          ],
          'oneway-small',
          17,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'primary',
              'secondary',
              'tertiary',
              'street',
              'street_limited',
            ],
            'oneway-large',
            'oneway-small',
          ],
          18,
          'oneway-large',
        ],
        'symbol-spacing': 200,
        'icon-rotation-alignment': 'map',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          '==',
          [
            'get',
            'oneway',
          ],
          'true',
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'primary',
              'secondary',
              'street',
              'street_limited',
              'tertiary',
            ],
            true,
            false,
          ],
          16,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'primary',
              'secondary',
              'tertiary',
              'street',
              'street_limited',
              'primary_link',
              'secondary_link',
              'tertiary_link',
              'path',
              'pedestrian',
              'service',
              'track',
            ],
            true,
            false,
          ],
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'tunnel-oneway-arrow-blue',
      paint: {},
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'trunk',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'tunnel-motorway-trunk',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          0.75,
          18,
          32,
        ],
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'motorway',
          'hsl(26, 74%, 81%)',
          'trunk',
          'hsl(46, 77%, 78%)',
          'hsl(46, 77%, 78%)',
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 16,
      layout: {
        'symbol-placement': 'line',
        'icon-image': [
          'step',
          [
            'zoom',
          ],
          'oneway-white-small',
          17,
          'oneway-white-large',
        ],
        'symbol-spacing': 200,
      },
      metadata: {
        'mapbox:group': '1444855769305.6016',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'tunnel',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'motorway_link',
            'trunk',
            'trunk_link',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'get',
            'oneway',
          ],
          'true',
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'tunnel-oneway-arrow-white',
      paint: {},
      'source-layer': 'road',
    },
    {
      minzoom: 15,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      filter: [
        '==',
        [
          'get',
          'class',
        ],
        'cliff',
      ],
      type: 'line',
      source: 'composite',
      id: 'cliff',
      paint: {
        'line-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          15,
          0,
          15.25,
          1,
        ],
        'line-width': 10,
        'line-pattern': 'cliff',
      },
      'source-layer': 'structure',
    },
    {
      minzoom: 8,
      layout: {
        'line-join': 'round',
      },
      filter: [
        '==',
        [
          'get',
          'type',
        ],
        'ferry',
      ],
      type: 'line',
      source: 'composite',
      id: 'ferry',
      paint: {
        'line-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          15,
          'hsl(205, 73%, 63%)',
          17,
          'hsl(230, 73%, 63%)',
        ],
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          0.5,
          20,
          1,
        ],
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              1,
              0,
            ],
          ],
          13,
          [
            'literal',
            [
              12,
              4,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      id: 'ferry-auto',
      type: 'line',
      source: 'composite',
      'source-layer': 'road',
      filter: [
        '==',
        [
          'get',
          'type',
        ],
        'ferry_auto',
      ],
      layout: {
        'line-join': 'round',
      },
      paint: {
        'line-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          15,
          'hsl(205, 73%, 63%)',
          17,
          'hsl(230, 73%, 63%)',
        ],
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          0.5,
          20,
          1,
        ],
      },
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'class',
          ],
          'path',
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            '!',
            [
              'match',
              [
                'get',
                'type',
              ],
              [
                'steps',
                'sidewalk',
                'crossing',
              ],
              true,
              false,
            ],
          ],
          16,
          [
            '!=',
            [
              'get',
              'type',
            ],
            'steps',
          ],
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-path-bg',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          2.5,
          18,
          7,
        ],
        'line-color': [
          'match',
          [
            'get',
            'type',
          ],
          'piste',
          'hsl(230, 85%, 67%)',
          [
            'corridor',
            'crossing',
            'sidewalk',
          ],
          'hsl(230, 17%, 82%)',
          'hsl(50, 100%, 40%)',
        ],
        'line-opacity': 1,
      },
      'source-layer': 'road',
    },
    {
      minzoom: 14,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'type',
          ],
          'steps',
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-steps-bg',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          2.5,
          18,
          7,
        ],
        'line-color': 'hsl(50, 100%, 40%)',
        'line-opacity': 0.75,
      },
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'class',
          ],
          'pedestrian',
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-pedestrian-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          2,
          18,
          14.5,
        ],
        'line-color': 'hsl(230, 24%, 87%)',
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          0,
          14,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'street',
            'street_limited',
            'primary_link',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-street-low',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          2,
          18,
          18,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          1,
          14,
          0,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          'step',
          [
            'zoom',
          ],
          [
            '==',
            [
              'get',
              'class',
            ],
            'track',
          ],
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'track',
              'secondary_link',
              'tertiary_link',
              'service',
            ],
            true,
            false,
          ],
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-minor-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.75,
          20,
          2,
        ],
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'track',
          'hsl(50, 100%, 40%)',
          'hsl(230, 24%, 87%)',
        ],
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            'track',
            1,
            0.5,
          ],
          18,
          12,
        ],
        'line-opacity': 1,
      },
      'source-layer': 'road',
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'street',
            'street_limited',
            'primary_link',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-street-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.75,
          20,
          2,
        ],
        'line-color': 'hsl(230, 24%, 87%)',
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          2,
          18,
          18,
        ],
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          0,
          14,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      id: 'road-secondary-tertiary-case',
      type: 'line',
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'secondary',
            'tertiary',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          10,
          0.75,
          18,
          2,
        ],
        'line-color': 'hsl(230, 24%, 87%)',
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          0.1,
          18,
          26,
        ],
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          0,
          10,
          1,
        ],
      },
    },
    {
      id: 'road-primary-case',
      type: 'line',
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'class',
          ],
          'primary',
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          10,
          1,
          18,
          2,
        ],
        'line-color': 'hsl(230, 24%, 87%)',
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          0.75,
          18,
          32,
        ],
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          0,
          10,
          1,
        ],
      },
    },
    {
      minzoom: 10,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway_link',
            'trunk_link',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-major-link-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.75,
          20,
          2,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          2,
          18,
          18,
        ],
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          0,
          11,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      id: 'road-motorway-trunk-case',
      type: 'line',
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'trunk',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          10,
          1,
          18,
          2,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          0.75,
          18,
          32,
        ],
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            'motorway',
            1,
            0,
          ],
          6,
          1,
        ],
      },
    },
    {
      minzoom: 14,
      layout: {},
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'class',
          ],
          'construction',
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-construction',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          2,
          18,
          18,
        ],
        'line-color': 'hsl(230, 24%, 87%)',
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              0.4,
              0.8,
            ],
          ],
          15,
          [
            'literal',
            [
              0.3,
              0.6,
            ],
          ],
          16,
          [
            'literal',
            [
              0.2,
              0.3,
            ],
          ],
          17,
          [
            'literal',
            [
              0.2,
              0.25,
            ],
          ],
          18,
          [
            'literal',
            [
              0.15,
              0.15,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'class',
          ],
          'path',
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'type',
            ],
            [
              'bridleway',
              'footway',
              'path',
            ],
            true,
            false,
          ],
          16,
          [
            'match',
            [
              'get',
              'type',
            ],
            [
              'bridleway',
              'footway',
              'path',
              'corridor',
              'sidewalk',
              'crossing',
            ],
            true,
            false,
          ],
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-path-smooth',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          1,
          18,
          4,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              4,
              0.4,
            ],
          ],
          15,
          [
            'literal',
            [
              3,
              0.4,
            ],
          ],
          16,
          [
            'literal',
            [
              3,
              0.35,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'class',
          ],
          'path',
        ],
        [
          'match',
          [
            'get',
            'type',
          ],
          [
            'hiking',
            'mountain_bike',
            'trail',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-path-rough',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          1,
          18,
          4,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              4,
              0.4,
            ],
          ],
          15,
          [
            'literal',
            [
              1.75,
              0.4,
            ],
          ],
          16,
          [
            'literal',
            [
              1,
              0.4,
            ],
          ],
          17,
          [
            'literal',
            [
              1,
              0.35,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'class',
          ],
          'path',
        ],
        [
          'match',
          [
            'get',
            'type',
          ],
          [
            'cycleway',
            'piste',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-path-cycleway-piste',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          1,
          18,
          4,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
      },
      'source-layer': 'road',
    },
    {
      minzoom: 14,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'type',
          ],
          'steps',
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-steps',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          1,
          16,
          1.6,
          18,
          6,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              1,
              0,
            ],
          ],
          15,
          [
            'literal',
            [
              1.75,
              1,
            ],
          ],
          16,
          [
            'literal',
            [
              1,
              0.75,
            ],
          ],
          17,
          [
            'literal',
            [
              0.3,
              0.3,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 10,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway_link',
            'trunk_link',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-major-link',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          2,
          18,
          18,
        ],
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'motorway_link',
          'hsl(26, 67%, 70%)',
          'trunk_link',
          'hsl(46, 69%, 68%)',
          'hsl(46, 69%, 68%)',
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'class',
          ],
          'pedestrian',
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-pedestrian',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          0.5,
          18,
          12,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              1,
              0,
            ],
          ],
          15,
          [
            'literal',
            [
              1.5,
              0.4,
            ],
          ],
          16,
          [
            'literal',
            [
              1,
              0.2,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {},
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'geometry-type',
          ],
          'Polygon',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'path',
            'pedestrian',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
      ],
      type: 'fill',
      source: 'composite',
      id: 'road-pedestrian-polygon-fill',
      paint: {
        'fill-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          16,
          'hsl(230, 16%, 94%)',
          16.25,
          'hsl(230, 50%, 98%)',
        ],
        'fill-outline-color': 'hsl(230, 26%, 88%)',
      },
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {},
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'geometry-type',
          ],
          'Polygon',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'path',
            'pedestrian',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
      ],
      type: 'fill',
      source: 'composite',
      id: 'road-pedestrian-polygon-pattern',
      paint: {
        'fill-color': 'hsl(0, 0%, 100%)',
        'fill-outline-color': 'hsl(35, 10%, 83%)',
        'fill-pattern': 'pedestrian-polygon',
        'fill-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          16,
          0,
          16.25,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {},
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'geometry-type',
          ],
          'Polygon',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'primary',
            'secondary',
            'tertiary',
            'primary_link',
            'secondary_link',
            'tertiary_link',
            'street',
            'street_limited',
            'track',
            'service',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
      ],
      type: 'fill',
      source: 'composite',
      id: 'road-polygon',
      paint: {
        'fill-color': 'hsl(0, 0%, 100%)',
        'fill-outline-color': '#d6d9e6',
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          'step',
          [
            'zoom',
          ],
          [
            '==',
            [
              'get',
              'class',
            ],
            'track',
          ],
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'track',
              'secondary_link',
              'tertiary_link',
              'service',
            ],
            true,
            false,
          ],
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-minor',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            'track',
            1,
            0.5,
          ],
          18,
          12,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-opacity': 1,
      },
      'source-layer': 'road',
    },
    {
      minzoom: 11,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'street',
            'street_limited',
            'primary_link',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-street',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          2,
          18,
          18,
        ],
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'street_limited',
          'hsl(35, 14%, 93%)',
          'hsl(0, 0%, 100%)',
        ],
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          0,
          14,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      id: 'road-secondary-tertiary',
      type: 'line',
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'secondary',
            'tertiary',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          0.1,
          18,
          26,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
      },
    },
    {
      id: 'road-primary',
      type: 'line',
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'class',
          ],
          'primary',
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          0.75,
          18,
          32,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
      },
    },
    {
      minzoom: 15,
      layout: {
        'symbol-placement': 'line',
        'icon-image': [
          'step',
          [
            'zoom',
          ],
          'oneway-small',
          17,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'primary',
              'secondary',
              'tertiary',
              'street',
              'street_limited',
            ],
            'oneway-large',
            'oneway-small',
          ],
          18,
          'oneway-large',
        ],
        'symbol-spacing': 200,
        'icon-rotation-alignment': 'map',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'oneway',
          ],
          'true',
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'primary',
              'secondary',
              'tertiary',
              'street',
              'street_limited',
            ],
            true,
            false,
          ],
          16,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'primary',
              'secondary',
              'tertiary',
              'street',
              'street_limited',
              'primary_link',
              'secondary_link',
              'tertiary_link',
              'path',
              'pedestrian',
              'service',
              'track',
            ],
            true,
            false,
          ],
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'road-oneway-arrow-blue',
      paint: {},
      'source-layer': 'road',
    },
    {
      id: 'road-motorway-trunk',
      type: 'line',
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      source: 'composite',
      'source-layer': 'road',
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'trunk',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          0.75,
          18,
          32,
        ],
        'line-color': [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            'motorway',
            'hsl(26, 87%, 62%)',
            'trunk',
            'hsl(0, 0%, 100%)',
            'hsl(0, 0%, 100%)',
          ],
          6,
          [
            'match',
            [
              'get',
              'class',
            ],
            'motorway',
            'hsl(26, 87%, 62%)',
            'trunk',
            'hsl(46, 80%, 60%)',
            'hsl(46, 80%, 60%)',
          ],
          9,
          [
            'match',
            [
              'get',
              'class',
            ],
            'motorway',
            'hsl(26, 67%, 70%)',
            'trunk',
            'hsl(46, 69%, 68%)',
            'hsl(46, 69%, 68%)',
          ],
        ],
      },
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'major_rail',
            'minor_rail',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-rail',
      paint: {
        'line-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          13,
          'hsl(50, 17%, 82%)',
          16,
          'hsl(230, 10%, 74%)',
        ],
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          0.5,
          20,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'major_rail',
            'minor_rail',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'road-rail-tracks',
      paint: {
        'line-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          13,
          'hsl(50, 17%, 82%)',
          16,
          'hsl(230, 10%, 74%)',
        ],
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          4,
          20,
          8,
        ],
        'line-dasharray': [
          0.1,
          15,
        ],
        'line-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          13.75,
          0,
          14,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 16,
      layout: {
        'icon-image': 'level-crossing',
        'icon-allow-overlap': true,
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        '==',
        [
          'get',
          'class',
        ],
        'level_crossing',
      ],
      type: 'symbol',
      source: 'composite',
      id: 'level-crossing',
      paint: {},
      'source-layer': 'road',
    },
    {
      minzoom: 16,
      layout: {
        'symbol-placement': 'line',
        'icon-image': [
          'step',
          [
            'zoom',
          ],
          'oneway-white-small',
          17,
          'oneway-white-large',
        ],
        'symbol-spacing': 200,
      },
      metadata: {
        'mapbox:group': '1444855786460.0557',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'oneway',
          ],
          'true',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'trunk',
            'motorway_link',
            'trunk_link',
          ],
          true,
          false,
        ],
        [
          'match',
          [
            'get',
            'structure',
          ],
          [
            'none',
            'ford',
          ],
          true,
          false,
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'road-oneway-arrow-white',
      paint: {},
      'source-layer': 'road',
    },
    {
      minzoom: 16,
      layout: {},
      filter: [
        '==',
        [
          'get',
          'class',
        ],
        'golf',
      ],
      type: 'line',
      source: 'composite',
      id: 'golf-hole-line',
      paint: {
        'line-color': 'hsl(100, 47%, 58%)',
      },
      'source-layer': 'road',
    },
    {
      minzoom: 16,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      filter: [
        'match',
        [
          'get',
          'class',
        ],
        [
          'gate',
          'fence',
          'hedge',
        ],
        true,
        false,
      ],
      type: 'line',
      source: 'composite',
      id: 'gate-fence-hedge',
      paint: {
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'hedge',
          'hsl(100, 59%, 70%)',
          'hsl(46, 17%, 76%)',
        ],
        'line-width': {
          base: 1,
          stops: [
            [
              16,
              1,
            ],
            [
              20,
              3,
            ],
          ],
        },
        'line-opacity': [
          'match',
          [
            'get',
            'class',
          ],
          'gate',
          0.5,
          1,
        ],
        'line-dasharray': [
          1,
          2,
          5,
          2,
          1,
          2,
        ],
      },
      'source-layer': 'structure',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'path',
        ],
        [
          '!=',
          [
            'get',
            'type',
          ],
          'steps',
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-path-bg',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          2.5,
          18,
          7,
        ],
        'line-color': [
          'match',
          [
            'get',
            'type',
          ],
          'piste',
          'hsl(230, 85%, 67%)',
          [
            'corridor',
            'crossing',
            'sidewalk',
          ],
          'hsl(230, 17%, 82%)',
          'hsl(50, 100%, 40%)',
        ],
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          0,
          14,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 14,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'type',
          ],
          'steps',
        ],
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-steps-bg',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          2.5,
          18,
          7,
        ],
        'line-color': 'hsl(50, 100%, 40%)',
        'line-opacity': 0.75,
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'pedestrian',
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-pedestrian-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          2,
          18,
          14.5,
        ],
        'line-color': 'hsl(230, 24%, 87%)',
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          0,
          14,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'track',
              'primary_link',
            ],
            true,
            false,
          ],
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'track',
              'primary_link',
              'secondary_link',
              'tertiary_link',
              'service',
            ],
            true,
            false,
          ],
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-street-minor-low',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'primary_link',
            ],
            2,
            'track',
            1,
            0.5,
          ],
          18,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'primary_link',
            ],
            18,
            12,
          ],
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          1,
          14,
          0,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'track',
              'primary_link',
            ],
            true,
            false,
          ],
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'track',
              'primary_link',
              'secondary_link',
              'tertiary_link',
              'service',
            ],
            true,
            false,
          ],
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-street-minor-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.75,
          20,
          2,
        ],
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'track',
          'hsl(50, 100%, 40%)',
          'hsl(230, 24%, 87%)',
        ],
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'primary_link',
            ],
            2,
            'track',
            1,
            0.5,
          ],
          18,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'primary_link',
            ],
            18,
            12,
          ],
        ],
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            'track',
            1,
            0,
          ],
          14,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'primary',
            'secondary',
            'tertiary',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-primary-secondary-tertiary-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          10,
          [
            'match',
            [
              'get',
              'class',
            ],
            'primary',
            1,
            [
              'secondary',
              'tertiary',
            ],
            0.75,
            0.75,
          ],
          18,
          2,
        ],
        'line-color': 'hsl(230, 24%, 87%)',
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          [
            'match',
            [
              'get',
              'class',
            ],
            'primary',
            0.75,
            [
              'secondary',
              'tertiary',
            ],
            0.1,
            0.1,
          ],
          18,
          [
            'match',
            [
              'get',
              'class',
            ],
            'primary',
            32,
            [
              'secondary',
              'tertiary',
            ],
            26,
            26,
          ],
        ],
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          0,
          10,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway_link',
            'trunk_link',
          ],
          true,
          false,
        ],
        [
          '<=',
          [
            'get',
            'layer',
          ],
          1,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-major-link-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.75,
          20,
          2,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          2,
          18,
          18,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'trunk',
          ],
          true,
          false,
        ],
        [
          '<=',
          [
            'get',
            'layer',
          ],
          1,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-motorway-trunk-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          10,
          1,
          18,
          2,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          0.75,
          18,
          32,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 14,
      layout: {},
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'construction',
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-construction',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          2,
          18,
          18,
        ],
        'line-color': 'hsl(230, 24%, 87%)',
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              0.4,
              0.8,
            ],
          ],
          15,
          [
            'literal',
            [
              0.3,
              0.6,
            ],
          ],
          16,
          [
            'literal',
            [
              0.2,
              0.3,
            ],
          ],
          17,
          [
            'literal',
            [
              0.2,
              0.25,
            ],
          ],
          18,
          [
            'literal',
            [
              0.15,
              0.15,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'path',
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'type',
            ],
            [
              'bridleway',
              'footway',
              'path',
              'hiking',
              'mountain_bike',
              'trail',
            ],
            true,
            false,
          ],
          16,
          [
            'match',
            [
              'get',
              'type',
            ],
            [
              'bridleway',
              'footway',
              'path',
              'hiking',
              'mountain_bike',
              'trail',
              'corridor',
              'sidewalk',
              'crossing',
            ],
            true,
            false,
          ],
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-path-smooth-rough',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          1,
          18,
          4,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              4,
              0.4,
            ],
          ],
          15,
          [
            'literal',
            [
              3,
              0.4,
            ],
          ],
          16,
          [
            'literal',
            [
              3,
              0.35,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'path',
        ],
        [
          'match',
          [
            'get',
            'type',
          ],
          [
            'cycleway',
            'piste',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-path-cycleway-piste',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          1,
          18,
          4,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
      },
      'source-layer': 'road',
    },
    {
      minzoom: 14,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'type',
          ],
          'steps',
        ],
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-steps',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          15,
          1,
          16,
          1.6,
          18,
          6,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              1,
              0,
            ],
          ],
          15,
          [
            'literal',
            [
              1.75,
              1,
            ],
          ],
          16,
          [
            'literal',
            [
              1,
              0.75,
            ],
          ],
          17,
          [
            'literal',
            [
              0.3,
              0.3,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway_link',
            'trunk_link',
          ],
          true,
          false,
        ],
        [
          '<=',
          [
            'get',
            'layer',
          ],
          1,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-major-link',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          2,
          18,
          18,
        ],
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'motorway_link',
          'hsl(26, 67%, 70%)',
          'trunk_link',
          'hsl(46, 69%, 68%)',
          'hsl(46, 69%, 68%)',
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'pedestrian',
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-pedestrian',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          0.5,
          18,
          12,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              1,
              0,
            ],
          ],
          15,
          [
            'literal',
            [
              1.5,
              0.4,
            ],
          ],
          16,
          [
            'literal',
            [
              1,
              0.2,
            ],
          ],
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'track',
              'primary_link',
            ],
            true,
            false,
          ],
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'track',
              'primary_link',
              'secondary_link',
              'tertiary_link',
              'service',
            ],
            true,
            false,
          ],
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-street-minor',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'primary_link',
            ],
            2,
            'track',
            1,
            0.5,
          ],
          18,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'street',
              'street_limited',
              'primary_link',
            ],
            18,
            12,
          ],
        ],
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'street_limited',
          'hsl(35, 14%, 93%)',
          'hsl(0, 0%, 100%)',
        ],
        'line-opacity': [
          'step',
          [
            'zoom',
          ],
          0,
          14,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'primary',
            'secondary',
            'tertiary',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-primary-secondary-tertiary',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          [
            'match',
            [
              'get',
              'class',
            ],
            'primary',
            0.75,
            [
              'secondary',
              'tertiary',
            ],
            0.1,
            0.1,
          ],
          18,
          [
            'match',
            [
              'get',
              'class',
            ],
            'primary',
            32,
            [
              'secondary',
              'tertiary',
            ],
            26,
            26,
          ],
        ],
        'line-color': 'hsl(0, 0%, 100%)',
      },
      'source-layer': 'road',
    },
    {
      minzoom: 15,
      layout: {
        'symbol-placement': 'line',
        'icon-image': [
          'step',
          [
            'zoom',
          ],
          'oneway-small',
          17,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'primary',
              'secondary',
              'tertiary',
              'street',
              'street_limited',
            ],
            'oneway-large',
            'oneway-small',
          ],
          18,
          'oneway-large',
        ],
        'symbol-spacing': 200,
        'icon-rotation-alignment': 'map',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          '==',
          [
            'get',
            'oneway',
          ],
          'true',
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'primary',
              'secondary',
              'tertiary',
              'street',
              'street_limited',
            ],
            true,
            false,
          ],
          16,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'primary',
              'secondary',
              'tertiary',
              'street',
              'street_limited',
              'primary_link',
              'secondary_link',
              'tertiary_link',
              'path',
              'pedestrian',
              'track',
              'service',
            ],
            true,
            false,
          ],
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'bridge-oneway-arrow-blue',
      paint: {},
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'trunk',
          ],
          true,
          false,
        ],
        [
          '<=',
          [
            'get',
            'layer',
          ],
          1,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-motorway-trunk',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          0.75,
          18,
          32,
        ],
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'motorway',
          'hsl(26, 67%, 70%)',
          'trunk',
          'hsl(46, 69%, 68%)',
          'hsl(46, 69%, 68%)',
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'major_rail',
            'minor_rail',
          ],
          true,
          false,
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-rail',
      paint: {
        'line-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          13,
          'hsl(50, 17%, 82%)',
          16,
          'hsl(230, 10%, 74%)',
        ],
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          0.5,
          20,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'major_rail',
            'minor_rail',
          ],
          true,
          false,
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-rail-tracks',
      paint: {
        'line-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          13,
          'hsl(50, 17%, 82%)',
          16,
          'hsl(230, 10%, 74%)',
        ],
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          4,
          20,
          8,
        ],
        'line-dasharray': [
          0.1,
          15,
        ],
        'line-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          13.75,
          0,
          14,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          '>=',
          [
            'get',
            'layer',
          ],
          2,
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway_link',
            'trunk_link',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-major-link-2-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.75,
          20,
          2,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          2,
          18,
          18,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          '>=',
          [
            'get',
            'layer',
          ],
          2,
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'trunk',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-motorway-trunk-2-case',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          10,
          1,
          18,
          2,
        ],
        'line-color': 'hsl(0, 0%, 100%)',
        'line-gap-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          0.75,
          18,
          32,
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          '>=',
          [
            'get',
            'layer',
          ],
          2,
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway_link',
            'trunk_link',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-major-link-2',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          12,
          0.5,
          14,
          2,
          18,
          18,
        ],
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'motorway_link',
          'hsl(26, 67%, 70%)',
          'trunk_link',
          'hsl(46, 69%, 68%)',
          'hsl(46, 69%, 68%)',
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          '>=',
          [
            'get',
            'layer',
          ],
          2,
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'trunk',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'bridge-motorway-trunk-2',
      paint: {
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          5,
          0.75,
          18,
          32,
        ],
        'line-color': [
          'match',
          [
            'get',
            'class',
          ],
          'motorway',
          'hsl(26, 67%, 70%)',
          'trunk',
          'hsl(46, 69%, 68%)',
          'hsl(46, 69%, 68%)',
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 16,
      layout: {
        'symbol-placement': 'line',
        'icon-image': [
          'step',
          [
            'zoom',
          ],
          'oneway-white-small',
          17,
          'oneway-white-large',
        ],
        'symbol-spacing': 200,
      },
      metadata: {
        'mapbox:group': '1444855799204.86',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'structure',
          ],
          'bridge',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'trunk',
            'motorway_link',
            'trunk_link',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'get',
            'oneway',
          ],
          'true',
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'bridge-oneway-arrow-white',
      paint: {},
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round',
      },
      filter: [
        '==',
        [
          'get',
          'class',
        ],
        'aerialway',
      ],
      type: 'line',
      source: 'composite',
      id: 'aerialway-bg',
      paint: {
        'line-color': 'hsl(0, 0%, 100%)',
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          2.5,
          20,
          3,
        ],
        'line-blur': 0.5,
      },
      'source-layer': 'road',
    },
    {
      minzoom: 12,
      layout: {
        'line-join': 'round',
      },
      filter: [
        '==',
        [
          'get',
          'class',
        ],
        'aerialway',
      ],
      type: 'line',
      source: 'composite',
      id: 'aerialway',
      paint: {
        'line-color': 'hsl(230, 4%, 29%)',
        'line-width': [
          'interpolate',
          [
            'exponential',
            1.5,
          ],
          [
            'zoom',
          ],
          14,
          0.5,
          20,
          1,
        ],
      },
      'source-layer': 'road',
    },
    {
      id: 'admin-1-boundary-bg',
      type: 'line',
      metadata: {
        'mapbox:group': '1444934295202.7542',
      },
      source: 'composite',
      'source-layer': 'admin',
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'admin_level',
          ],
          1,
        ],
        [
          '==',
          [
            'get',
            'maritime',
          ],
          'false',
        ],
        [
          'match',
          [
            'get',
            'worldview',
          ],
          [
            'all',
            'US',
          ],
          true,
          false,
        ],
      ],
      layout: {
        'line-join': 'bevel',
      },
      paint: {
        'line-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          8,
          'hsl(35, 12%, 89%)',
          16,
          'hsl(230, 49%, 90%)',
        ],
        'line-width': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          7,
          3.75,
          12,
          5.5,
        ],
        'line-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          7,
          0,
          8,
          0.75,
        ],
        'line-dasharray': [
          1,
          0,
        ],
        'line-translate': [
          0,
          0,
        ],
        'line-blur': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          3,
          0,
          8,
          3,
        ],
      },
    },
    {
      minzoom: 1,
      layout: {},
      metadata: {
        'mapbox:group': '1444934295202.7542',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'admin_level',
          ],
          0,
        ],
        [
          '==',
          [
            'get',
            'maritime',
          ],
          'false',
        ],
        [
          'match',
          [
            'get',
            'worldview',
          ],
          [
            'all',
            'US',
          ],
          true,
          false,
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'admin-0-boundary-bg',
      paint: {
        'line-width': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          3,
          3.5,
          10,
          8,
        ],
        'line-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          6,
          'hsl(35, 12%, 89%)',
          8,
          'hsl(230, 49%, 90%)',
        ],
        'line-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          3,
          0,
          4,
          0.5,
        ],
        'line-translate': [
          0,
          0,
        ],
        'line-blur': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          3,
          0,
          10,
          2,
        ],
      },
      'source-layer': 'admin',
    },
    {
      id: 'admin-1-boundary',
      type: 'line',
      metadata: {
        'mapbox:group': '1444934295202.7542',
      },
      source: 'composite',
      'source-layer': 'admin',
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'admin_level',
          ],
          1,
        ],
        [
          '==',
          [
            'get',
            'maritime',
          ],
          'false',
        ],
        [
          'match',
          [
            'get',
            'worldview',
          ],
          [
            'all',
            'US',
          ],
          true,
          false,
        ],
      ],
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-dasharray': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              2,
              0,
            ],
          ],
          7,
          [
            'literal',
            [
              2,
              2,
              6,
              2,
            ],
          ],
        ],
        'line-width': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          7,
          0.75,
          12,
          1.5,
        ],
        'line-opacity': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          2,
          0,
          3,
          1,
        ],
        'line-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          3,
          'hsl(230, 14%, 77%)',
          7,
          'hsl(230, 8%, 62%)',
        ],
      },
    },
    {
      minzoom: 1,
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      metadata: {
        'mapbox:group': '1444934295202.7542',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'admin_level',
          ],
          0,
        ],
        [
          '==',
          [
            'get',
            'disputed',
          ],
          'false',
        ],
        [
          '==',
          [
            'get',
            'maritime',
          ],
          'false',
        ],
        [
          'match',
          [
            'get',
            'worldview',
          ],
          [
            'all',
            'US',
          ],
          true,
          false,
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'admin-0-boundary',
      paint: {
        'line-color': 'hsl(230, 8%, 51%)',
        'line-width': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          3,
          0.5,
          10,
          2,
        ],
      },
      'source-layer': 'admin',
    },
    {
      minzoom: 1,
      layout: {
        'line-join': 'round',
      },
      metadata: {
        'mapbox:group': '1444934295202.7542',
      },
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'disputed',
          ],
          'true',
        ],
        [
          '==',
          [
            'get',
            'admin_level',
          ],
          0,
        ],
        [
          '==',
          [
            'get',
            'maritime',
          ],
          'false',
        ],
        [
          'match',
          [
            'get',
            'worldview',
          ],
          [
            'all',
            'US',
          ],
          true,
          false,
        ],
      ],
      type: 'line',
      source: 'composite',
      id: 'admin-0-boundary-disputed',
      paint: {
        'line-dasharray': [
          1.5,
          1.5,
        ],
        'line-color': 'hsl(230, 8%, 51%)',
        'line-width': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          3,
          0.5,
          10,
          2,
        ],
      },
      'source-layer': 'admin',
    },
    {
      id: 'data-stack-placeholder',
      type: 'background',
      layout: {},
      paint: {
        'background-color': 'hsla(0, 0%, 0%, 0)',
      },
    },
    {
      minzoom: 11,
      layout: {
        'text-field': '{ele} m',
        'symbol-placement': 'line',
        'text-pitch-alignment': 'viewport',
        'text-max-angle': 25,
        'text-padding': 5,
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular',
        ],
        'text-size': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          15,
          9.5,
          20,
          12,
        ],
      },
      filter: [
        'any',
        [
          '==',
          [
            'get',
            'index',
          ],
          10,
        ],
        [
          '==',
          [
            'get',
            'index',
          ],
          5,
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'contour-label',
      paint: {
        'text-color': 'hsl(100, 60%, 28%)',
        'text-halo-width': 1,
        'text-halo-color': 'hsla(0, 0%, 100%, 0.5)',
      },
      'source-layer': 'contour',
    },
    {
      id: 'building-number-label',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'housenum_label',
      minzoom: 17,
      layout: {
        'text-field': [
          'get',
          'house_num',
        ],
        'text-font': [
          'DIN Offc Pro Italic',
          'Arial Unicode MS Regular',
        ],
        'text-padding': 4,
        'text-max-width': 7,
        'text-size': 9.5,
      },
      paint: {
        'text-color': 'hsl(35, 2%, 69%)',
        'text-halo-color': 'hsl(35, 8%, 85%)',
        'text-halo-width': 0.5,
      },
    },
    {
      minzoom: 10,
      layout: {
        'text-size': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          10,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'motorway',
              'trunk',
              'primary',
              'secondary',
              'tertiary',
            ],
            10,
            [
              'motorway_link',
              'trunk_link',
              'primary_link',
              'secondary_link',
              'tertiary_link',
              'pedestrian',
              'street',
              'street_limited',
              'track',
              'path',
              'aerialway',
            ],
            9,
            6.5,
          ],
          18,
          [
            'match',
            [
              'get',
              'class',
            ],
            [
              'motorway',
              'trunk',
              'primary',
              'secondary',
              'tertiary',
            ],
            16,
            [
              'motorway_link',
              'trunk_link',
              'primary_link',
              'secondary_link',
              'tertiary_link',
              'pedestrian',
              'street',
              'street_limited',
              'path',
            ],
            14,
            13,
          ],
        ],
        'text-max-angle': 30,
        'text-font': [
          'DIN Offc Pro Regular',
          'Arial Unicode MS Regular',
        ],
        'symbol-placement': 'line',
        'text-padding': 1,
        'text-rotation-alignment': 'map',
        'text-pitch-alignment': 'viewport',
        'text-field': [
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
        'text-letter-spacing': 0.01,
      },
      filter: [
        'step',
        [
          'zoom',
        ],
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'trunk',
            'primary',
            'secondary',
            'tertiary',
          ],
          true,
          false,
        ],
        12,
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'trunk',
            'primary',
            'secondary',
            'tertiary',
            'pedestrian',
            'street',
            'street_limited',
            'track',
            'path',
            'aerialway',
          ],
          true,
          false,
        ],
        15,
        [
          'match',
          [
            'get',
            'class',
          ],
          'golf',
          false,
          true,
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'road-label',
      paint: {
        'text-color': [
          'match',
          [
            'get',
            'class',
          ],
          'ferry',
          'hsl(230, 48%, 44%)',
          'hsl(0, 0%, 0%)',
        ],
        'text-halo-color': [
          'match',
          [
            'get',
            'class',
          ],
          [
            'motorway',
            'trunk',
          ],
          'hsla(0, 0%, 100%, 0.75)',
          'ferry',
          'hsl(196, 80%, 70%)',
          'hsl(0, 0%, 100%)',
        ],
        'text-halo-width': 1,
        'text-halo-blur': 1,
      },
      'source-layer': 'road',
    },
    {
      minzoom: 6,
      layout: {
        'text-size': 9,
        'icon-image': [
          'concat',
          [
            'get',
            'shield',
          ],
          '-',
          [
            'to-string',
            [
              'get',
              'reflen',
            ],
          ],
        ],
        'icon-rotation-alignment': 'viewport',
        'text-max-angle': 38,
        'symbol-spacing': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          11,
          150,
          14,
          200,
        ],
        'text-font': [
          'DIN Offc Pro Bold',
          'Arial Unicode MS Bold',
        ],
        'symbol-placement': [
          'step',
          [
            'zoom',
          ],
          'point',
          11,
          'line',
        ],
        'text-rotation-alignment': 'viewport',
        'text-field': [
          'get',
          'ref',
        ],
        'text-letter-spacing': 0.05,
      },
      filter: [
        'all',
        [
          'has',
          'reflen',
        ],
        [
          '<=',
          [
            'get',
            'reflen',
          ],
          6,
        ],
        [
          'step',
          [
            'zoom',
          ],
          [
            '==',
            [
              'geometry-type',
            ],
            'Point',
          ],
          11,
          [
            '>',
            [
              'get',
              'len',
            ],
            5000,
          ],
          12,
          [
            '>',
            [
              'get',
              'len',
            ],
            2500,
          ],
          13,
          [
            '>',
            [
              'get',
              'len',
            ],
            1000,
          ],
          14,
          true,
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'road-number-shield',
      paint: {
        'text-color': [
          'match',
          [
            'get',
            'shield_text_color',
          ],
          'white',
          'hsl(0, 0%, 100%)',
          'black',
          'hsl(230, 21%, 37%)',
          'yellow',
          'hsl(50, 81%, 74%)',
          'orange',
          'hsl(25, 73%, 63%)',
          'blue',
          'hsl(230, 40%, 58%)',
          'hsl(0, 0%, 100%)',
        ],
      },
      'source-layer': 'road',
    },
    {
      minzoom: 14,
      layout: {
        'text-field': [
          'get',
          'ref',
        ],
        'text-size': 9,
        'icon-image': [
          'concat',
          'motorway-exit-',
          [
            'to-string',
            [
              'get',
              'reflen',
            ],
          ],
        ],
        'text-font': [
          'DIN Offc Pro Bold',
          'Arial Unicode MS Bold',
        ],
      },
      filter: [
        'all',
        [
          'has',
          'reflen',
        ],
        [
          '<=',
          [
            'get',
            'reflen',
          ],
          9,
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'road-exit-shield',
      paint: {
        'text-color': 'hsl(0, 0%, 100%)',
        'text-translate': [
          0,
          0,
        ],
      },
      'source-layer': 'motorway_junction',
    },
    {
      minzoom: 16,
      layout: {
        'text-field': [
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
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular',
        ],
        'text-size': 12,
      },
      filter: [
        '==',
        [
          'get',
          'class',
        ],
        'golf',
      ],
      type: 'symbol',
      source: 'composite',
      id: 'golf-hole-label',
      paint: {
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-halo-width': 0.5,
        'text-halo-blur': 0.5,
        'text-color': 'hsl(100, 100%, 20%)',
      },
      'source-layer': 'road',
    },
    {
      minzoom: 13,
      layout: {
        'text-font': [
          'DIN Offc Pro Italic',
          'Arial Unicode MS Regular',
        ],
        'text-max-angle': 30,
        'symbol-spacing': [
          'interpolate',
          [
            'linear',
            1,
          ],
          [
            'zoom',
          ],
          15,
          250,
          17,
          400,
        ],
        'text-size': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          13,
          12,
          18,
          16,
        ],
        'symbol-placement': 'line',
        'text-pitch-alignment': 'viewport',
        'text-field': [
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
      },
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'canal',
            'river',
            'stream',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'waterway-label',
      paint: {
        'text-color': 'hsl(230, 48%, 44%)',
      },
      'source-layer': 'natural_label',
    },
    {
      minzoom: 4,
      layout: {
        'text-size': [
          'step',
          [
            'zoom',
          ],
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            18,
            5,
            12,
          ],
          17,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            18,
            13,
            12,
          ],
        ],
        'text-max-angle': 30,
        'text-field': [
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
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular',
        ],
        'symbol-placement': 'line-center',
        'text-pitch-alignment': 'viewport',
      },
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'glacier',
            'landform',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
        [
          '<=',
          [
            'get',
            'filterrank',
          ],
          4,
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'natural-line-label',
      paint: {
        'text-halo-width': 0.5,
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-halo-blur': 0.5,
        'text-color': [
          'step',
          [
            'zoom',
          ],
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            'hsl(26, 20%, 42%)',
            5,
            'hsl(26, 25%, 32%)',
          ],
          17,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            'hsl(26, 20%, 42%)',
            13,
            'hsl(26, 25%, 32%)',
          ],
        ],
      },
      'source-layer': 'natural_label',
    },
    {
      minzoom: 4,
      layout: {
        'text-size': [
          'step',
          [
            'zoom',
          ],
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            18,
            5,
            12,
          ],
          17,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            18,
            13,
            12,
          ],
        ],
        'icon-image': [
          'step',
          [
            'zoom',
          ],
          [
            'concat',
            [
              'get',
              'maki',
            ],
            '-11',
          ],
          15,
          [
            'concat',
            [
              'get',
              'maki',
            ],
            '-15',
          ],
        ],
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular',
        ],
        'text-offset': [
          'step',
          [
            'zoom',
          ],
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            [
              'literal',
              [
                0,
                0,
              ],
            ],
            5,
            [
              'literal',
              [
                0,
                0.75,
              ],
            ],
          ],
          17,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            [
              'literal',
              [
                0,
                0,
              ],
            ],
            13,
            [
              'literal',
              [
                0,
                0.75,
              ],
            ],
          ],
        ],
        'text-anchor': [
          'step',
          [
            'zoom',
          ],
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            'center',
            5,
            'top',
          ],
          17,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            'center',
            13,
            'top',
          ],
        ],
        'text-field': [
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
      },
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'dock',
            'glacier',
            'landform',
            'water_feature',
            'wetland',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'Point',
        ],
        [
          '<=',
          [
            'get',
            'filterrank',
          ],
          4,
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'natural-point-label',
      paint: {
        'icon-opacity': [
          'step',
          [
            'zoom',
          ],
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            0,
            5,
            1,
          ],
          17,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            0,
            13,
            1,
          ],
        ],
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-halo-width': 0.5,
        'text-halo-blur': 0.5,
        'text-color': [
          'step',
          [
            'zoom',
          ],
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            'hsl(26, 20%, 42%)',
            5,
            'hsl(26, 25%, 32%)',
          ],
          17,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            'hsl(26, 20%, 42%)',
            13,
            'hsl(26, 25%, 32%)',
          ],
        ],
      },
      'source-layer': 'natural_label',
    },
    {
      id: 'water-line-label',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'natural_label',
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'bay',
            'ocean',
            'reservoir',
            'sea',
            'water',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'LineString',
        ],
      ],
      layout: {
        'text-size': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          7,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            24,
            6,
            18,
            12,
            12,
          ],
          10,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            18,
            9,
            12,
          ],
          18,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            18,
            9,
            16,
          ],
        ],
        'text-max-angle': 30,
        'text-letter-spacing': [
          'match',
          [
            'get',
            'class',
          ],
          'ocean',
          0.25,
          [
            'sea',
            'bay',
          ],
          0.15,
          0,
        ],
        'text-font': [
          'DIN Offc Pro Italic',
          'Arial Unicode MS Regular',
        ],
        'symbol-placement': 'line-center',
        'text-pitch-alignment': 'viewport',
        'text-field': [
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
      },
      paint: {
        'text-color': [
          'match',
          [
            'get',
            'class',
          ],
          [
            'bay',
            'ocean',
            'sea',
          ],
          'hsl(205, 84%, 88%)',
          'hsl(230, 48%, 44%)',
        ],
      },
    },
    {
      id: 'water-point-label',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'natural_label',
      filter: [
        'all',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'bay',
            'ocean',
            'reservoir',
            'sea',
            'water',
          ],
          true,
          false,
        ],
        [
          '==',
          [
            'geometry-type',
          ],
          'Point',
        ],
      ],
      layout: {
        'text-line-height': 1.3,
        'text-size': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          7,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            24,
            6,
            18,
            12,
            12,
          ],
          10,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            18,
            9,
            12,
          ],
        ],
        'text-font': [
          'DIN Offc Pro Italic',
          'Arial Unicode MS Regular',
        ],
        'text-field': [
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
        'text-letter-spacing': [
          'match',
          [
            'get',
            'class',
          ],
          'ocean',
          0.25,
          [
            'bay',
            'sea',
          ],
          0.15,
          0.01,
        ],
        'text-max-width': [
          'match',
          [
            'get',
            'class',
          ],
          'ocean',
          4,
          'sea',
          5,
          [
            'bay',
            'water',
          ],
          7,
          10,
        ],
      },
      paint: {
        'text-color': [
          'match',
          [
            'get',
            'class',
          ],
          [
            'bay',
            'ocean',
            'sea',
          ],
          'hsl(205, 84%, 88%)',
          'hsl(230, 48%, 44%)',
        ],
      },
    },
    {
      minzoom: 6,
      layout: {
        'text-size': [
          'step',
          [
            'zoom',
          ],
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            18,
            5,
            12,
          ],
          17,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            18,
            13,
            12,
          ],
        ],
        'icon-image': [
          'step',
          [
            'zoom',
          ],
          [
            'concat',
            [
              'get',
              'maki',
            ],
            '-11',
          ],
          15,
          [
            'concat',
            [
              'get',
              'maki',
            ],
            '-15',
          ],
        ],
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular',
        ],
        'text-offset': [
          'step',
          [
            'zoom',
          ],
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            [
              'literal',
              [
                0,
                0,
              ],
            ],
            5,
            [
              'literal',
              [
                0,
                0.75,
              ],
            ],
          ],
          17,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            [
              'literal',
              [
                0,
                0,
              ],
            ],
            13,
            [
              'literal',
              [
                0,
                0.75,
              ],
            ],
          ],
        ],
        'text-anchor': [
          'step',
          [
            'zoom',
          ],
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            'center',
            5,
            'top',
          ],
          17,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            'center',
            13,
            'top',
          ],
        ],
        'text-field': [
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
      },
      filter: [
        'let',
        'densityByClass',
        [
          'match',
          [
            'get',
            'class',
          ],
          [
            'food_and_drink_stores',
            'historic',
            'landmark',
            'medical',
            'motorist',
          ],
          3,
          [
            'park_like',
            'sport_and_leisure',
            'visitor_amenities',
          ],
          4,
          2,
        ],
        [
          '<=',
          [
            'get',
            'filterrank',
          ],
          [
            'case',
            [
              '<',
              0,
              [
                'var',
                'densityByClass',
              ],
            ],
            [
              '+',
              [
                'step',
                [
                  'zoom',
                ],
                0,
                16,
                1,
                17,
                2,
              ],
              [
                'var',
                'densityByClass',
              ],
            ],
            [
              'var',
              'densityByClass',
            ],
          ],
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'poi-label',
      paint: {
        'icon-opacity': [
          'step',
          [
            'zoom',
          ],
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            0,
            5,
            1,
          ],
          17,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            0,
            13,
            1,
          ],
        ],
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-halo-width': 0.5,
        'text-halo-blur': 0.5,
        'text-color': [
          'step',
          [
            'zoom',
          ],
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            [
              'match',
              [
                'get',
                'class',
              ],
              'food_and_drink',
              'hsl(22, 55%, 55%)',
              'park_like',
              'hsl(100, 45%, 37%)',
              'education',
              'hsl(51, 40%, 40%)',
              'medical',
              'hsl(340, 30%, 52%)',
              'hsl(26, 20%, 42%)',
            ],
            5,
            [
              'match',
              [
                'get',
                'class',
              ],
              'food_and_drink',
              'hsl(22, 85%, 38%)',
              'park_like',
              'hsl(100, 100%, 20%)',
              'education',
              'hsl(51, 100%, 20%)',
              'medical',
              'hsl(340, 39%, 42%)',
              'hsl(26, 25%, 32%)',
            ],
          ],
          17,
          [
            'step',
            [
              'get',
              'sizerank',
            ],
            [
              'match',
              [
                'get',
                'class',
              ],
              'food_and_drink',
              'hsl(22, 55%, 55%)',
              'park_like',
              'hsl(100, 45%, 37%)',
              'education',
              'hsl(51, 40%, 40%)',
              'medical',
              'hsl(340, 30%, 52%)',
              'hsl(26, 20%, 42%)',
            ],
            13,
            [
              'match',
              [
                'get',
                'class',
              ],
              'food_and_drink',
              'hsl(22, 85%, 38%)',
              'park_like',
              'hsl(100, 100%, 20%)',
              'education',
              'hsl(51, 100%, 20%)',
              'medical',
              'hsl(340, 39%, 42%)',
              'hsl(26, 25%, 32%)',
            ],
          ],
        ],
      },
      'source-layer': 'poi_label',
    },
    {
      minzoom: 12,
      layout: {
        'text-size': 12,
        'icon-image': [
          'get',
          'network',
        ],
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular',
        ],
        'text-justify': [
          'match',
          [
            'get',
            'stop_type',
          ],
          'entrance',
          'left',
          'center',
        ],
        'text-offset': [
          'match',
          [
            'get',
            'stop_type',
          ],
          'entrance',
          [
            'literal',
            [
              1,
              0,
            ],
          ],
          [
            'literal',
            [
              0,
              0.8,
            ],
          ],
        ],
        'text-anchor': [
          'match',
          [
            'get',
            'stop_type',
          ],
          'entrance',
          'left',
          'top',
        ],
        'text-field': [
          'step',
          [
            'zoom',
          ],
          '',
          14,
          [
            'match',
            [
              'get',
              'mode',
            ],
            [
              'rail',
              'metro_rail',
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
            '',
          ],
          16,
          [
            'match',
            [
              'get',
              'mode',
            ],
            [
              'bus',
              'bicycle',
            ],
            '',
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
          18,
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
        'text-letter-spacing': 0.01,
        'text-max-width': [
          'match',
          [
            'get',
            'stop_type',
          ],
          'entrance',
          15,
          9,
        ],
      },
      filter: [
        'step',
        [
          'zoom',
        ],
        [
          'all',
          [
            'match',
            [
              'get',
              'mode',
            ],
            [
              'rail',
              'metro_rail',
            ],
            true,
            false,
          ],
          [
            '!=',
            [
              'get',
              'stop_type',
            ],
            'entrance',
          ],
        ],
        15,
        [
          'all',
          [
            'match',
            [
              'get',
              'mode',
            ],
            [
              'rail',
              'metro_rail',
              'ferry',
              'light_rail',
            ],
            true,
            false,
          ],
          [
            '!=',
            [
              'get',
              'stop_type',
            ],
            'entrance',
          ],
        ],
        16,
        [
          'all',
          [
            '!=',
            [
              'get',
              'mode',
            ],
            'bus',
          ],
          [
            '!=',
            [
              'get',
              'stop_type',
            ],
            'entrance',
          ],
        ],
        17,
        [
          '!=',
          [
            'get',
            'stop_type',
          ],
          'entrance',
        ],
        19,
        true,
      ],
      type: 'symbol',
      source: 'composite',
      id: 'transit-label',
      paint: {
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-color': [
          'match',
          [
            'get',
            'network',
          ],
          'entrance',
          'hsl(230, 48%, 44%)',
          'tokyo-metro',
          'hsl(180, 50%, 30%)',
          'mexico-city-metro',
          'hsl(25, 100%, 40%)',
          [
            'barcelona-metro',
            'delhi-metro',
            'hong-kong-mtr',
            'milan-metro',
            'osaka-subway',
          ],
          'hsl(0, 90%, 47%)',
          [
            'boston-t',
            'washington-metro',
          ],
          'hsl(0, 0%, 0%)',
          [
            'chongqing-rail-transit',
            'kiev-metro',
            'singapore-mrt',
            'taipei-metro',
          ],
          'hsl(140, 90%, 25%)',
          'hsl(230, 48%, 44%)',
        ],
        'text-halo-blur': 0.5,
        'text-halo-width': 0.5,
      },
      'source-layer': 'transit_stop_label',
    },
    {
      id: 'airport-label',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'airport_label',
      minzoom: 8,
      layout: {
        'text-line-height': 1.1,
        'text-size': [
          'step',
          [
            'get',
            'sizerank',
          ],
          18,
          9,
          12,
        ],
        'icon-image': [
          'step',
          [
            'get',
            'sizerank',
          ],
          [
            'concat',
            [
              'get',
              'maki',
            ],
            '-15',
          ],
          9,
          [
            'concat',
            [
              'get',
              'maki',
            ],
            '-11',
          ],
        ],
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular',
        ],
        'text-offset': [
          0,
          0.75,
        ],
        'text-rotation-alignment': 'viewport',
        'text-anchor': 'top',
        'text-field': [
          'step',
          [
            'get',
            'sizerank',
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
          15,
          [
            'get',
            'ref',
          ],
        ],
        'text-letter-spacing': 0.01,
        'text-max-width': 9,
      },
      paint: {
        'text-color': 'hsl(230, 48%, 44%)',
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-halo-width': 1,
      },
    },
    {
      minzoom: 10,
      layout: {
        'text-field': [
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
        'text-transform': 'uppercase',
        'text-font': [
          'DIN Offc Pro Regular',
          'Arial Unicode MS Regular',
        ],
        'text-letter-spacing': [
          'match',
          [
            'get',
            'type',
          ],
          'suburb',
          0.15,
          [
            'quarter',
            'neighborhood',
          ],
          0.1,
          0.1,
        ],
        'text-max-width': 7,
        'text-padding': 3,
        'text-size': [
          'interpolate',
          [
            'cubic-bezier',
            0.5,
            0,
            1,
            1,
          ],
          [
            'zoom',
          ],
          11,
          [
            'match',
            [
              'get',
              'type',
            ],
            'suburb',
            11,
            [
              'quarter',
              'neighborhood',
            ],
            10.5,
            10.5,
          ],
          15,
          [
            'match',
            [
              'get',
              'type',
            ],
            'suburb',
            17,
            [
              'quarter',
              'neighborhood',
            ],
            16,
            16,
          ],
        ],
      },
      maxzoom: 15,
      filter: [
        'all',
        [
          '==',
          [
            'get',
            'class',
          ],
          'settlement_subdivision',
        ],
        [
          '<=',
          [
            'get',
            'filterrank',
          ],
          4,
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'settlement-subdivision-label',
      paint: {
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-halo-width': 1,
        'text-color': 'hsl(230, 29%, 35%)',
        'text-halo-blur': 0.5,
      },
      'source-layer': 'place_label',
    },
    {
      layout: {
        'text-line-height': 1.1,
        'text-size': [
          'interpolate',
          [
            'cubic-bezier',
            0.2,
            0,
            0.9,
            1,
          ],
          [
            'zoom',
          ],
          3,
          [
            'step',
            [
              'get',
              'symbolrank',
            ],
            12,
            9,
            11,
            10,
            10.5,
            12,
            9.5,
            14,
            8.5,
            16,
            6.5,
            17,
            4,
          ],
          15,
          [
            'step',
            [
              'get',
              'symbolrank',
            ],
            28,
            9,
            26,
            10,
            23,
            11,
            21,
            12,
            20,
            13,
            19,
            15,
            17,
          ],
        ],
        'icon-image': [
          'case',
          [
            '==',
            [
              'get',
              'capital',
            ],
            2,
          ],
          'border-dot-13',
          [
            'step',
            [
              'get',
              'symbolrank',
            ],
            'dot-11',
            9,
            'dot-10',
            11,
            'dot-9',
          ],
        ],
        'text-font': [
          'step',
          [
            'zoom',
          ],
          [
            'literal',
            [
              'DIN Offc Pro Regular',
              'Arial Unicode MS Regular',
            ],
          ],
          8,
          [
            'step',
            [
              'get',
              'symbolrank',
            ],
            [
              'literal',
              [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Regular',
              ],
            ],
            11,
            [
              'literal',
              [
                'DIN Offc Pro Regular',
                'Arial Unicode MS Regular',
              ],
            ],
          ],
          10,
          [
            'step',
            [
              'get',
              'symbolrank',
            ],
            [
              'literal',
              [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Regular',
              ],
            ],
            12,
            [
              'literal',
              [
                'DIN Offc Pro Regular',
                'Arial Unicode MS Regular',
              ],
            ],
          ],
          11,
          [
            'step',
            [
              'get',
              'symbolrank',
            ],
            [
              'literal',
              [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Regular',
              ],
            ],
            13,
            [
              'literal',
              [
                'DIN Offc Pro Regular',
                'Arial Unicode MS Regular',
              ],
            ],
          ],
          12,
          [
            'step',
            [
              'get',
              'symbolrank',
            ],
            [
              'literal',
              [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Regular',
              ],
            ],
            15,
            [
              'literal',
              [
                'DIN Offc Pro Regular',
                'Arial Unicode MS Regular',
              ],
            ],
          ],
          13,
          [
            'literal',
            [
              'DIN Offc Pro Medium',
              'Arial Unicode MS Regular',
            ],
          ],
        ],
        'text-justify': [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'text_anchor',
            ],
            [
              'bottom',
              'top',
            ],
            'center',
            [
              'left',
              'bottom-left',
              'top-left',
            ],
            'left',
            [
              'right',
              'bottom-right',
              'top-right',
            ],
            'right',
            'center',
          ],
          8,
          'center',
        ],
        'text-offset': [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'capital',
            ],
            2,
            [
              'match',
              [
                'get',
                'text_anchor',
              ],
              'bottom',
              [
                'literal',
                [
                  0,
                  -0.3,
                ],
              ],
              'bottom-left',
              [
                'literal',
                [
                  0.3,
                  -0.1,
                ],
              ],
              'left',
              [
                'literal',
                [
                  0.45,
                  0.1,
                ],
              ],
              'top-left',
              [
                'literal',
                [
                  0.3,
                  0.1,
                ],
              ],
              'top',
              [
                'literal',
                [
                  0,
                  0.3,
                ],
              ],
              'top-right',
              [
                'literal',
                [
                  -0.3,
                  0.1,
                ],
              ],
              'right',
              [
                'literal',
                [
                  -0.45,
                  0,
                ],
              ],
              'bottom-right',
              [
                'literal',
                [
                  -0.3,
                  -0.1,
                ],
              ],
              [
                'literal',
                [
                  0,
                  -0.3,
                ],
              ],
            ],
            [
              'match',
              [
                'get',
                'text_anchor',
              ],
              'bottom',
              [
                'literal',
                [
                  0,
                  -0.25,
                ],
              ],
              'bottom-left',
              [
                'literal',
                [
                  0.2,
                  -0.05,
                ],
              ],
              'left',
              [
                'literal',
                [
                  0.4,
                  0.05,
                ],
              ],
              'top-left',
              [
                'literal',
                [
                  0.2,
                  0.05,
                ],
              ],
              'top',
              [
                'literal',
                [
                  0,
                  0.25,
                ],
              ],
              'top-right',
              [
                'literal',
                [
                  -0.2,
                  0.05,
                ],
              ],
              'right',
              [
                'literal',
                [
                  -0.4,
                  0.05,
                ],
              ],
              'bottom-right',
              [
                'literal',
                [
                  -0.2,
                  -0.05,
                ],
              ],
              [
                'literal',
                [
                  0,
                  -0.25,
                ],
              ],
            ],
          ],
          8,
          [
            'literal',
            [
              0,
              0,
            ],
          ],
        ],
        'text-anchor': [
          'step',
          [
            'zoom',
          ],
          [
            'get',
            'text_anchor',
          ],
          8,
          'center',
        ],
        'text-field': [
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
        'text-max-width': 7,
      },
      maxzoom: 15,
      filter: [
        'all',
        [
          '<=',
          [
            'get',
            'filterrank',
          ],
          3,
        ],
        [
          '==',
          [
            'get',
            'class',
          ],
          'settlement',
        ],
        [
          'step',
          [
            'zoom',
          ],
          true,
          13,
          [
            '>=',
            [
              'get',
              'symbolrank',
            ],
            11,
          ],
          14,
          [
            '>=',
            [
              'get',
              'symbolrank',
            ],
            13,
          ],
        ],
      ],
      type: 'symbol',
      source: 'composite',
      id: 'settlement-label',
      paint: {
        'text-color': 'hsl(0, 0%, 0%)',
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-halo-width': 1,
        'icon-opacity': [
          'step',
          [
            'zoom',
          ],
          1,
          8,
          0,
        ],
        'text-halo-blur': 1,
      },
      'source-layer': 'place_label',
    },
    {
      minzoom: 3,
      layout: {
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
      },
      maxzoom: 9,
      filter: [
        '==',
        [
          'get',
          'class',
        ],
        'state',
      ],
      type: 'symbol',
      source: 'composite',
      id: 'state-label',
      paint: {
        'text-color': 'hsl(0, 0%, 0%)',
        'text-halo-color': 'hsl(0, 0%, 100%)',
        'text-halo-width': 1,
      },
      'source-layer': 'place_label',
    },
    {
      minzoom: 1,
      layout: {
        'text-line-height': 1.1,
        'text-size': [
          'interpolate',
          [
            'cubic-bezier',
            0.2,
            0,
            0.7,
            1,
          ],
          [
            'zoom',
          ],
          1,
          [
            'step',
            [
              'get',
              'symbolrank',
            ],
            11,
            4,
            9,
            5,
            8,
          ],
          9,
          [
            'step',
            [
              'get',
              'symbolrank',
            ],
            28,
            4,
            22,
            5,
            21,
          ],
        ],
        'icon-image': 'dot-11',
        'text-font': [
          'DIN Offc Pro Medium',
          'Arial Unicode MS Regular',
        ],
        'text-justify': [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'text_anchor',
            ],
            [
              'bottom',
              'top',
            ],
            'center',
            [
              'left',
              'bottom-left',
              'top-left',
            ],
            'left',
            [
              'right',
              'bottom-right',
              'top-right',
            ],
            'right',
            'center',
          ],
          7,
          'center',
        ],
        'text-offset': [
          'step',
          [
            'zoom',
          ],
          [
            'match',
            [
              'get',
              'text_anchor',
            ],
            'bottom',
            [
              'literal',
              [
                0,
                -0.25,
              ],
            ],
            'bottom-left',
            [
              'literal',
              [
                0.2,
                -0.05,
              ],
            ],
            'left',
            [
              'literal',
              [
                0.4,
                0.05,
              ],
            ],
            'top-left',
            [
              'literal',
              [
                0.2,
                0.05,
              ],
            ],
            'top',
            [
              'literal',
              [
                0,
                0.25,
              ],
            ],
            'top-right',
            [
              'literal',
              [
                -0.2,
                0.05,
              ],
            ],
            'right',
            [
              'literal',
              [
                -0.4,
                0.05,
              ],
            ],
            'bottom-right',
            [
              'literal',
              [
                -0.2,
                -0.05,
              ],
            ],
            [
              'literal',
              [
                0,
                -0.25,
              ],
            ],
          ],
          7,
          [
            'literal',
            [
              0,
              0,
            ],
          ],
        ],
        'text-anchor': [
          'step',
          [
            'zoom',
          ],
          [
            'coalesce',
            [
              'get',
              'text_anchor',
            ],
            'center',
          ],
          7,
          'center',
        ],
        'text-field': [
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
        'text-max-width': 6,
      },
      maxzoom: 10,
      filter: [
        '==',
        [
          'get',
          'class',
        ],
        'country',
      ],
      type: 'symbol',
      source: 'composite',
      id: 'country-label',
      paint: {
        'icon-opacity': [
          'step',
          [
            'zoom',
          ],
          [
            'case',
            [
              'has',
              'text_anchor',
            ],
            1,
            0,
          ],
          7,
          0,
        ],
        'text-color': 'hsl(0, 0%, 0%)',
        'text-halo-color': [
          'interpolate',
          [
            'linear',
          ],
          [
            'zoom',
          ],
          2,
          'rgba(255,255,255,0.75)',
          3,
          'hsl(0, 0%, 100%)',
        ],
        'text-halo-width': 1.25,
      },
      'source-layer': 'place_label',
    },
  ],
  created: '2019-03-05T04:00:01.962Z',
  id: 'cjsv8vxg371cm1fmo1sscgou2',
  modified: '2019-04-07T07:52:25.779Z',
  owner: 'joshg',
  visibility: 'private',
  draft: false,
};

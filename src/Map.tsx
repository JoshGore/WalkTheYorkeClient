import React, { useState, useEffect } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import ReactResizeDetector from 'react-resize-detector';
import bbox from '@turf/bbox';
import { featureCollection } from '@turf/helpers';
import MapGeneral from './MapGeneral';
let stages = require('./data/walktheyorke_naturemaps_stages_simplified2.geojson');
let shelters = require('./data/walktheyorke_oldcouncil_shelters.geojson');

const MapComponent = ReactMapboxGl({
  accessToken: 'pk.eyJ1Ijoiam9zaGciLCJhIjoiTFBBaE1JOCJ9.-BaGpeSYz4yPrpxh1eqT2A',
  trackResize: false,
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
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [mapClickCoordinates, setMapClickCoordinates] = useState<any>({});
  const [stagesData, setStagesData] = useState<any>({});
  // prevents reloading on map changes
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
  // handle map click/tap events
  const handleResize = () => {
    map && map.resize();
  };
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
      style={{
        display: 'flex',
        alignItems: 'stretch',
        flexGrow: 1,
        order: 10,
        minWidth: 0,
        minHeight: 0,
      }}
    >
      <ReactResizeDetector handleWidth handleHeight onResize={handleResize} />
      <MapComponent
        style={'mapbox://styles/joshg/cjsv8vxg371cm1fmo1sscgou2'}
        containerStyle={{ flex: 1 }}
        fitBounds={initialBounds}
        onStyleLoad={onStyleLoad}
        onClick={(map, evt) => mapClick(map, evt)}
      >
        {/* sources for trail lines, short walk lines, day walk lines, hero walk lines */}
        {Object.entries(shelters).length !== 0 &&
          Object.entries(stagesData).length !== 0 && (
            <MapGeneral
              trailSection={trailSection}
              trailObject={trailObject}
              selectedFeature={selectedFeature}
              stagesData={stagesData}
              shelters={shelters}
            />
          )}
      </MapComponent>
    </div>
  );
};

export default Map;

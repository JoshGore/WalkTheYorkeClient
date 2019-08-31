import React from 'react';
import { Source, Layer } from 'react-mapbox-gl';
import CountryLabel from './layers/CountryLabel';
import StateLabel from './layers/StateLabel';
import SettlementLabel from './layers/SettlementLabel';
import SettlementSubdivisionLabel from './layers/SettlementSubdivisionLabel';

const MapOutdoorsAll: React.FC = () => (
  <>
  <Layer id="data-stack-placeholder" />
  <SettlementSubdivisionLabel />
    <SettlementLabel />
    <StateLabel />
    <CountryLabel />
  </>
);

export default MapOutdoorsAll;

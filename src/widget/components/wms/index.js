import React from 'react';
import EgraphMapContainer from '../../../components/WMSMap/EgraphMapContainer';

const EDatosWMS = (props) => {
  return (
    <EgraphMapContainer
      center={props.center}
      zoom={props.zoom}
      sources={props.sources}
      baseUrl={props.baseUrl}
    />
  );
};

export default EDatosWMS;

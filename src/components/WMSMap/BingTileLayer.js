import { createLayerComponent } from '@react-leaflet/core';
import bingTileLayer from 'leaflet-bing-layer';
import PropTypes from 'prop-types';

const IMAGERY_SETS = [
  'Aerial',
  'AerialWithLabels',
  'AerialWithLabelsOnDemand',
  'CanvasDark',
  'CanvasLight',
  'CanvasGray',
  'Road',
  'RoadOnDemand',
  'OrdnanceSurvey',
];

const createBingTileLayer = (props, context) => {
  const instance = new bingTileLayer(props);

  instance._onAdd = instance.onAdd;
  instance.onAdd = function (map) {
    this._onAdd(map);
    this._updateAttribution();
  };
  return { instance, context };
};

const BingTileLayer = createLayerComponent(createBingTileLayer, () => null);

BingTileLayer.propTypes = {
  bingMapsKey: PropTypes.string.isRequired,
  imagerySet: PropTypes.oneOf(IMAGERY_SETS),
  culture: PropTypes.string,
  style: PropTypes.string,
};

BingTileLayer.defaultProps = {
  imagerySet: IMAGERY_SETS[0],
  culture: 'es-ES',
  style: null,
};

export default BingTileLayer;

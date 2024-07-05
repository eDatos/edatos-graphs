import {
  defaultColor,
  visualOptionsDateFormat,
  visualOptionsNumberFormat,
  white,
} from '../../constants';
import { baseVisualOptions } from '../baseVisualOptions';

export const visualOptions = {
  ...Object.fromEntries(
    //Eliminamos el grupo de la leyenda al no ser una opción configurable
    Object.entries(baseVisualOptions).filter(
      ([,value]) => value.group !== 'legend'
    )
  ),
  gapColor: {
    type: 'color',
    default: white,
    group: 'chart',
  },
  gapWidth: {
    type: 'number',
    default: 1,
    group: 'chart',
  },
  borderColor: {
    type: 'color',
    default: white,
    group: 'chart',
  },
  borderWidth: {
    type: 'number',
    default: 5,
    group: 'chart',
  },
  showLabel: {
    type: 'boolean',
    default: true,
    group: 'labels',
  },
  showUpperLabel: {
    type: 'boolean',
    default: true,
    group: 'labels',
  },
  dateFormat: {
    type: 'text',
    group: 'labels',
    default: 'original',
    options: visualOptionsDateFormat.options,
  },
  showTooltip: {
    type: 'boolean',
    default: true,
    group: 'tooltip',
  },
  tooltipValueFormat: {
    type: 'text',
    group: 'tooltip',
    default: 'standard',
    options: visualOptionsNumberFormat.options,
  },
  units: {
    type: 'text',
    default: '',
    group: 'tooltip',
  },
  colorScale: {
    type: 'colorScale',
    domain: 'colorDomain',
    default: {
      scaleType: 'ordinal',
      interpolator: 'defaultPalette',
      defaultColor: defaultColor,
    },
    group: 'colors',
  },
};

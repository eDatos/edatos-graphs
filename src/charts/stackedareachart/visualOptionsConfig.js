import { getOptionsConfig } from '@rawgraphs/rawgraphs-core';
import { visualOptions } from './visualOptions';
import {
  visualOptionsDateFormat,
  visualOptionsNumberFormat,
} from '../../constants';

export function getVisualOptionsConfig(mapping) {
  var customVisualOptions = { ...visualOptions };
  customVisualOptions.xAxisFormat = {
    ...visualOptions.xAxisFormat,
    ...axisFormat(visualOptions.xAxisFormat, mapping?.x?.mappedType),
  };
  return getOptionsConfig(customVisualOptions);
}

const axisFormat = (axisFormat, type) => {
  switch (type) {
    case 'date':
      return visualOptionsDateFormat;
    case 'number':
      return visualOptionsNumberFormat;
    default:
      return axisFormat;
  }
};

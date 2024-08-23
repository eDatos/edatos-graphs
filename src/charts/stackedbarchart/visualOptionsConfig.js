import { getOptionsConfig } from '@rawgraphs/rawgraphs-core';
import { visualOptions } from './visualOptions';
import {
  visualOptionsDateFormat,
  visualOptionsNumberFormat,
} from '../../constants';

export function getVisualOptionsConfig(mapping) {
  var customVisualOptions = { ...visualOptions };
  customVisualOptions.barsLabelsFormat = {
    ...visualOptions.barsLabelsFormat,
    ...barsFormat(visualOptions.barsLabelsFormat, mapping?.stacks?.mappedType),
  };

  return getOptionsConfig(customVisualOptions);
}

const barsFormat = (barsFormat, type) => {
  switch (type) {
    case 'date':
      return visualOptionsDateFormat;
    case 'number':
      return visualOptionsNumberFormat;
    default:
      return barsFormat;
  }
};

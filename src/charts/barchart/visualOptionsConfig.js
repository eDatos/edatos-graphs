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
    ...barsFormat(visualOptions.barsLabelsFormat, mapping?.bars?.mappedType),
  };
  if (mapping.series?.value?.length > 0) {
    customVisualOptions.sortBarsBy.options = sortBarsWithoutSize();
  } else {
    customVisualOptions.sortBarsBy.options = sortBarsWithSize();
  }
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

const sortBarsWithoutSize = () => {
  return [
    {
      label: 'name',
      value: 'name',
    },
    {
      label: 'original',
      value: 'original',
    },
  ];
};

const sortBarsWithSize = () => {
  return [
    {
      label: 'totalDescending',
      value: 'totalDescending',
    },
    {
      label: 'totalAscending',
      value: 'totalAscending',
    },
    {
      label: 'name',
      value: 'name',
    },
    {
      label: 'original',
      value: 'original',
    },
  ];
};

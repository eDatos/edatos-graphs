import { metadata } from './metadata';
import { dimensions } from './dimensions';
import { getChartOptions } from './mapping';
import { visualOptions } from './visualOptions';
import { getVisualOptionsConfig } from './visualOptionsConfig';
import { colorDomain } from './render';
import { defaultOptionsValues } from './defaultOptionsValues';

export const linechart = {
  metadata,
  dimensions,
  getChartOptions,
  colorDomain,
  visualOptions,
  getVisualOptionsConfig,
  defaultOptionsValues,
};

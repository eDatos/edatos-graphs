import { metadata } from './metadata';
import { dimensions } from './dimensions';
import { getChartOptions } from '../stackedbarchart/mapping';
import { visualOptions } from './visualOptions';
import { getVisualOptionsConfig } from './visualOptionsConfig';
import { colorDomain } from '../stackedbarchart/render';
import { defaultOptionsValues } from './defaultOptionsValues';

export const pyramidchart = {
  metadata,
  dimensions,
  getChartOptions,
  colorDomain,
  visualOptions,
  getVisualOptionsConfig,
  defaultOptionsValues,
};

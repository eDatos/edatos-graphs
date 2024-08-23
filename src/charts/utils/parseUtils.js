import moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/ca';
import { dateParsersPatterns } from '../../constants';

export const parseObject = (data) => {
  return data instanceof Date ? data.toJSON() : data;
};

export const parseObjectToValue = (data) => {
  return data instanceof Date ? data.getTime() : data;
};

export const formatNumber = (data, patternFormat, locale) => {
  return format(data, patternFormat, locale, 'number');
};

export const format = (data, patternFormat, locale, type) => {
  if (patternFormat === 'original') {
    return parseObject(data);
  }
  if (type === undefined) {
    type = data instanceof Date ? 'date' : '';
  }
  switch (type) {
    case 'date':
      return moment(data)
        .locale(locale)
        .format(dateParsersPatterns[patternFormat]);
    case 'number':
      const notation = patternFormat ?? 'standard';
      return new Intl.NumberFormat(locale, {
        notation: notation,
        useGrouping: true,
      }).format(data);
    default:
      return data;
  }
};

export const diff = (a, b, type) => {
  switch (type) {
    case 'date':
      return moment(a).diff(b);
    case 'string':
      return a.localeCompare(b);
    default:
      return a - b;
  }
};

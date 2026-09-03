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

export const formatNumber = (data, patternFormat, locale, decimals) => {
  return format(data, patternFormat, locale, 'number', decimals);
};

// Intl.NumberFormat only accepts 0 to 20 fraction digits, anything outside that
// range throws and would break the render (the decimals input does not prevent
// typing -1).
const MAX_FRACTION_DIGITS = 20;

// The number of decimals is fixed (minimum === maximum) so every label reads the
// same width. When it is not given, charts keep the previous behaviour: `compact`
// rounds to 2 significant digits by default, so the number of decimals changes
// from one label to the next (1,2 mil / 12 mil / 123 mil) and is pinned to one
// decimal; the other notations are left to the Intl defaults.
const fractionDigits = (notation, decimals) => {
  const digits = Number(decimals ?? NaN);
  if (!Number.isFinite(digits)) {
    return notation === 'compact'
      ? { minimumFractionDigits: 1, maximumFractionDigits: 1 }
      : {};
  }
  const clamped = Math.min(
    Math.max(Math.trunc(digits), 0),
    MAX_FRACTION_DIGITS
  );
  return { minimumFractionDigits: clamped, maximumFractionDigits: clamped };
};

export const format = (data, patternFormat, locale, type, decimals) => {
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
        ...fractionDigits(notation, decimals),
      }).format(data);
    default:
      return data;
  }
};

export const parseTitle = (title, datachart) => {
  if (!title) {
    return title;
  }
  const lastRow = datachart?.[datachart.length - 1];
  return title.replace(/\$\{\s*([^}]+?)\s*\}/g, (match, columnName) => {
    const value = lastRow?.[columnName];
    return value === undefined ? match : parseObject(value);
  });
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

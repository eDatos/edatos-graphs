import { BsClock, BsHash, BsType } from 'react-icons/bs';
import arEG from 'd3-time-format/locale/ar-EG.json';
import caES from 'd3-time-format/locale/ca-ES.json';
import csCZ from 'd3-time-format/locale/cs-CZ.json';
import daDK from 'd3-time-format/locale/da-DK.json';
import deCH from 'd3-time-format/locale/de-CH.json';
import deDE from 'd3-time-format/locale/de-DE.json';
import enCA from 'd3-time-format/locale/en-CA.json';
import enGB from 'd3-time-format/locale/en-GB.json';
import enUS from 'd3-time-format/locale/en-US.json';
import esES from 'd3-time-format/locale/es-ES.json';
import esMX from 'd3-time-format/locale/es-MX.json';
import faIR from 'd3-time-format/locale/fa-IR.json';
import fiFI from 'd3-time-format/locale/fi-FI.json';
import frCA from 'd3-time-format/locale/fr-CA.json';
import frFR from 'd3-time-format/locale/fr-FR.json';
import heIL from 'd3-time-format/locale/he-IL.json';
import huHU from 'd3-time-format/locale/hu-HU.json';
import itIT from 'd3-time-format/locale/it-IT.json';
import jaJP from 'd3-time-format/locale/ja-JP.json';
import koKR from 'd3-time-format/locale/ko-KR.json';
import mkMK from 'd3-time-format/locale/mk-MK.json';
import nbNO from 'd3-time-format/locale/nb-NO.json';
import nlNL from 'd3-time-format/locale/nl-NL.json';
import plPL from 'd3-time-format/locale/pl-PL.json';
import ptBR from 'd3-time-format/locale/pt-BR.json';
import ruRU from 'd3-time-format/locale/ru-RU.json';
import svSE from 'd3-time-format/locale/sv-SE.json';
import ukUA from 'd3-time-format/locale/uk-UA.json';
import zhCN from 'd3-time-format/locale/zh-CN.json';
import zhTW from 'd3-time-format/locale/zh-TW.json';

export const DateIcon = BsClock;
export const NumberIcon = BsHash;
export const StringIcon = BsType;

export const dataTypeIcons = {
  date: DateIcon,
  number: NumberIcon,
  string: StringIcon,
};

export const localeList = {
  'ar-EG': arEG,
  'ca-ES': caES,
  'cs-CZ': csCZ,
  'da-DK': daDK,
  'de-CH': deCH,
  'de-DE': deDE,
  'en-CA': enCA,
  'en-GB': enGB,
  'en-US': enUS,
  'es-ES': esES,
  'es-MX': esMX,
  'fa-IR': faIR,
  'fi-FI': fiFI,
  'fr-CA': frCA,
  'fr-FR': frFR,
  'he-IL': heIL,
  'hu-HU': huHU,
  'it-IT': itIT,
  'ja-JP': jaJP,
  'ko-KR': koKR,
  'mk-MK': mkMK,
  'nb-NO': nbNO,
  'nl-NL': nlNL,
  'pl-PL': plPL,
  'pt-BR': ptBR,
  'ru-RU': ruRU,
  'sv-SE': svSE,
  'uk-UA': ukUA,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
};

export const WEBWORKER_ACTIVE = false;

export const separatorsLabels = {
  '\\t': 'separator.Tab',
  ';': 'separator.Semicolon',
  ',': 'separator.Comma',
  '|': 'separator.Pipe',
};

export const separatorsList = Object.keys(separatorsLabels);

export const DefaultSeparator = ',';

export const AGGREGATIONS_LABELS = {
  count: 'Count',
  mean: 'Average',
  median: 'Median',
  max: 'Max',
  min: 'Min',
  countDistinct: 'Count unique',
  sum: 'Sum',
  csv: 'CSV',
  csvDistinct: 'CSV (unique)',
};

export const SCALES_LABELS = {
  sequential: 'Sequential',
  diverging: 'Diverging',
  ordinal: 'Ordinal',
};

export const COLOR_SCHEMES_LABELS = {
  interpolateBlues: 'Blue sequential',
  interpolateGreens: 'Green sequential',
  interpolateReds: 'Red sequential',
  interpolateRdBu: 'RdBu diverging',
  interpolateBrBG: 'BrBG diverging',
  interpolatePiYG: 'PiYG diverging',
  schemeCategory10: 'Categorical 10',
  interpolateTurbo: 'Turbo discrete',
  interpolateSpectral: 'Spectral discrete',
  defaultPalette: 'defaultPalette',
  sexPalette: 'sexPalette',
  islandPalette: 'islandPalette',
};

export const white = '#FFFFFF';

export const defaultColor = '#009BD7';

export const defaultPalette = [
  { color: defaultColor, title: 'palettes.default.1' },
  { color: '#F0A82D', title: 'palettes.default.2' },
  { color: '#E95000', title: 'palettes.default.3' },
  { color: '#AF46A8', title: 'palettes.default.4' },
  { color: '#A18979', title: 'palettes.default.5' },
  { color: '#009245', title: 'palettes.default.6' },
  { color: '#BB1709', title: 'palettes.default.7' },
  { color: '#66C3E7', title: 'palettes.default.8' },
  { color: '#F6CB81', title: 'palettes.default.9' },
  { color: '#F29666', title: 'palettes.default.10' },
  { color: '#CF90CB', title: 'palettes.default.11' },
  { color: '#C7B8AF', title: 'palettes.default.12' },
  { color: '#66BE8F', title: 'palettes.default.13' },
  { color: '#F9928B', title: 'palettes.default.14' },
  { color: '#B2E1F3', title: 'palettes.default.15' },
  { color: '#FBE5C0', title: 'palettes.default.16' },
  { color: '#F8CAB2', title: 'palettes.default.17' },
  { color: '#E7C7E5', title: 'palettes.default.18' },
  { color: '#E3DCD7', title: 'palettes.default.19' },
  { color: '#B2DEC7', title: 'palettes.default.20' },
  { color: '#FCC9C5', title: 'palettes.default.21' },
  { color: '#D8F0F9', title: 'palettes.default.22' },
  { color: '#CCDAE4', title: 'palettes.default.23' },
  { color: '#EBF7FC', title: 'palettes.default.24' },
  { color: '#E5ECF1', title: 'palettes.default.25' },
];
export const grayPalette = [
  { color: '#000000', title: 'palettes.gray.1' },
  { color: '#333333', title: 'palettes.gray.2' },
  { color: '#666666', title: 'palettes.gray.3' },
  { color: '#999999', title: 'palettes.gray.4' },
  { color: '#CCCCCC', title: 'palettes.gray.5' },
  { color: '#D9D9D9', title: 'palettes.gray.6' },
  { color: '#E6E6E6', title: 'palettes.gray.7' },
  { color: '#EDECEC', title: 'palettes.gray.8' },
  { color: '#F2F2F2', title: 'palettes.gray.9' },
];

export const grayPalette2 = [
  { color: defaultColor, title: 'palettes.default.1' },
  { color: '#666666', title: 'palettes.gray.3' },
  { color: '#999999', title: 'palettes.gray.4' },
  { color: '#CCCCCC', title: 'palettes.gray.5' },
  { color: '#D9D9D9', title: 'palettes.gray.6' },
  { color: '#E6E6E6', title: 'palettes.gray.7' },
  { color: '#EDECEC', title: 'palettes.gray.8' },
];

export const bluePalette = [
  { color: '#004678', title: 'palettes.blue.1' },
  { color: '#04729C', title: 'palettes.blue.2' },
  { color: '#4D7EA0', title: 'palettes.blue.3' },
  { color: '#99B5C9', title: 'palettes.blue.4' },
  { color: '#CCDAE4', title: 'palettes.blue.5' },
  { color: '#E5ECF1', title: 'palettes.blue.6' },
  { color: '#009BD7', title: 'palettes.blue.7' },
  { color: '#66C3E7', title: 'palettes.blue.8' },
  { color: '#B2E1F3', title: 'palettes.blue.9' },
  { color: '#D8F0F9', title: 'palettes.blue.10' },
  { color: '#EBF7FC', title: 'palettes.blue.11' },
];

export const sexPalette = [
  { color: '#009BD7', title: 'palettes.sex.men' },
  { color: '#E95000', title: 'palettes.sex.women' },
  { color: '#004678', title: 'palettes.sex.total' },
];

export const territoryPalette = [
  { color: '#004678', title: 'palettes.territory.canary' },
  { color: '#E95000', title: 'palettes.territory.spain' },
  { color: '#CCCCCC', title: 'palettes.territory.others' },
];

export const islandPalette = [
  { color: '#009245', title: 'El Hierro' },
  { color: '#66BE8F', title: 'Fuerteventura' },
  { color: '#F0A82D', title: 'Gran Canaria' },
  { color: '#E95000', title: 'La Gomera' },
  { color: '#66C3E7', title: 'La Palma' },
  { color: '#AF46A8', title: 'Lanzarote' },
  { color: '#009BD7', title: 'Tenerife' },
];

export const dateParsersPatterns = {
  year: 'YYYY',
  month: 'MMMM',
  dayOfWeek: 'dddd',
  yearmonth1: 'MM-YYYY',
  yearmonth2: 'MM/YYYY',
  yearmonthday1: 'DD-MM-YYYY',
  yearmonthday2: 'DD/MM/YYYY',
  original: null,
};

export const visualOptionsDateFormat = {
  default: 'original',
  options: [
    {
      label: 'original',
      value: 'original',
    },
    {
      label: 'year',
      value: 'year',
    },
    {
      label: 'month',
      value: 'month',
    },
    {
      label: 'dayOfWeek',
      value: 'dayOfWeek',
    },
    {
      label: 'MM-YYYY',
      value: 'yearmonth1',
    },
    {
      label: 'MM/YYYY',
      value: 'yearmonth2',
    },
    {
      label: 'DD-MM-YYYY',
      value: 'yearmonthday1',
    },
    {
      label: 'DD/MM/YYYY',
      value: 'yearmonthday2',
    },
  ],
};

export const visualOptionsNumberFormat = {
  default: 'standard',
  options: [
    {
      label: 'standard',
      value: 'standard',
    },
    {
      label: 'scientific',
      value: 'scientific',
    },
    {
      label: 'engineering',
      value: 'engineering',
    },
    {
      label: 'compact',
      value: 'compact',
    },
  ],
};

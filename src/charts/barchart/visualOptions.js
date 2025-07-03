import { defaultColor, visualOptionsNumberFormat } from '../../constants';
import { baseVisualOptions } from '../baseVisualOptions';

export const visualOptions = {
  ...baseVisualOptions,
  marginTop: {
    type: 'number',
    default: 46,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    default: 40,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    default: 60,
    group: 'artboard',
  },
  barsOrientation: {
    type: 'text',
    label: 'Bars orientation',
    group: 'chart',
    options: [
      {
        label: 'vertical',
        value: 'vertical',
      },
      {
        label: 'horizontal',
        value: 'horizontal',
      },
    ],
    default: 'vertical',
  },
  sortBarsBy: {
    type: 'text',
    group: 'chart',
    options: [
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
    ],
    default: 'name',
  },
  // labels  
  showBarsName: {
    type: 'boolean',
    default: false,
    group: 'barslabels',
  },
  customBarsName: {
    type: 'text',
    default: '',
    group: 'barslabels',
    disabled: {
      showBarsName: false,
    },
  },
  barsNameLocation: {
    type: 'text',
    group: 'barslabels',
    disabled: {
      showBarsName: false,
    },
    options: [
      {
        label: 'start',
        value: 'start',
      },
      {
        label: 'middle',
        value: 'middle',
      },
      {
        label: 'end',
        value: 'end',
      },
    ],
    default: 'middle',
  },
  barsNameGap: {
    type: 'number',
    group: 'barslabels',
    disabled: {
      showBarsName: false,
    },
    default: 25,
  },
  showBarsLabels: {
    type: 'boolean',
    default: true,
    group: 'barslabels',
  },
  barsLabelsRotate: {
    type: 'number',
    group: 'barslabels',
    disabled: {
      showBarsLabels: false,
    },
    default: 0,
  },
  barsLabelsFontSize: {
    type: 'number',
    group: 'barslabels',
    disabled: {
      showBarsLabels: false,
    },
    default: 12,
  },
  barsLabelsFormat: {
    type: 'text',
    group: 'barslabels',
    default: 'original',
    options: [
      {
        label: 'original',
        value: 'original',
      },
    ],
    disabled: {
      showBarsLabels: false,
    },
  },    
  showBarsSizeName: {
    type: 'boolean',
    default: false,
    group: 'barsSizelabels',
  },
  customBarsSizeName: {
    type: 'text',
    default: '',
    group: 'barsSizelabels',
    disabled: {
      showBarsSizeName: false,
    },
  },
  barsSizeNameLocation: {
    type: 'text',
    group: 'barsSizelabels',
    disabled: {
      showBarsSizeName: false,
    },
    options: [
      {
        label: 'start',
        value: 'start',
      },
      {
        label: 'middle',
        value: 'middle',
      },
      {
        label: 'end',
        value: 'end',
      },
    ],
    default: 'middle',
  },
  barsSizeNameGap: {
    type: 'number',
    group: 'barsSizelabels',
    disabled: {
      showBarsSizeName: false,
    },
    default: 35,
  },
  showBarsSizeLabels: {
    type: 'boolean',
    default: true,
    group: 'barsSizelabels',
  },
  barsSizeLabelsRotate: {
    type: 'number',
    group: 'barsSizelabels',
    disabled: {
      showBarsSizeLabels: false,
    },
    default: 0,
  },
  barsSizeLabelsFontSize: {
    type: 'number',
    group: 'barsSizelabels',
    disabled: {
      showBarsSizeLabels: false,
    },
    default: 12,
  },
  barsSizeLabelsFormat: {
    type: 'text',
    group: 'barsSizelabels',
    default: 'compact',
    options: visualOptionsNumberFormat.options,
    disabled: {
      showBarsSizeLabels: false,
    },
  },
  units: {
    type: 'text',
    default: '',
    group: 'barsSizelabels',
  },  
  showBarsSizeValues: {
    type: 'boolean',
    default: true,
    group: 'labels',
  },
  endLabel: {
    type: 'boolean',
    default: false,
    group: 'labels',
  },
  barsSizeValuesPosition: {
    type: 'text',
    group: 'labels',
    default: 'outside',
    options: [
      {
        label: 'outside',
        value: 'outside',
      },
      {
        label: 'inside',
        value: 'inside',
      },
    ],
    disabled: {
      showBarsSizeValues: false,
    },
  },
  barsSizeValuesFontSize: {
    type: 'number',
    group: 'labels',
    disabled: {
      showBarsSizeValues: false,
    },
    default: 14,
  },
  fontWeight: {
    type: 'text',
    group: 'labels',
    disabled: {
      endLabel: false,
    },
    options: [
      {
        label: 'normal',
        value: 'normal',
      },
      {
        label: 'bold',
        value: 'bold',
      },      
      {
        label: 'lighter',
        value: 'lighter',
      }
    ],
    default: 'normal',
  },
  showUnits: {
    type: 'boolean',
    default: false,
    group: 'labels'
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

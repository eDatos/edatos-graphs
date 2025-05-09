import { defaultColor, visualOptionsNumberFormat } from '../../constants';
import { baseVisualOptions } from '../baseVisualOptions';

export const visualOptions = {
  ...baseVisualOptions,
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
        label: 'name(desc)',
        value: 'name(desc)',
      },
      {
        label: 'original',
        value: 'original',
      },
      {
        label: 'original(desc)',
        value: 'original(desc)',
      },
    ],
    default: 'name',
  },
  groupSeriesInStack: {
    type: 'boolean',
    group: 'chart',
    default: true,
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
  },
  showXaxisLabels: {
    type: 'boolean',
    default: true,
    group: 'labelsx',
  },
  showXaxisLabelsRotate: {
    type: 'number',
    group: 'labelsx',
    disabled: {
      showXaxisLabels: false,
    },
    default: 0,
  },
  showXaxisLabelsFontSize: {
    type: 'number',
    group: 'labelsx',
    disabled: {
      showXaxisLabels: false,
    },
    default: 12,
  },    
  showBarsSizeName: {
    type: 'boolean',
    default: false,
    group: 'barsSizelabels',
  },
  customBarsSizeName: {
    type: 'text',
    group: 'barsSizelabels',
    default: '',
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
  barsSizeLabelsFormat: {
    type: 'text',
    group: 'barsSizelabels',
    default: 'standard',
    options: visualOptionsNumberFormat.options    
  },
  units: {
    type: 'text',
    default: '',
    group: 'barsSizelabels',
  },
  showYaxisLabels: {
    type: 'boolean',
    default: true,
    group: 'labelsy',
  },
  showYaxisLabelsRotate: {
    type: 'number',
    group: 'labelsy',
    disabled: {
      showYaxisLabels: false,
    },
    default: 0,
  },
  showYaxisLabelsFontSize: {
    type: 'number',
    group: 'labelsy',
    disabled: {
      showYaxisLabels: false,
    },
    default: 12,
  },
  showBarsSizeValues: {
    type: 'boolean',
    default: false,
    group: 'labels',
  },
  barsSizeValuesPosition: {
    type: 'text',
    group: 'labels',
    default: 'inside',
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
    default: 12,
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
    default: true,
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

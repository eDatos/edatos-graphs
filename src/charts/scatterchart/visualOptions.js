import { defaultColor, visualOptionsNumberFormat } from '../../constants';
import { baseVisualOptions } from '../baseVisualOptions';

export const visualOptions = {
  ...baseVisualOptions,
  marginRight: {
    type: 'number',
    default: 40,
    group: 'artboard',
  },  
  marginLeft: {
    type: 'number',
    default: 40,
    group: 'artboard',
  },
  symbolSize: {
    type: 'number',
    default: 10,
    group: 'chart',
  },
  xAxisOriginTo0: {
    type: 'boolean',
    default: true,
    group: 'chart',
  },
  yAxisOriginTo0: {
    type: 'boolean',
    default: true,
    group: 'chart',
  },
  showXaxisName: {
    type: 'boolean',
    default: true,
    group: 'labelsx',
  },
  customXaxisName: {
    type: 'text',
    default: '',
    group: 'labelsx',
    disabled: {
      showBarsName: false,
    },
  },
  xAxisNamePosition: {
    type: 'text',
    group: 'labelsx',
    disabled: {
      showXaxisName: false,
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
  xAxisNameGap: {
    type: 'number',
    group: 'labelsx',
    disabled: {
      showXaxisName: false,
    },
    default: 32,
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
  xAxisFormat: {
    type: 'text',
    group: 'labelsx',
    default: 'original',
    options: [
      {
        label: 'original',
        value: 'original',
      },
    ],
    disabled: {
      showXaxisLabels: false,
    },
  },
  showYaxisName: {
    type: 'boolean',
    default: true,
    group: 'labelsy',
  },
  customYaxisName: {
    type: 'text',
    default: '',
    group: 'labelsy',
    disabled: {
      showYaxisName: false,
    },
  },
  yAxisNamePosition: {
    type: 'text',
    group: 'labelsy',
    disabled: {
      showYaxisName: false,
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
  yAxisNameGap: {
    type: 'number',
    group: 'labelsy',
    disabled: {
      showYaxisName: false,
    },
    default: 35,
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
  yAxisFormat: {
    type: 'text',
    group: 'labelsy',
    default: 'original',
    options: [
      {
        label: 'original',
        value: 'original',
      },
    ],
    disabled: {
      showYaxisLabels: false,
    },
  },
  showTooltip: {
    type: 'boolean',
    group: 'tooltip',
    default: true,
  },
  tooltipValueFormat: {
    type: 'text',
    group: 'tooltip',
    default: 'standard',
    options: visualOptionsNumberFormat.options,
  },
  legendMarginBottom: {
    type: 'number',
    default: 20,
    group: 'legend',
    disabled: {
      showLegend: false,
    },
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

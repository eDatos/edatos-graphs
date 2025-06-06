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
    default: 80,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    default: 60,
    group: 'artboard',
  },
  marginLeft: {
    type: 'number',
    default: 40,
    group: 'artboard',
  },
  showPoints: {
    type: 'boolean',
    default: false,
    group: 'chart',
  },
  dotsDiameter: {
    type: 'number',
    default: 2,
    group: 'chart',
    disabled: {
      showPoints: false,
    },
  },
  lineWidth: {
    type: 'number',
    default: 2,
    group: 'chart',
    min: 0
  },
  reverseOrder: {
    type: 'boolean',
    default: false,
    group: 'chart',
  },
  xAxisOriginTo0: {
    type: 'boolean',
    default: false,
    group: 'chart',
  },
  yAxisOriginTo0: {
    type: 'boolean',
    default: true,
    group: 'chart',
  },  
  showXaxisName: {
    type: 'boolean',
    default: false,
    group: 'labelsx',
  },
  customXaxisName: {
    type: 'text',
    default: '',
    group: 'labelsx',
    disabled: {
      showXaxisName: false,
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
    default: 20,
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
    default: false,
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
    default: 'compact',
    options: visualOptionsNumberFormat.options,
    disabled: {
      showYaxisLabels: false,
    },
  },
  units: {
    type: 'text',
    default: '',
    group: 'labelsy',
  },  
  endLabel: {
    type: 'boolean',
    default: true,
    group: 'labels',
  },
  endLabelSize: {
    type: 'number',
    default: 14,
    group: 'labels',
  },
  endLabelWeight: {
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
    default: 'bold',
  },
  endLabelFormat: {
    type: 'text',
    default: 'standard',
    options: visualOptionsNumberFormat.options,
    group: 'labels',
  },
  endLabelPointDiameter: {
    type: 'number',
    default: 10,
    group: 'labels',
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

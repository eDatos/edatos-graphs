import { transparent } from '../constants';

export const baseVisualOptions = {
  title: {
    type: 'text',
    group: 'artboard',
  },
  width: {
    type: 'number',
    default: 1000,
    container: 'width',
    group: 'artboard',
  },
  marginTop: {
    type: 'number',
    default: 40,
    group: 'artboard',
  },
  marginRight: {
    type: 'number',
    default: 15,
    group: 'artboard',
  },
  marginBottom: {
    type: 'number',
    default: 50,
    group: 'artboard',
  },
  marginLeft: {
    type: 'number',
    default: 30,
    group: 'artboard',
  },
  showToolbox: {
    type: 'boolean',
    default: true,
    group: 'artboard',
  },
  render: {
    type: 'text',
    group: 'artboard',
    options: [
      {
        label: 'svg',
        value: 'svg',
      },
      {
        label: 'canvas',
        value: 'canvas',
      },
    ],
    default: 'svg',
  },
  showLegend: {
    type: 'boolean',
    default: true,
    group: 'legend',
  },
  legendWidth: {
    type: 'number',
    default: 900,
    group: 'legend',
    disabled: {
      showLegend: false,
    },
  },
  legendOrient: {
    type: 'text',
    group: 'legend',
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
    default: 'horizontal',
    disabled: {
      showLegend: false,
    },
  },
  legendMarginRight: {
    type: 'number',
    default: 'auto',
    group: 'legend',
    disabled: {
      showLegend: false,
    },
  },
  legendMarginBottom: {
    type: 'number',
    default: 18,
    group: 'legend',
    disabled: {
      showLegend: false,
    },
  },
  legendTextSize: {
    type: 'number',
    default: 12,
    group: 'legend',
    disabled: {
      showLegend: false,
    },
  },
  legendItemSize: {
    type: 'number',
    default: 50,
    group: 'legend',
    disabled: {
      showLegend: false,
    },
  },
  background: {
    type: 'color',
    default: transparent,
    group: 'colors',
  },
};

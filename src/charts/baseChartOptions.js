export const legend = (visualOptions) => {
  return {
    show: visualOptions.showLegend,
    width: visualOptions.legendWidth,
    orient: visualOptions.legendOrient,
    right: visualOptions.legendMarginRight,
    bottom: visualOptions.legendMarginBottom,
    icon: 'rect',
    textStyle: {
      fontSize: visualOptions.legendTextSize,
      width: visualOptions.legendLabelWidth,
      overflow: 'truncate',
    },
    itemWidth: (25 * visualOptions.legendItemSize) / 100,
    itemHeight: (14 * visualOptions.legendItemSize) / 100,
    tooltip: {
      show: true,
    },
  };
};

export const toolbox = (showToolbox) => {
  return {
    show: showToolbox,
    feature: {
      saveAsImage: {},
      dataView: {},
      dataZoom: {},
      restore: {},
    },
  };
};

export const grid = (visualOptions) => {
  return {
    left: visualOptions.marginLeft,
    right: visualOptions.marginRight,
    bottom: visualOptions.marginBottom,
    top: visualOptions.marginTop,
    containLabel: true,
  };
};

// The axis whose format can be picked but whose decimals are not configurable
// (the category axis on bar charts, the x axis on line, area and scatter
// charts): when a numeric format is chosen it always shows whole numbers.
export const AXIS_LABELS_DECIMALS = 0;

// Published widgets pass their stored visualOptions as they are, without merging
// the option defaults, so charts saved before these options existed fall back to
// the same values declared in visualOptions.js.
export const barsSizeLabelsDecimals = (visualOptions) =>
  visualOptions.barsSizeLabelsDecimals ?? 0;
export const yAxisDecimals = (visualOptions) =>
  visualOptions.yAxisDecimals ?? 0;
export const endLabelDecimals = (visualOptions) =>
  visualOptions.endLabelDecimals ?? 1;
export const tooltipValueDecimals = (visualOptions) =>
  visualOptions.tooltipValueDecimals ?? 1;

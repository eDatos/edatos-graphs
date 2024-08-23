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
    },
    itemWidth: (25 * visualOptions.legendItemSize) / 100,
    itemHeight: (14 * visualOptions.legendItemSize) / 100,
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

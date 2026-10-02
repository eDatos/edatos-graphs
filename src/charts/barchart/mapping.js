import * as d3 from 'd3';
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core';
import {
  diff,
  format,
  formatNumber,
  parseObject,
  parseTitle,
} from '../utils/parseUtils';
import {
  AXIS_LABELS_DECIMALS,
  barsSizeLabelsDecimals,
  grid,
  legend,
  toolbox,
  tooltipValueDecimals,
} from '../baseChartOptions';

const mapData = function (
  data,
  mapping,
  dataTypes,
  dimensions,
  barsLabelsFormat,
  locale
) {
  const sizeAggregator = getDimensionAggregator(
    'size',
    mapping,
    dataTypes,
    dimensions
  );
  if (mapping.series === undefined) {
    mapping.series = {
      value: undefined,
    };
  }
  if (mapping.size === undefined) {
    mapping.size = {
      value: undefined,
    };
  }

  let results = [];

  d3.rollups(
    data.filter((d) => {
      return mapping.size.value && mapping.bars.mappedType !== 'date'
        ? d[mapping.size.value[0]] !== null
        : true;
    }),
    (v) => {
      const item = {
        series: v[0][mapping.series.value], //get the first one since it's grouped
        bars: parseObject(v[0][mapping.bars.value]), // get the first one since it's grouped
        size:
          mapping.size.value && mapping.size.value.length > 0
            ? sizeAggregator[0](v.map((d) => d[mapping.size.value]))
            : v.length, // aggregate. If not mapped, give 1 as size
      };
      results.push(item);
      return item;
    },
    (d) => parseObject(d[mapping.series.value]), //series grouping
    (d) =>
      format(
        d[mapping.bars.value],
        barsLabelsFormat,
        locale,
        mapping.bars.mappedType,
        AXIS_LABELS_DECIMALS
      ) // bars grouping
  );

  return results;
};

function categoryOptions(visualOptions, bars, locale, data) {
  const categoryName = visualOptions.customBarsName
    ? visualOptions.customBarsName
    : bars.value;
  return {
    name: visualOptions.showBarsName ? categoryName : '',
    nameLocation: visualOptions.barsNameLocation,
    nameGap: visualOptions.barsNameGap,
    data,
    type: 'category',
    axisLabel: {
      show: visualOptions.showBarsLabels,
      rotate: visualOptions.barsLabelsRotate,
      fontSize: visualOptions.barsLabelsFontSize,
      formatter: (param) => {
        return format(
          param,
          visualOptions.barsLabelsFormat,
          locale,
          bars.mappedType,
          AXIS_LABELS_DECIMALS
        );
      },
    },
  };
}

function valueOptions(visualOptions, name, locale) {
  const valueName = visualOptions.customBarsSizeName
    ? visualOptions.customBarsSizeName
    : name;
  return {
    name: visualOptions.showBarsSizeName ? valueName : '',
    nameLocation: visualOptions.barsSizeNameLocation,
    nameGap: visualOptions.barsSizeNameGap,
    type: 'value',
    axisLabel: {
      show: visualOptions.showBarsSizeLabels,
      rotate: visualOptions.barsSizeLabelsRotate,
      fontSize: visualOptions.barsSizeLabelsFontSize,
      formatter: (value) => {
        return formatNumber(
          value,
          visualOptions.barsSizeLabelsFormat,
          locale,
          barsSizeLabelsDecimals(visualOptions)
        );
      },
    },
  };
}

const getxAxis = (visualOptions, mapping, locale, data) => {
  if ('vertical' === visualOptions.barsOrientation) {
    return categoryOptions(
      visualOptions,
      mapping.bars,
      locale,
      data.map((d) => d.name)
    );
  } else {
    return valueOptions(visualOptions, mapping.size?.value ?? '', locale);
  }
};

const getyAxis = (visualOptions, mapping, locale, data) => {
  if ('horizontal' === visualOptions.barsOrientation) {
    return categoryOptions(
      visualOptions,
      mapping.bars,
      locale,
      data.map((d) => d.name)
    );
  } else {
    return valueOptions(visualOptions, mapping.size?.value ?? '', locale);
  }
};

function getDimensions(resultMap, mapping) {
  if (mapping.series?.value?.length > 0) {
    const dimensions = resultMap
      .map((res) => parseObject(res.series))
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
    dimensions.unshift('bars');
    return dimensions;
  } else {
    const sizeName = mapping.size.value
      ? mapping.size.value[0] ?? 'Size'
      : 'Size';
    return ['bars', sizeName];
  }
}

export const getChartOptions = function (
  visualOptions,
  datachart,
  mapping,
  dataTypes,
  dimensions,
  locale
) {
  const resultMap = mapData(
    datachart,
    mapping,
    dataTypes,
    dimensions,
    visualOptions.barsLabelsFormat,
    locale
  );
  let chartDimensions = getDimensions(resultMap, mapping);
  const barSeries = chartDimensions.splice(1).map(function (item, index) {
    let colorValue = getColorValue();

    const serieData = resultMap
      .filter((res) => typeof res.size === 'number' && !isNaN(res.size))
      .filter((d) => (d.series ? parseObject(d.series) === item : true))
      .sort((a, b) => {
        if ('original' === visualOptions.sortBarsBy) {
          return 0;
        } else if ('name' === visualOptions.sortBarsBy) {
          return diff(a.bars, b.bars, mapping.bars.mappedType);
        } else {
          return 'totalAscending' === visualOptions.sortBarsBy
            ? a.size - b.size
            : b.size - a.size;
        }
      });

    const data = serieData.map((d, index) => ({
      value: d.size,
      name: d.bars,
      label: {
        show:
          visualOptions.showBarsSizeValues &&
          (visualOptions.endLabel ? index === serieData.length - 1 : true),
        position: visualOptions.barsSizeValuesPosition,
        formatter(params) {
          return params.value === 0
            ? ''
            : formatNumber(
                params.value,
                visualOptions.tooltipValueFormat,
                locale,
                tooltipValueDecimals(visualOptions)
              ) + (visualOptions.showUnits ? visualOptions.units : '');
        },
        fontSize: visualOptions.barsSizeValuesFontSize,
        fontWeight: visualOptions.fontWeight,
      },
    }));

    return {
      type: 'bar',
      name: item,
      data,
      labelLayout: {
        hideOverlap: true,
      },
      color: colorValue,
    };

    function getColorValue() {
      if (!visualOptions.colorScale.userScaleValues) {
        return visualOptions.colorScale.defaultColor;
      }
      let colorValue;
      if (visualOptions.colorScale.userScaleValues?.length === 1) {
        colorValue = visualOptions.colorScale.userScaleValues[0].range;
      } else {
        switch (visualOptions.colorScale.scaleType) {
          case 'ordinal':
            colorValue = visualOptions.colorScale.userScaleValues.find(
              (e) => e.domain === item
            )?.range;
            break;
          case 'sequential':
            colorValue = visualOptions.colorScale.userScaleValues.map(
              (res) => res.range
            );
            break;
          default:
            colorValue = visualOptions.colorScale.defaultColor;
        }
      }

      return colorValue;
    }
  });

  return {
    aria: {
      show: true,
    },
    title: {
      text: parseTitle(visualOptions.title, datachart),
      left: 10,
      top: 10,
    },
    legend: legend(visualOptions),
    backgroundColor: visualOptions.background,
    tooltip: {
      show: visualOptions.showTooltip,
      formatter: function (params) {
        var colorSpan = (color) =>
          '<span class="tooltip-circle" style="background-color:' +
          color +
          '"></span>';
        return `${
          mapping.series?.value?.length > 0 ? params.seriesName + '<br/>' : ''
        }${colorSpan(params.color)} ${format(
          params.name,
          visualOptions.barsLabelsFormat,
          locale,
          mapping.bars?.mappedType,
          AXIS_LABELS_DECIMALS
        )}&nbsp;&nbsp;&nbsp;<b>${formatNumber(
          params.value,
          visualOptions.tooltipValueFormat,
          locale,
          tooltipValueDecimals(visualOptions)
        )}${visualOptions.units}</b>`;
      },
    },
    toolbox: toolbox(visualOptions.showToolbox),
    grid: grid(visualOptions),
    xAxis: getxAxis(visualOptions, mapping, locale, barSeries[0].data),
    yAxis: getyAxis(visualOptions, mapping, locale, barSeries[0].data),
    series: [...barSeries],
  };
};

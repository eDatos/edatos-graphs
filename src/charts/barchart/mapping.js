import * as d3 from 'd3';
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core';
import { format, formatNumber, parseObject } from '../utils/parseUtils';
import { grid, legend, toolbox } from '../baseChartOptions';

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
    data,
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
        mapping.bars.mappedType
      ) // bars grouping
  );

  return results;
};

function categoryOptions(visualOptions, bars, locale) {
  const categoryName = visualOptions.customBarsName
    ? visualOptions.customBarsName
    : bars.value;
  return {
    name: visualOptions.showBarsName ? categoryName : '',
    nameLocation: visualOptions.barsNameLocation,
    nameGap: visualOptions.barsNameGap,
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
          bars.mappedType
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
        return new Intl.NumberFormat(locale, {
          notation: visualOptions.barsSizeLabelsFormat,
        }).format(value);
      },
    },
  };
}

const getxAxis = (visualOptions, mapping, locale) => {
  if ('vertical' === visualOptions.barsOrientation) {
    return categoryOptions(visualOptions, mapping.bars, locale);
  } else {
    return valueOptions(visualOptions, mapping.size?.value ?? '', locale);
  }
};

const getyAxis = (visualOptions, mapping, locale) => {
  if ('horizontal' === visualOptions.barsOrientation) {
    return categoryOptions(visualOptions, mapping.bars, locale);
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

function getParser(mappedType) {
  switch (mappedType) {
    case 'date':
      return 'time';
    case 'string':
      return 'trim';
    default:
      return 'number';
  }
}

function getSorterConfig(visualOptions, dimensions, mapping) {
  const dimension =
    'name' !== visualOptions.sortBarsBy && dimensions.length < 3
      ? dimensions.slice(-1)
      : 'bars';
  let sortBySize = dimension !== 'bars';
  let order =
    sortBySize && 'totalDescending' === visualOptions.sortBarsBy
      ? 'desc'
      : 'asc';

  return {
    transform: {
      type: 'sort',
      config: {
        dimension,
        order,
        parser: getParser(
          sortBySize ? mapping.size?.mappedType : mapping.bars?.mappedType
        ),
      },
    },
  };
}

function getDataset(resultMap, mapping, visualOptions) {
  const dimensions = getDimensions(resultMap, mapping);
  return [
    {
      dimensions: dimensions,
      source: resultMap.map((res) => {
        if (res.series) {
          return { bars: res.bars, [parseObject(res.series)]: res.size };
        } else {
          const sizeName = mapping.size.value ?? 'Size';
          return { bars: res.bars, [sizeName]: res.size };
        }
      }),
    },
    getSorterConfig(visualOptions, dimensions, mapping),
  ];
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
  let dimensiones = getDimensions(resultMap, mapping);
  const barSeries = dimensiones.splice(1).map(function (item, index) {
    let colorValue = getColorValue();
    return {
      type: 'bar',
      datasetIndex: visualOptions.sortBarsBy !== 'original' ? 1 : 0,
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
      text: visualOptions.title,
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
          mapping.bars?.mappedType
        )}&nbsp;&nbsp;&nbsp;<b>${formatNumber(
          params.value[params.seriesName],
          visualOptions.tooltipValueFormat,
          locale
        )}${visualOptions.units}</b>`;
      },
    },
    toolbox: toolbox(visualOptions.showToolbox),
    dataset: getDataset(resultMap, mapping, visualOptions),
    grid: grid(visualOptions),
    xAxis: getxAxis(visualOptions, mapping, locale),
    yAxis: getyAxis(visualOptions, mapping, locale),
    series: [...barSeries],
  };
};

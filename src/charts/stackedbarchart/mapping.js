import * as d3 from 'd3';
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core';
import { diff, format, formatNumber, parseObject } from '../utils/parseUtils';
import { white } from '../../constants';
import { grid, legend, toolbox } from '../baseChartOptions';

const reduceDataByStacks = (mapData) => {
  return mapData
    .reduce((accumulator, currentValue) => {
      let findIndex = accumulator.findIndex(
        (d) => d.stacks === currentValue.stacks
      );
      if (findIndex < 0) {
        return [
          ...accumulator,
          { stacks: currentValue.stacks, size: currentValue.size },
        ];
      } else {
        accumulator[findIndex].size += currentValue.size;
      }
      return accumulator;
    }, [])
    .sort((a, b) => a.size - b.size);
};

const sortFunction = (a, b, sortBarsBy, type, mapData) => {
  if (!a.stacks) {
    return 0;
  }
  const dataByStacks = reduceDataByStacks(mapData);
  switch (sortBarsBy) {
    case 'original':
      return 0;
    case 'original(desc)':
      return -1;
    case 'totalAscending':
      return diff(
        dataByStacks.findIndex((d) => d.stacks === a.stacks),
        dataByStacks.findIndex((d) => d.stacks === b.stacks)
      );
    case 'totalDescending':
      return diff(
        dataByStacks.findIndex((d) => d.stacks === b.stacks),
        dataByStacks.findIndex((d) => d.stacks === a.stacks)
      );
    case 'name(desc)':
      return diff(b.stacks, a.stacks, type);
    case 'name':
    default:
      return diff(a.stacks, b.stacks, type);
  }
};

const getValueItem = (
  name,
  axisLabel,
  axisLabelRotate,
  axisLabelFontSize,
  visualOptions,
  locale
) => {
  return {
    name: name,
    nameLocation: visualOptions.barsSizeNameLocation,
    nameGap: visualOptions.barsSizeNameGap,
    type: 'value',
    axisLabel: {
      show: axisLabel,
      rotate: axisLabelRotate,
      fontSize: axisLabelFontSize,
      formatter: (value) => {
        return new Intl.NumberFormat(locale, {
          notation: visualOptions.barsSizeLabelsFormat,
        }).format(value);
      },
    },
  };
};

const getCategoryItem = (
  name,
  axisLabel,
  axisLabelRotate,
  axisLabelFontSize,
  visualOptions,
  stacks,
  locale
) => {
  return {
    name: name,
    nameLocation: visualOptions.barsNameLocation,
    nameGap: visualOptions.barsNameGap,
    type: 'category',
    axisLabel: {
      show: axisLabel,
      rotate: axisLabelRotate,
      fontSize: axisLabelFontSize,
      formatter: (param) => {
        return format(
          param,
          visualOptions.barsLabelsFormat,
          locale,
          stacks?.mappedType
        );
      },
    },
  };
};

const getAxisItem = (
  name,
  type,
  axisLabel,
  axisLabelRotate,
  axisLabelFontSize,
  visualOptions,
  stacks,
  locale
) => {
  if (type === 'category') {
    return getCategoryItem(
      name,
      axisLabel,
      axisLabelRotate,
      axisLabelFontSize,
      visualOptions,
      stacks,
      locale
    );
  } else {
    return getValueItem(
      name,
      axisLabel,
      axisLabelRotate,
      axisLabelFontSize,
      visualOptions,
      locale
    );
  }
};

const name = (visualOptions, stacks, type) => {
  if (type === 'category' && visualOptions.showBarsName) {
    return visualOptions.customBarsName
      ? visualOptions.customBarsName
      : stacks?.value ?? 'Size';
  } else if (type === 'value' && visualOptions.showBarsSizeName) {
    return visualOptions.customBarsSizeName
      ? visualOptions.customBarsSizeName
      : '';
  }
  return '';
};

var getXAxisItem = (visualOptions, stacks, locale) => {
  const type =
    visualOptions.barsOrientation === 'vertical' ? 'category' : 'value';
  return getAxisItem(
    name(visualOptions, stacks, type),
    type,
    visualOptions.showXaxisLabels,
    visualOptions.showXaxisLabelsRotate,
    visualOptions.showXaxisLabelsFontSize,
    visualOptions,
    stacks,
    locale
  );
};

var getYAxisItem = (visualOptions, stacks, locale) => {
  const type =
    visualOptions.barsOrientation === 'vertical' ? 'value' : 'category';
  return getAxisItem(
    name(visualOptions, stacks, type),
    type,
    visualOptions.showYaxisLabels,
    visualOptions.showYaxisLabelsRotate,
    visualOptions.showYaxisLabelsFontSize,
    visualOptions,
    stacks,
    locale
  );
};

const getAxis = (sortedMapData, item) => {
  if (item.type === 'category') {
    item.data = sortedMapData
      .map((item) => item.stacks ?? '')
      .filter((value, index, self) => self.indexOf(value) === index);
  }
  return [item];
};

const colorValue = function (visualOptions, item) {
  return visualOptions.colorScale.userScaleValues.find((e) => e.domain === item)
    ?.range;
};

const getSeries = (sortedMapData, bars, visualOptions) => {
  let series = [];
  bars.forEach((bar) => {
    let myData = sortedMapData.filter((d) => d.bars === bar);
    let myStacks = myData
      .map((item) => item.series)
      .filter((value, index, self) => self.indexOf(value) === index);
    myStacks.forEach((stack) => {
      const name = stack ? stack : bar;
      let serie = {
        name: name,
        type: 'bar',
        stack: stack && !visualOptions.groupSeriesInStack ? stack : 'default',
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          borderRadius: [2, 0, 0, 0],
          borderColor: white,
        },
        data: myData.filter((d) => d.series === stack).map((d) => d.size),
        color: colorValue(visualOptions, name),
      };
      series.push(serie);
    });
  });
  return series;
};

const mapData = function (
  data,
  mapping,
  dataTypes,
  dimensions,
  barsLabelsFormat,
  locale
) {
  // as we are working on a multiple dimension (bars), `getDimensionAggregator` will return an array of aggregator functions
  // the order of aggregators is the same as the value of the mapping
  const barsAggregators = getDimensionAggregator(
    'bars',
    mapping,
    dataTypes,
    dimensions
  );
  if (mapping.series === undefined) {
    mapping.series = {
      value: undefined,
    };
  }

  let results = [];
  d3.rollups(
    data,
    (v) => {
      // use the spread operator to creat groups on mapping values
      // for every dimension in the bars field, create an item
      mapping.bars.value.forEach((barName, i) => {
        //getting values for aggregation
        const valuesForSize = v.map((x) => x[barName]);
        //getting i-th aggregator
        const aggregator = barsAggregators[i];

        // create the item
        const item = {
          series: v[0][mapping.series.value], // get the first one since it's grouped
          stacks: mapping.stacks?.value
            ? parseObject(v[0][mapping.stacks?.value])
            : '', // get the first one since it's grouped
          bars: barName,
          size: aggregator(valuesForSize),
        };
        results.push(item);
      });
    },
    (d) => d[mapping.series.value], // series grouping
    (d) =>
      format(
        d[mapping.stacks?.value],
        barsLabelsFormat,
        locale,
        mapping.stacks?.mappedType
      ) // stacks grouping.
  );
  return results;
};

export const getChartOptions = function (
  visualOptions,
  datachart,
  mapping,
  dataTypes,
  dimensions,
  locale
) {
  let resultMap = mapData(
    datachart,
    mapping,
    dataTypes,
    dimensions,
    visualOptions.barsLabelsFormat,
    locale
  );
  const sortedMapData = resultMap.sort((a, b) =>
    sortFunction(
      a,
      b,
      visualOptions.sortBarsBy,
      mapping.stacks?.mappedType,
      resultMap
    )
  );
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
      axisPointer: {
        type: 'shadow',
      },
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
          mapping.stacks?.mappedType
        )}&nbsp;&nbsp;&nbsp;<b>${formatNumber(
          params.value,
          visualOptions.tooltipValueFormat,
          locale
        )}${visualOptions.units}</b>`;
      },
    },
    toolbox: toolbox(visualOptions.showToolbox),
    grid: grid(visualOptions),
    xAxis: getAxis(
      sortedMapData,
      getXAxisItem(visualOptions, mapping.stacks, locale),
      visualOptions.sortBarsBy
    ),
    yAxis: getAxis(
      sortedMapData,
      getYAxisItem(visualOptions, mapping.stacks, locale),
      visualOptions.sortBarsBy
    ),
    series: getSeries(sortedMapData, mapping.bars.value, visualOptions),
  };
};

import * as d3 from 'd3';
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core';
import _ from 'lodash';
import {
  diff,
  format,
  formatNumber,
  parseObject,
  parseTitle,
} from '../utils/parseUtils';
import { grid, legend, toolbox } from '../baseChartOptions';

export const mapData = function (data, mapping, dataTypes, dimensions) {
  const yAggregator = getDimensionAggregator(
    'y',
    mapping,
    dataTypes,
    dimensions
  );
  if (mapping.series === undefined) {
    mapping.series = {
      value: undefined,
    };
  }

  const isSeriesDefined = mapping.series.value?.length > 0;
  let results = [];

  d3.rollups(
    data,
    (v) =>
      d3.rollups(
        v,
        (vv) => {
          const item = {
            x: parseObject(vv[0][mapping.x.value]), //get the first one since it's grouped
            y: yAggregator[0](vv.map((d) => d[mapping.y.value])), // aggregate
            series: isSeriesDefined
              ? parseObject(vv[0][mapping.series.value])
              : 'y', //get the first one since it's grouped
          };
          results.push(item);
        },
        (d) => parseObject(d[mapping.x.value])
      ),
    (d) => parseObject(d[mapping.series.value]) // group functions
  );

  return results;
};
function getDimensions(resultMap, mapping) {
  if (mapping.series.value === undefined || mapping.series.value.length === 0) {
    return ['y'];
  } else {
    var dimensions = resultMap
      .map((res) => parseObject(res.series))
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
    return dimensions;
  }
}

function getXData(resultMap, mappedType, reverseOrder) {
  let xData = [];
  resultMap.forEach((e) => {
    let value = e.x;
    if (xData.indexOf(value) === -1) {
      xData.push(value);
    }
  });
  xData.sort((a, b) => diff(a, b, mappedType));
  return reverseOrder ? xData.reverse() : xData;
}

const getXAxis = (visualOptions, name, mappedType) => {
  return {
    name: visualOptions.showXaxisName ? name : '',
    nameLocation: visualOptions.xAxisNamePosition,
    nameGap: visualOptions.xAxisNameGap,
    type: mappedType === 'number' ? 'value' : 'category',
    boundaryGap: false,
    axisLabel: {
      show: visualOptions.showXaxisLabels,
      rotate: visualOptions.showXaxisLabelsRotate,
      fontSize: visualOptions.showXaxisLabelsFontSize,
    },
    scale: !visualOptions.xAxisOriginTo0,
  };
};

const getYAxis = (visualOptions, name, locale) => {
  return {
    name: visualOptions.showYaxisName ? name : '',
    nameLocation: visualOptions.yAxisNamePosition,
    nameGap: visualOptions.yAxisNameGap,
    axisLabel: {
      show: visualOptions.showYaxisLabels,
      rotate: visualOptions.showYaxisLabelsRotate,
      fontSize: visualOptions.showYaxisLabelsFontSize,
      formatter: (value) => {
        return formatNumber(value, visualOptions.yAxisFormat, locale);
      },
    },
    scale: !visualOptions.yAxisOriginTo0,
  };
};

export function getChartOptions(
  visualOptions,
  datachart,
  mapping,
  dataTypes,
  dimensions,
  locale
) {
  const resultMap = mapData(datachart, mapping, dataTypes, dimensions);
  const xData = getXData(
    resultMap,
    mapping.x.mappedType,
    visualOptions.reverseOrder
  );

  let data = _.groupBy(resultMap, 'series');

  const series = getDimensions(resultMap, mapping)
    .map(function (item, index) {
      let colorValue;
      if (visualOptions.colorScale.userScaleValues?.length === 1) {
        colorValue = visualOptions.colorScale.userScaleValues[0].range;
      } else {
        colorValue = visualOptions.colorScale.userScaleValues.find(
          (e) => e.domain === item
        )?.range;
      }
      let lineData = [];
      xData.forEach((e) => {
        let value = _.find(data[item], ['x', e], 0);
        let y = value ? value.y : null;
        lineData.push([
          format(e, visualOptions.xAxisFormat, locale, mapping.x.mappedType),
          y,
        ]);
      });
      return {
        name: item,
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: { focus: 'series' },
        color: colorValue,
        data: lineData,
        labelLayout: {
          hideOverlap: true,
        },
        endLabel: {
          show: visualOptions.endLabel,
          fontSize: visualOptions.endLabelSize,
          fontWeight: visualOptions.endLabelWeight ?? 'bold',
          position: 'right',
          formatter: (params) =>
            formatNumber(
              params.value[1],
              visualOptions.endLabelFormat,
              locale
            ) + (visualOptions.showUnits ? visualOptions.units : ''),
        },
        lineStyle: {
          width: visualOptions.lineWidth ?? 2,
        },
        symbolSize: function (value, params) {
          let dotsDiameter = visualOptions.showPoints
            ? visualOptions.dotsDiameter
            : 1;
          let lastDotDiameter = visualOptions.endLabel
            ? visualOptions.endLabelPointDiameter
            : dotsDiameter;
          const lastValidIndex =
            lineData
              .map((point, index) => ({ index, y: point[1] }))
              .filter((p) => p.y != null && !isNaN(p.y))
              .at(-1)?.index ?? -1;
          return params.dataIndex === lastValidIndex
            ? lastDotDiameter
            : dotsDiameter;
        },
        symbol: 'circle',
        showSymbol: true,
        tooltip: {
          valueFormatter: (value) =>
            formatNumber(value, visualOptions.tooltipValueFormat, locale) +
            visualOptions.units,
        },
      };
    })
    .sort((a, b) => {
      const sumValor = (obj) => obj.data.reduce((acc, [_, y]) => acc + y, 0);
      switch (visualOptions.sortBy) {
        case 'original(desc)':
          return -1;
        case 'totalAscending':
          return sumValor(a) - sumValor(b);
        case 'totalDescending':
          return sumValor(b) - sumValor(a);
        default:
          return 0;
      }
    });

  const xAxisName = visualOptions.customXaxisName
    ? visualOptions.customXaxisName
    : mapping.x.value;
  const yAxisName = visualOptions.customYaxisName
    ? visualOptions.customYaxisName
    : mapping.y.value;

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
      trigger: 'axis',
    },
    toolbox: toolbox(visualOptions.showToolbox),
    grid: grid(visualOptions),
    xAxis: getXAxis(visualOptions, xAxisName, mapping.x.mappedType),
    yAxis: getYAxis(visualOptions, yAxisName, locale),
    series: [...series],
  };
}

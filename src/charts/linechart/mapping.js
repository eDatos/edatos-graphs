import * as d3 from 'd3';
import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core';
import _ from 'lodash';
import { diff, format, formatNumber, parseObject } from '../utils/parseUtils';
import { grid, legend, toolbox } from '../baseChartOptions';

export const mapData = function (data, mapping, dataTypes, dimensions) {
  const yAggregator = getDimensionAggregator(
    'y',
    mapping,
    dataTypes,
    dimensions
  );
  if (mapping.lines === undefined) {
    mapping.lines = {
      value: undefined,
    };
  }

  const multiplesLines = mapping.lines.value?.length > 0;
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
            lines: multiplesLines
              ? parseObject(vv[0][mapping.lines.value])
              : 'y', //get the first one since it's grouped
          };
          results.push(item);
        },
        (d) => parseObject(d[mapping.x.value])
      ),
    (d) => parseObject(d[mapping.lines.value]) // group functions
  );

  return results;
};
function getDimensions(resultMap, mapping) {
  if (mapping.lines.value === undefined || mapping.lines.value.length === 0) {
    return ['x', 'y'];
  } else {
    var dimensions = resultMap
      .map((res) => parseObject(res.lines))
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
    dimensions.unshift('x');
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

const getXAxis = (visualOptions, xData, name, locale, mappedType) => {
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

  let data = _.groupBy(resultMap, 'lines');

  const lineSeries = getDimensions(resultMap, mapping)
    .filter((dimension) => dimension !== 'x')
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
        let y = value ? value.y : '';
        lineData.push([
            format(e, visualOptions.xAxisFormat, locale, mapping.x.mappedType),
            y,
        ]);
      });
      return {
        name: item,
        type: 'line',
        emphasis: { focus: 'series' },
        showSymbol: visualOptions.showPoints,
        symbolSize: visualOptions.dotsDiameter,
        color: colorValue,
        data: lineData,
        labelLayout: {
          hideOverlap: true,
        },
        endLabel: {
          show: visualOptions.endLabel,
          fontSize: visualOptions.endLabelSize,
          fontWeight: visualOptions.endLabelWeight ?? 'bold',
          formatter: (params) =>
            formatNumber(params.value[1], visualOptions.endLabelFormat, locale) + 
          (visualOptions.showUnits ? visualOptions.units : ''),
        },
        lineStyle: {
          width: visualOptions.lineWidth ?? 2
        },
        markPoint: {
          data: [
            visualOptions.endLabel
              ? {
                  type: 'last',
                  coord: [
                    mapping.x.mappedType === 'category'
                      ? lineData.length - 1
                      : lineData[lineData.length - 1][0],
                    lineData[lineData.length - 1][1],
                  ],
                  symbol: 'circle',
                  symbolSize: visualOptions.endLabelPointDiameter,
                }
              : {},
          ],
        },
        tooltip: {
          valueFormatter: (value) =>
            formatNumber(value, visualOptions.tooltipValueFormat, locale) +
            visualOptions.units,
        },
      };
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
      text: visualOptions.title,
    },
    legend: legend(visualOptions),
    backgroundColor: visualOptions.background,
    tooltip: {
      show: visualOptions.showTooltip,
      trigger: 'axis',
    }, //añadir a las opciones
    toolbox: toolbox(visualOptions.showToolbox),
    grid: grid(visualOptions),
    xAxis: getXAxis(
      visualOptions,
      xData,
      xAxisName,
      locale,
      mapping.x.mappedType
    ),
    yAxis: getYAxis(visualOptions, yAxisName, locale),
    series: [...lineSeries],
  };
}

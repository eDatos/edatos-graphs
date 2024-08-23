import _ from 'lodash';
import { format, parseObjectToValue } from '../utils/parseUtils';
import { grid, legend, toolbox } from '../baseChartOptions';
import { dateParsersPatterns } from '../../constants';

const getAxis = (
  showName,
  name,
  nameLocation,
  nameGap,
  scale,
  showaxisLabels,
  showaxisLabelsRotate,
  showaxisLabelsFontSize,
  axisFormat,
  mappedType,
  locale
) => {
  return {
    name: showName ? name : '',
    nameLocation: nameLocation,
    nameGap: nameGap,
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
    axisLabel: {
      show: showaxisLabels,
      rotate: showaxisLabelsRotate,
      fontSize: showaxisLabelsFontSize,
      formatter: (value) => {
        const type = dateParsersPatterns[axisFormat] ? 'date' : mappedType;
        return format(value, axisFormat, locale, type);
      },
    },
    scale: scale,
  };
};

const getSeries = (visualOptions, data, mapping, locale) => {
  let grouped = mapping.labels?.value[0]
    ? _.groupBy(data, mapping.labels.value[0])
    : data;
  return [...new Set(data.map((item) => item[mapping.labels?.value]))].map(
    (item) => {
      const myData = (item ? grouped[item] : grouped)
        .map((d) => [
          parseObjectToValue(d[mapping.x.value]),
          parseObjectToValue(d[mapping.y.value]),
        ])
        .reduce((accumulator, currentValue) => {
          let findIndex = accumulator.findIndex(
            (d) => d[0] === currentValue[0] && d[1] === currentValue[1]
          );
          if (findIndex < 0) {
            return [...accumulator, [currentValue[0], currentValue[1], 1]];
          } else {
            accumulator[findIndex][2] += 1;
          }
          return accumulator;
        }, []);
      return {
        name: item ? item : mapping.y.value[0],
        type: 'scatter',
        data: myData,
        symbolSize: (data) => data[2] + visualOptions.symbolSize,
        color: item
          ? visualOptions.colorScale.userScaleValues.find(
              (e) => e.domain === item
            )?.range
          : visualOptions.colorScale.userScaleValues[0].range,
        emphasis: {
          focus: 'series',
          label: {
            show: true,
            formatter: (param) => param.data[2],
            position: 'top',
          },
        },
        tooltip: {
          valueFormatter: (value) =>
            format(
              value,
              visualOptions.tooltipValueFormat,
              locale,
              mapping.y.mappedType
            ),
        },
      };
    }
  );
};

export const getChartOptions = function (
  visualOptions,
  datachart,
  mapping,
  dataTypes,
  dimensions,
  locale
) {
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
    },
    toolbox: toolbox(visualOptions.showToolbox),
    grid: grid(visualOptions),
    xAxis: getAxis(
      visualOptions.showXaxisName,
      xAxisName,
      visualOptions.xAxisNamePosition,
      visualOptions.xAxisNameGap,
      !visualOptions.xAxisOriginTo0,
      visualOptions.showXaxisLabels,
      visualOptions.showXaxisLabelsRotate,
      visualOptions.showXaxisLabelsFontSize,
      visualOptions.xAxisFormat,
      mapping.x.mappedType,
      locale
    ),
    yAxis: getAxis(
      visualOptions.showYaxisName,
      yAxisName,
      visualOptions.yAxisNamePosition,
      visualOptions.yAxisNameGap,
      !visualOptions.yAxisOriginTo0,
      visualOptions.showYaxisLabels,
      visualOptions.showYaxisLabelsRotate,
      visualOptions.showYaxisLabelsFontSize,
      visualOptions.yAxisFormat,
      mapping.y.mappedType,
      locale
    ),
    series: getSeries(visualOptions, datachart, mapping, locale),
  };
};

import { getDimensionAggregator } from '@rawgraphs/rawgraphs-core';
import { format, formatNumber } from '../utils/parseUtils';
import * as d3 from 'd3';
import { grayPalette, white } from '../../constants';
import { grid, legend, toolbox } from '../baseChartOptions';

const getSeries = (
  visualOptions,
  data,
  mapping,
  dataTypes,
  dimensions,
  locale
) => {
  const sizeAggregator = getDimensionAggregator(
    'size',
    mapping,
    dataTypes,
    dimensions
  );
  if (mapping.size === undefined) {
    mapping.size = {
      value: undefined,
    };
  }

  function getLevelOption() {
    return [
      {
        color: visualOptions.colorScale.userScaleValues.map((v) => v.range),
        itemStyle: {
          borderColor: visualOptions.gapColor,
          borderWidth: 0,
          gapWidth: visualOptions.gapWidth,
        },
        upperLabel: {
          show: false,
        },
      },
      {
        itemStyle: {
          borderColor: visualOptions.borderColor,
          borderWidth: visualOptions.borderWidth,
          gapWidth: visualOptions.gapWidth,
        },
        emphasis: {
          itemStyle: {
            borderColor: grayPalette[1],
          },
        },
      },
      {
        colorSaturation: [0.35, 0.5],
        itemStyle: {
          borderWidth: visualOptions.borderWidth,
          gapWidth: visualOptions.gapWidth,
          borderColorSaturation: 0.6,
        },
      },
    ];
  }

  function dataHierarchy(index, data) {
    const allValues = [...mapping.hierarchy.value];
    const hierarchy = allValues.splice(0, index + 1);
    let results = [];
    d3.rollups(
      data,
      (v) => {
        let children = [];
        if (index < mapping.hierarchy.value.length - 1) {
          const childrenData = data.filter(
            (d) => d[hierarchy[index]] === v[0][hierarchy[index]]
          );
          children = dataHierarchy(index + 1, childrenData);
        }
        const item = {
          name: format(
            v[0][hierarchy[index]],
            visualOptions.dateFormat,
            locale
          ),
          value:
            mapping.size.value && sizeAggregator[0]
              ? sizeAggregator[0](v.map((d) => d[mapping.size.value]))
              : v.length,
          path: hierarchy.reduce(
            (acc, curr) => (acc === '' ? curr : `${acc}/${curr}`),
            ''
          ),
          children: children,
        };
        results.push(item);
        return item;
      },
      ...hierarchy.map((level) => (d) => d[level])
    );
    return results;
  }

  return [
    {
      type: 'treemap',
      name: mapping.hierarchy.value[0],
      label: {
        show: visualOptions.showLabel,
        formatter: '{b}',
      },
      upperLabel: {
        show: visualOptions.showUpperLabel,
        height: 30,
      },
      itemStyle: {
        borderColor: white,
      },
      levels: getLevelOption(),
      data: dataHierarchy(0, data),
      tooltip: {
        valueFormatter: (value) =>
          formatNumber(value, visualOptions.tooltipValueFormat, locale) +
          visualOptions.units,
      },
    },
  ];
};

export const getChartOptions = function (
  visualOptions,
  datachart,
  mapping,
  dataTypes,
  dimensions,
  locale
) {
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
    grid: grid(visualOptions),
    toolbox: toolbox(visualOptions.showToolbox),
    series: getSeries(
      visualOptions,
      datachart,
      mapping,
      dataTypes,
      dimensions,
      locale
    ),
  };
};

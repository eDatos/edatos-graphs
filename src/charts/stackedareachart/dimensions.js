export const dimensions = [
  {
    id: 'x',
    name: 'global.section.chartselection.stackedareachart.dimensions.xAxis',
    operation: 'get',
    validTypes: ['number', 'string', 'date'],
    required: true,
  },

  {
    id: 'y',
    name: 'global.section.chartselection.stackedareachart.dimensions.yAxis',
    operation: 'get',
    validTypes: ['number'],
    required: true,
    aggregation: true,
    aggregationDefault: 'sum',
  },

  {
    id: 'series',
    name: 'global.section.chartselection.stackedareachart.dimensions.series',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
];

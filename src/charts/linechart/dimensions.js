export const dimensions = [
  {
    id: 'x',
    name: 'global.section.chartselection.linechart.dimensions.xAxis',
    operation: 'get',
    validTypes: ['number', 'string', 'date'],
    required: true,
  },

  {
    id: 'y',
    name: 'global.section.chartselection.linechart.dimensions.yAxis',
    operation: 'get',
    validTypes: ['number'],
    required: true,
    aggregation: true,
    aggregationDefault: 'sum',
  },

  {
    id: 'lines',
    name: 'global.section.chartselection.linechart.dimensions.lines',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
];

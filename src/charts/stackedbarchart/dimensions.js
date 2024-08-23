export const dimensions = [
  {
    id: 'stacks',
    name: 'global.section.chartselection.stackedbarchart.dimensions.axis',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },

  {
    id: 'bars',
    name: 'global.section.chartselection.stackedbarchart.dimensions.size',
    validTypes: ['number'],
    required: true,
    multiple: true,
    operation: 'get',
    aggregation: true,
    aggregationDefault: {
      number: 'sum',
    },
  },

  {
    id: 'series',
    name: 'global.section.chartselection.stackedbarchart.dimensions.series',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
];

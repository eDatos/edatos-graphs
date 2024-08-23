export const dimensions = [
  {
    id: 'bars',
    name: 'global.section.chartselection.barchart.dimensions.bars',
    validTypes: ['number', 'string', 'date'],
    required: true,
    operation: 'get',
  },

  {
    id: 'size',
    name: 'global.section.chartselection.barchart.dimensions.size',
    operation: 'get',
    validTypes: ['number'],
    required: false,
    aggregation: true,
    aggregationDefault: 'sum',
  },

  {
    id: 'series',
    name: 'global.section.chartselection.barchart.dimensions.series',
    validTypes: ['number', 'string', 'date'],
    required: false,
    operation: 'get',
  },
];

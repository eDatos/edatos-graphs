export const dimensions = [
  {
    id: 'hierarchy',
    name: 'global.section.chartselection.treemapchart.dimensions.hierarchy',
    validTypes: ['number', 'string', 'date'],
    required: true,
    operation: 'get',
    multiple: true,
  },
  {
    id: 'size',
    name: 'global.section.chartselection.treemapchart.dimensions.size',
    operation: 'get',
    validTypes: ['number'],
    required: false,
    aggregation: true,
    aggregationDefault: 'sum',
  },
];

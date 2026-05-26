export const dimensions = [
  {
    id: 'stacks',
    name: 'global.section.chartselection.pyramidchart.dimensions.axis',
    validTypes: ['string'],
    required: true,
    operation: 'get',
  },

  {
    id: 'bars',
    name: 'global.section.chartselection.pyramidchart.dimensions.size',
    validTypes: ['number'],
    required: true,
    multiple: false,
    operation: 'get',
    aggregation: true,
    aggregationDefault: 'sum',
  },

  {
    id: 'series',
    name: 'global.section.chartselection.pyramidchart.dimensions.series',
    validTypes: ['string'],
    required: true,
    operation: 'get',
  },
];

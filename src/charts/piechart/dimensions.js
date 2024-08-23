export const dimensions = [
  {
    id: 'arcs',
    name: 'global.section.chartselection.piechart.dimensions.arcs',
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
    name: 'global.section.chartselection.piechart.dimensions.series',
    validTypes: ['string'],
    required: false,
    operation: 'get',
  },
];

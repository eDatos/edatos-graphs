export const dimensions = [
  {
    id: 'x',
    name: 'global.section.chartselection.scatterchart.dimensions.xAxis',
    operation: 'get',
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'y',
    name: 'global.section.chartselection.scatterchart.dimensions.yAxis',
    operation: 'get',
    validTypes: ['number', 'date'],
    required: true,
  },
  {
    id: 'labels',
    name: 'global.section.chartselection.scatterchart.dimensions.labels',
    operation: 'get',
    required: false,
    validTypes: ['string'],
  },
];

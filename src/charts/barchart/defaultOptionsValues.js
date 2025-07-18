export function defaultOptionsValues(mapping) {
  if (mapping?.bars && mapping.bars.mappedType !== 'date') {
    if (mapping.series?.value?.length > 0) {
      return {
        barsOrientation: 'horizontal',
        sortBarsBy: 'name',
      };
    } else {
      return {
        barsOrientation: 'horizontal',
        sortBarsBy: 'totalAscending',
      };
    }
  }
  return {
    barsOrientation: 'vertical',
    sortBarsBy: 'name',
  };
}

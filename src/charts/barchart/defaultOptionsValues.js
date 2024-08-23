export function defaultOptionsValues(mapping) {
  if (mapping?.bars && mapping.bars.mappedType !== 'date') {
    return {
      barsOrientation: 'horizontal',
      sortBarsBy: 'totalAscending',
    };
  }
  return {
    barsOrientation: 'vertical',
    sortBarsBy: 'name',
  };
}

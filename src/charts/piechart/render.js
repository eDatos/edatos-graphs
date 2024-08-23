export function colorDomain(data, mapping) {
  let names = '';
  if (data && mapping.series?.value?.length > 0) {
    names = data
      .flatMap((item) =>
        item[mapping.arcs.value] > 0 ? item[mapping.series.value] : []
      )
      .filter((value, index, self) => self.indexOf(value) === index);
  } else {
    names = mapping.arcs.value;
  }
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  return {
    domain: names.map((e, index) => `${zeroPad(index + 1, 2)}`),
    type: 'number',
  };
}

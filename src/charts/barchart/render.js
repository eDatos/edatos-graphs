export function colorDomain(data, mapping) {
  let domain = '';
  if (data && mapping.series?.value?.length > 0) {
    domain = data
      .map((item) => item[mapping.series.value])
      .filter((value, index, self) => self.indexOf(value) === index);
  } else if (data && mapping.bars) {
    domain = mapping.bars.value;
  }
  return {
    domain,
    type: 'string',
  };
}

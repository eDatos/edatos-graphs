export function colorDomain(data, mapping, visualOptions) {
  let domain = '';
  if (data && mapping.series?.value?.length > 0) {
    domain = [];
    let stacks = data
      .map((item) => item[mapping.series.value])
      .filter((value, index, self) => self.indexOf(value) === index);
    mapping.bars.value.forEach((bar) => {
      stacks.forEach((stack) => {
        domain.push(stack);
      });
    });
  } else if (data && mapping.bars) {
    domain = mapping.bars.value;
  }
  return {
    domain,
    type: 'string',
  };
}

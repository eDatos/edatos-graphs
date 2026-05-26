export function colorDomain(data, mapping) {
  let domain = [];
  if (data && mapping.series?.value && mapping.series.value?.length > 0) {
    data.forEach((e) => {
      let value = e[mapping.series.value];
      if (domain.indexOf(value) === -1) {
        domain.push(value);
      }
    });
  } else if (data && mapping.x) {
    domain = mapping.x.value;
  }
  return {
    domain,
    type: 'string',
  };
}

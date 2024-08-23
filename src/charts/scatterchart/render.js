export function colorDomain(data, mapping) {
  let domain = [];
  if (data && mapping.labels?.value && mapping.labels.value?.length > 0) {
    data.forEach((e) => {
      let value = e[mapping.labels.value];
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

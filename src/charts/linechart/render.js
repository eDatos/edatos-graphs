export function colorDomain(data, mapping) {
  let domain = [];
  if (data && mapping.lines?.value && mapping.lines.value?.length > 0) {
    data.forEach((e) => {
      let value = e[mapping.lines.value];
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

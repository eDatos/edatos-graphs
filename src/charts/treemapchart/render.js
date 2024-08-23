export function colorDomain(data, mapping) {
  let names = '';
  if (data && mapping.hierarchy?.value && mapping.hierarchy.value?.length > 0) {
    const sizeDimension = mapping.size?.value[0];
    names = [];
    data.forEach((element) => {
      let value = element[mapping.hierarchy.value[0]];
      const size = sizeDimension ? element[sizeDimension] : 1;
      if (names.indexOf(value) === -1 && size > 0) {
        names.push(value);
      }
    });
  }
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  return {
    domain: names.map((e, index) => `${zeroPad(index + 1, 2)}`),
    type: 'string',
  };
}

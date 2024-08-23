const readConfig = async (baseUrl, name) => {
  const res = await fetch(`${baseUrl}${name}`);
  return await res.json();
};

export const applicationConfig = (baseUrl = '') => {
  return readConfig(baseUrl, 'application.json');
};

export const applicationSampleDatasets = () => {
  return readConfig('', 'sample-datasets.json');
};

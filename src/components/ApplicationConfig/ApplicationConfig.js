const readConfig = async (baseUrl, name) => {
  const res = await fetch(`${baseUrl}${name}`);
  return await res.json();
};

export const applicationConfig = (baseUrl = '') => {
  return readConfig(baseUrl, 'application.json');
};

export const version = (baseUrl = '') => {
  return readConfig(baseUrl, 'version.json');
};

export const applicationSampleDatasets = (client = 'ISTAC') => {
  return readConfig('', `sample-datasets/${client}/sample-datasets.json`);
};

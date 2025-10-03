import { applicationConfig } from '../components/ApplicationConfig/ApplicationConfig';

export default async function apiKey() {
  const applicationConfigJson = await applicationConfig();
  const requestOptions = {
    method: 'GET',
    headers: { Accept: 'application/json' },
  };

  const response  = await fetch(
    applicationConfigJson['metadata']['endpoint'] +
      '/properties/' +
      applicationConfigJson['metadata']['edatosGraphApiKey'],
    requestOptions
  );
  return await response.json();
}

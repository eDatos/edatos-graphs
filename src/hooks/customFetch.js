import apiKey from './apiKey'

export const customFetch = async (url, options = {}) => {
  const defaultHeaders = {
    'api-key': await apiKey(),
    'Content-Type': 'application/json',
  };

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers, // permite sobreescribir si es necesario
    },
  };

  const response = await fetch(url, mergedOptions);
    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }
    return response;
};
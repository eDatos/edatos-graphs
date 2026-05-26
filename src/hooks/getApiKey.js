import { applicationConfig } from '../components/ApplicationConfig/ApplicationConfig';
import axios from 'axios';

let apiKey = null;
export default async function getApiKey() {
  if (apiKey !== null) {
    return apiKey;
  }
  const applicationConfigJson = await applicationConfig();
  const response = await axios.get(
    applicationConfigJson['metadata']['endpoint'] +
      '/properties/' +
      applicationConfigJson['metadata']['edatosGraphApiKey']
  );
  
  apiKey = await response.data['value'];
  return apiKey;
}

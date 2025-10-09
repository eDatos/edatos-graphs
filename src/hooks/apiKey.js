import { applicationConfig } from '../components/ApplicationConfig/ApplicationConfig';
import axios from 'axios';

export default async function apiKey() {
  const applicationConfigJson = await applicationConfig();
  const response = await axios.get(
    applicationConfigJson['metadata']['endpoint'] +
      '/properties/' +
      applicationConfigJson['metadata']['edatosGraphApiKey']
  );
  
  return await response.data['value'];
}

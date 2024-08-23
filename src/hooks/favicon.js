import { applicationConfig } from '../components/ApplicationConfig/ApplicationConfig';
import axios from 'axios';

export default async function favicon() {
  const favicon = document.getElementById('favicon');
  const applicationConfigJson = await applicationConfig();
  const response = await axios.get(
    applicationConfigJson['metadata']['endpoint'] +
      '/properties/' +
      applicationConfigJson['metadata']['faviconPathKey']
  );
  favicon.href = response.data['value'];
}

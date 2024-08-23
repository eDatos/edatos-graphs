import React, { useEffect, useRef } from 'react';
import { applicationConfig } from '../ApplicationConfig/ApplicationConfig';

export default function Footer(props) {
  const divRef = useRef(null);

  async function fetchHtml(chosenLocale) {
    const requestOptions = {
      method: 'GET',
      headers: { Accept: 'application/json' },
    };
    const applicationConfigJson = await applicationConfig();
    const responseFooterURL = await fetch(
      applicationConfigJson['metadata']['endpoint'] +
        '/properties/' +
        applicationConfigJson['metadata']['footerPathKey'],
      requestOptions
    );
    const footerUrlData = await responseFooterURL.json();

    return await (
      await fetch(
        footerUrlData['value'] + '?chosenLocale=' + chosenLocale,
        requestOptions
      )
    ).text();
  }
  useEffect(() => {
    const { current } = divRef;

    fetchHtml(props.value).then((htmlContent) => {
      const slotHtml = document
        .createRange()
        .createContextualFragment(htmlContent); // Create a 'tiny' document and parse the html string
      current.innerHTML = ''; // Clear the container
      current.append(slotHtml); // Append the new content
    });
  }, [props.value]);
  return <div ref={divRef}></div>;
}

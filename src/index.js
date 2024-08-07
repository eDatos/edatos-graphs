import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import './i18n';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';
import { HeadProvider } from 'react-head';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  <React.StrictMode>
    <HeadProvider>
      <CookiesProvider>
        <React.Suspense fallback="loading">
          <App />
        </React.Suspense>
      </CookiesProvider>
    </HeadProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

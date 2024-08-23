import React from 'react';
import ReactDOM from 'react-dom/client';
import EDatosGraph from './components/echart';
import EDatosWMS from './components/wms';
import './index.css';

export default {
  widgets: {
    egraph: {
      render: (config) => {
        const selector = ReactDOM.createRoot(
          document.querySelector(config.selector)
        );
        selector.render(
          <React.StrictMode>
            <EDatosGraph
              source={config.source}
              chartIndex={config.chartIndex}
              visualOptions={config.visualOptions}
              mapping={config.mapping}
              dataTypes={config.dataTypes}
              dimensions={config.dimensions}
              data={config.data}
              locale={config.locale}
              decimalsSeparator={config.decimalsSeparator}
              thousandsSeparator={config.thousandsSeparator}
            />
          </React.StrictMode>
        );
      },
      unmount: (config) => {
        const selector = ReactDOM.createRoot(
          document.querySelector(config.selector)
        );
        selector.unmount();
      },
    },
    wms: {
      render: (config) => {
        const selector = ReactDOM.createRoot(
          document.querySelector(config.selector)
        );
        selector.render(
          <React.StrictMode>
            <EDatosWMS
              sources={config.sources}
              center={config.center}
              zoom={config.zoom}
              baseUrl={config.baseUrl}
            />
          </React.StrictMode>
        );
      },
      unmount: (config) => {
        const selector = ReactDOM.createRoot(
          document.querySelector(config.selector)
        );
        selector.unmount();
      },
    },
  },
};

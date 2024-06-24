import React, { useCallback, useEffect, useState } from 'react';
import { Col, Dropdown, Form } from 'react-bootstrap';
import uuid from 'react-uuid';
import { CustomToggle } from '../CustomDropdown/CustomDropdownToggle';
import { CopyToClipboardButton } from '../CopyToClipboardButton';
import { t } from 'i18next';
import styles from '../DataLoader/DataLoader.module.scss';
import classNames from 'classnames';

function downloadBlob(url, filename) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // Create a new anchor element
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  a.click();
  return a;
}

export default function Exporter({
  rawViz,
  exportProject,
  userData,
  dataSource,
  chartIndex,
  mapping,
  visualOptions,
  dataTypes,
  dimensions,
  locale,
  decimalsSeparator,
  thousandsSeparator,
  map,
}) {
  const download = useCallback(
    (filename, format) => {
      downloadBlob(rawViz.getDataURL({ type: format }), filename);
    },
    [rawViz]
  );

  const downloadProject = useCallback(
    async (filename) => {
      const project = await exportProject();
      const str = JSON.stringify(project);
      const blob = new Blob([str], { type: 'application/json' });
      const DOMURL = window.URL || window.webkitURL || window;
      const url = DOMURL.createObjectURL(blob);
      downloadBlob(url, filename);
      DOMURL.revokeObjectURL(url);
    },
    [exportProject]
  );

  const [exportFormats, setExportFormats] = useState(['edatosgraphs']);
  const [currentFormat, setCurrentFormat] = useState(null);
  const [currentFile, setCurrentFile] = useState('viz');
  const [dynamicLoadWidget, setDynamicLoadWidget] = useState(true);
  const [position, setPosition] = useState(() => map?.getCenter());
  const [mapZoom, setMapZoom] = useState(() => map?.getZoom());

  const handleOnChangeDynamicLoadWidget = () => {
    setDynamicLoadWidget(!dynamicLoadWidget);
  };
  const downloadViz = useCallback(() => {
    switch (currentFormat.format) {
      case 'svg':
        download(`${currentFile}.svg`, 'svg');
        break;
      case 'png':
        download(`${currentFile}.png`, 'png');
        break;
      case 'jpg':
        download(`${currentFile}.jpg`, 'jpg');
        break;
      case 'edatosgraphs':
        downloadProject(`${currentFile || 'viz'}.edatosgraphs`);
        break;
      default:
        break;
    }
  }, [currentFile, currentFormat, download, downloadProject]);

  const getWidgetHeader = (generatedUUID) =>
    `<div id="chart-container-${generatedUUID}"></div>
<script src="${window.location.href}widget/widget.js"></script>`;

  function getWidget(type) {
    const generatedUUID = uuid();

    const props =
      type === 'wms'
        ? getWmsWidgetProps(generatedUUID)
        : getEGraphWidgetProps(generatedUUID);
    return `${getWidgetHeader(generatedUUID)}
<script>
   EdatosGraphs.widgets.${type}.render(${JSON.stringify(props)});
</script>`;
  }

  function getWmsWidgetProps(generatedUUID) {
    return {
      selector: '#chart-container-' + generatedUUID,
      sources: dataSource.sources.flatMap((source) => [
        { url: source.url, selectedLayers: source.selectedLayers },
      ]),
      center: [position.lat, position.lng],
      zoom: mapZoom,
      baseUrl: window.location.href,
    };
  }

  function getEGraphWidgetProps(generatedUUID) {
    const dataMappings = Object.keys(mapping)
      .map((key) => mapping[key].value)
      .flat(1)
      .filter(Boolean);

    function getFilteredUserData() {
      return userData.map((entry) =>
        Object.keys(entry)
          .filter((key) => dataMappings.includes(key))
          .reduce((obj, key) => {
            obj[key] = entry[key];
            return obj;
          }, {})
      );
    }

    function getFilteredDataTypes() {
      return Object.fromEntries(
        Object.entries(dataTypes).filter(([key]) => dataMappings.includes(key))
      );
    }

    return {
      selector: '#chart-container-' + generatedUUID,
      renderer: visualOptions.render,
      chartIndex: chartIndex,
      locale: locale,
      decimalsSeparator: decimalsSeparator,
      thousandsSeparator: thousandsSeparator,
      source: dataSource,
      visualOptions: visualOptions,
      mapping: mapping,
      dataTypes: getFilteredDataTypes(),
      dimensions: dimensions,
      data: !dynamicLoadWidget || !dataSource?.url ? getFilteredUserData() : [],
    };
  }

  useEffect(() => {
    const baseExportFormat = [
      {
        format: 'widget',
        text: 'global.section.export.formats.widget',
        icon: 'fa-code',
      },
    ];
    if (dataSource.type !== 'wms') {
      const baseExportFormats = [
        ...baseExportFormat,
        {
          format: 'edatosgraphs',
          text: 'global.section.export.formats.edatosgraphs',
          icon: 'fa-square-poll-vertical',
        },
      ];
      const newExportFormats =
        visualOptions.render === 'svg'
          ? [
              ...baseExportFormats,
              {
                format: 'svg',
                text: 'global.section.export.formats.svg',
                icon: 'fa-file-svg',
              },
            ]
          : [
              ...baseExportFormats,
              {
                format: 'png',
                text: 'global.section.export.formats.png',
                icon: 'fa-file-png',
              },
              {
                format: 'jpg',
                text: 'global.section.export.formats.jpg',
                icon: 'fa-file-jpg',
              },
            ];
      setExportFormats(newExportFormats);
    } else {
      setExportFormats(baseExportFormat);
      setCurrentFormat(baseExportFormat[0]);
    }
  }, [visualOptions.render, dataSource.type]);

  const onMapMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  const onMapZoom = useCallback(() => {
    setMapZoom(map.getZoom());
  }, [map]);

  useEffect(() => {
    map?.on('move', onMapMove);
    map?.on('zoom', onMapZoom);
    return () => {
      map?.off('move', onMapMove);
      map?.off('zoom', onMapZoom);
    };
  }, [map, onMapMove, onMapZoom]);

  return (
    <div className={classNames(styles['export-content'])}>
      <Col xl={12} className={styles['file']}>
        <input
          type="text"
          className={classNames(styles['borderBox'], 'form-control')}
          value={currentFile}
          onChange={(e) => setCurrentFile(e.target.value)}
        ></input>
        <Dropdown className="raw-dropdown button" align="end">
          <Dropdown.Toggle
            as={CustomToggle}
            className="text-icon-button btn-thin-default d-flex align-items-center"
          >
            {currentFormat ? (
              <>
                <i className={classNames(currentFormat.icon, 'fa-thin')}></i>
                {t(currentFormat.text).toUpperCase()}
              </>
            ) : (
              t('global.section.export.formats.title').toUpperCase()
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            {exportFormats.map((d) => {
              return (
                <Dropdown.Item
                  className="d-flex align-items-center"
                  as="button"
                  key={d.value}
                  onClick={() => {
                    setCurrentFormat(d);
                  }}
                >
                  <i className={classNames(d.icon, 'fa-thin')}></i>
                  <span>{t(d.text).toUpperCase()}</span>
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      {currentFormat?.format === 'widget' &&
        dataSource.url &&
        dataSource.type !== 'wms' && (
          <div className="col col-sm-12">
            <Form.Check
              id="dynamicLoadWidget"
              type="checkbox"
              className="d-flex align-items-center custom-control custom-checkbox"
            >
              <Form.Check.Input
                checked={dynamicLoadWidget}
                className="custom-control-input"
                onChange={() => {
                  handleOnChangeDynamicLoadWidget();
                }}
              />
              <Form.Check.Label className={classNames('custom-control-label')}>
                {t('global.section.export.graph.dynamicWidget')}
              </Form.Check.Label>
            </Form.Check>
          </div>
        )}

      {currentFormat?.format === 'widget' && (
        <div className="col cos-sm-12">
          <textarea
            value={getWidget(dataSource.type !== 'wms' ? 'egraph' : 'wms')}
            className="form-control"
            readOnly
          />
        </div>
      )}

      {currentFormat && (
        <Col xs={6} xl={12}>
          <div className="general-buttons row">
            {currentFormat.format !== 'widget' && (
              <button
                className="text-icon-button btn-thin-default d-flex align-items-center"
                type="button"
                onClick={downloadViz}
              >
                <i className="fa-thin fa-download"></i>
                <span>{t('global.download').toUpperCase()}</span>
              </button>
            )}
            {currentFormat.format === 'widget' && (
              <CopyToClipboardButton content={getWidget(dataSource.type)} />
            )}
            {/*<button className="text-icon-button btn-thin-default d-flex align-items-center" type="button" onClick={//TODO nueva funcionalidad (en siguiente fase)}>
                                <i className="fa-thin fa-save"></i>
                                <span>{t('global.save').toUpperCase()}</span>
                            </button>*/}
          </div>
        </Col>
      )}
    </div>
  );
}

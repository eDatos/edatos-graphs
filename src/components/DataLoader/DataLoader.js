import { get } from 'lodash';
import React, { useCallback, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import DataGrid from '../DataGrid/DataGrid';
import DataSamples from '../DataSamples/DataSamples';
import JsonViewer from '../JsonViewer';
import ParsingOptions from '../ParsingOptions';
import LoadProject from './loaders/LoadProject';
import Paste from './loaders/Paste';
import UploadFile from './loaders/UploadFile';
import UrlFetch from './loaders/UrlFetch';
import Loading from './loading';
import WarningMessage from '../WarningMessage';
import DataMismatchModal from './DataMismatchModal';
import { tsvFormat } from 'd3-dsv';
import { CopyToClipboardButton } from '../CopyToClipboardButton';
import { Trans, useTranslation } from 'react-i18next';
import EDatosFetch from './loaders/EDatosFetch';
import WMSFetch from './loaders/WMSFetch';
import { ResetButton } from '../ResetButton';
import { fetchData as fetchDataFromUrl } from './loaders/UrlFetch';
import { fetchData as fetchDataFromSparql } from './loaders/SparqlFetch';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

function DataLoader({
  userInput,
  setUserInput,
  userData,
  userDataType,
  parseError,
  unstackedColumns,
  separator,
  setSeparator,
  thousandsSeparator,
  setThousandsSeparator,
  decimalsSeparator,
  setDecimalsSeparator,
  locale,
  setLocale,
  stackDimension,
  dataSource,
  setDataSource,
  data,
  loading,
  coerceTypes,
  loadSample,
  handleInlineEdit,
  handleStackOperation,
  setJsonData,
  resetDataLoader,
  dataLoaderMode,
  startDataReplace,
  cancelDataReplace,
  commitDataReplace,
  replaceRequiresConfirmation,
  hydrateFromProject,
  initialState
}) {
  const handle = useFullScreenHandle();
  const [loadingError, setLoadingError] = useState();
  const [reloading, setReloading] = useState(false);
  const dataRefreshWorkers = {
    url: fetchDataFromUrl,
    sparql: fetchDataFromSparql,
  };
  const refreshData = async () => {
    setReloading(true);
    const dataRefreshImpl = dataRefreshWorkers[get(dataSource, 'type', '')];
    const data = await dataRefreshImpl(dataSource);
    setUserInput(data, dataSource);
    setReloading(false);
  };

  const options = [
    {
      id: 'eDatos',
      loader: [
        <EDatosFetch
          setUserInput={(rawInput, source) => setUserInput(rawInput, source)}
        />,
        <DataSamples
          onSampleReady={loadSample}
          setLoadingError={setLoadingError}
        />,
      ],
      allowedForReplace: true,
    },
    {
      id: 'files',
      loader: [
        <Paste
          userInput={userInput}
          setUserInput={(rawInput) => setUserInput(rawInput, { type: 'paste' })}
          setLoadingError={setLoadingError}
        />,
        <UploadFile
          userInput={userInput}
          setUserInput={(rawInput) =>
            setUserInput(rawInput, { type: 'upload' })
          }
          setLoadingError={setLoadingError}
        />,
      ],
      allowedForReplace: true,
    },
    {
      id: 'project',
      loader: (
        <LoadProject
          onProjectSelected={hydrateFromProject}
          setLoadingError={setLoadingError}
        />
      ),
      disabled: true,
      allowedForReplace: true,
    },
    {
      id: 'url',
      loader: (
        <UrlFetch
          userInput={userInput}
          setUserInput={(rawInput, source) => setUserInput(rawInput, source)}
          setLoadingError={setLoadingError}
        />
      ),
      allowedForReplace: true,
    },
    {
      id: 'WMS',
      loader: (
        <WMSFetch setDataSource={setDataSource} sources={dataSource?.sources} />
      ),
      allowedForReplace: false,
    },
  ];
  const selectedOption = options.filter(
    (option) => option.id === initialState
  )[0];
  const { t } = useTranslation(['translation']);

  let mainContent;
  if (userData && data) {
    mainContent = (
      <DataGrid
        userDataset={userData}
        errors={data.errors}
        dataTypes={data.dataTypes}
        coerceTypes={coerceTypes}
        onDataUpdate={handleInlineEdit}
      />
    );
  } else if (userDataType === 'json' && userData === null) {
    mainContent = (
      <JsonViewer
        context={JSON.parse(userInput)}
        selectFilter={(ctx) => Array.isArray(ctx)}
        onSelect={(ctx, path) => {
          setJsonData(ctx, path);
        }}
      />
    );
  } else if (loading && !data) {
    mainContent = <Loading />;
  } else {
    mainContent = (
      <>
        {selectedOption.loader}
        <p className="mt-3">{selectedOption.message}</p>
      </>
    );
  }

  // #TODO: memoize/move to component?
  function parsingErrors(data) {
    const errors = get(data, 'errors', []);
    const successRows = data.dataset.length - errors.length;
    const row = errors[0].row + 1;
    const column = Object.keys(errors[0].error)[0];
    return (
      <span>
        {t('global.section.loaddata.errors.check')}{' '}
        <span className="font-weight-bold">
          {t('global.section.loaddata.errors.row')} {row}{' '}
        </span>
        {t('global.section.loaddata.errors.column')}{' '}
        <span className="font-weight-bold">{column}</span>.{' '}
        {errors.length === 2 && (
          <>
            {' '}
            {t('global.section.loaddata.errors.issueRow')}{' '}
            <span className="font-weight-bold">{errors[1].row + 1}</span>.{' '}
          </>
        )}
        {errors.length > 2 && (
          <>
            {' '}
            {t('global.section.loaddata.errors.issues')}{' '}
            <span className="font-weight-bold">{errors.length - 1}</span>{' '}
            {t('global.section.loaddata.errors.rows')}.{' '}
          </>
        )}
        {successRows > 0 && (
          <>
            {t('global.section.loaddata.errors.remaining')}{' '}
            <span className="font-weight-bold">
              {successRows} {t('global.section.loaddata.errors.row')}
              {successRows > 1 && <>s</>}
            </span>{' '}
            {t('global.section.loaddata.errors.look')}
            {successRows === 1 && <>s</>}{' '}
            {t('global.section.loaddata.errors.fine')}.
          </>
        )}
      </span>
    );
  }

  const reloadRAW = useCallback(() => {
    window.location.replace(window.location.pathname);
  }, []);

  resetDataLoader = { reloadRAW };

  const copyToClipboardButton = !!userData ? (
    <CopyToClipboardButton content={tsvFormat(userData)} />
  ) : null;

  const resetButton = !!userData ? <ResetButton /> : null;

  return (
    <>
      <FullScreen handle={handle}>
        <Row className="main-content">
          {userData && (
            <Col xs={10} lg={12} className="d-flex flex-column py-top-20">
              <div className="general-buttons row buttons-container">
                {resetButton}
                {get(dataRefreshWorkers, get(dataSource, 'type', ''), null) && (
                  <button
                    className="text-icon-button btn-thin-first"
                    type="button"
                    onClick={refreshData}
                    disabled={reloading}
                  >
                    <i
                      className={
                        'fa-thin fa-rotate ' + (reloading ? 'fa-spin' : '')
                      }
                    ></i>
                    <span>
                      {reloading
                        ? ' ' + t('global.reloadingdata').toUpperCase()
                        : t('global.refreshdata').toUpperCase()}
                    </span>
                  </button>
                )}

                {copyToClipboardButton}

                {!handle.active && (
                  <button
                    className="text-icon-button btn-thin-default"
                    type="button"
                    onClick={handle.enter}
                  >
                    <i className="fa-thin fa-arrow-up-right-and-arrow-down-left-from-center"></i>
                    <span>{t('global.maximize').toUpperCase()}</span>
                  </button>
                )}
                {handle.active && (
                  <button
                    className="text-icon-button btn-thin-default"
                    type="button"
                    onClick={handle.exit}
                  >
                    <i className="fa-thin fa-arrow-down-left-and-arrow-up-right-to-center"></i>
                    <span>{t('global.minimize').toUpperCase()}</span>
                  </button>
                )}
              </div>

              <ParsingOptions
                locale={locale}
                setLocale={setLocale}
                separator={separator}
                setSeparator={setSeparator}
                thousandsSeparator={thousandsSeparator}
                setThousandsSeparator={setThousandsSeparator}
                decimalsSeparator={decimalsSeparator}
                setDecimalsSeparator={setDecimalsSeparator}
                dimensions={data ? unstackedColumns || data.dataTypes : []}
                stackDimension={stackDimension}
                setStackDimension={handleStackOperation}
                userDataType={userDataType}
                dataSource={dataSource}
                onDataRefreshed={(rawInput) =>
                  setUserInput(rawInput, dataSource)
                }
              />
            </Col>
          )}
          <Col xs={10} lg={12} className="data-loader">
            {mainContent}

            {data && !parseError && get(data, 'errors', []).length === 0 && (
              <WarningMessage
                variant="light"
                message={
                  <Trans
                    i18nKey="global.message.loadrows.succes"
                    values={{
                      rowsnumber: data.dataset.length,
                      cellsnumber:
                        data.dataset.length *
                        Object.keys(data.dataTypes).length,
                    }}
                  ></Trans>
                }
              />
            )}

            {parseError && (
              <WarningMessage variant="danger" message={parseError} />
            )}

            {get(data, 'errors', []).length > 0 && (
              <WarningMessage variant="warning" message={parsingErrors(data)} />
            )}

            {loadingError && (
              <WarningMessage variant="danger" message={loadingError} />
            )}
          </Col>
        </Row>
        {replaceRequiresConfirmation && (
          <DataMismatchModal
            replaceRequiresConfirmation={replaceRequiresConfirmation}
            commitDataReplace={commitDataReplace}
            cancelDataReplace={cancelDataReplace}
          />
        )}
      </FullScreen>
    </>
  );
}

export default React.memo(DataLoader);

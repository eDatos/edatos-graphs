import React, { useCallback, useState } from 'react';
import { Col, Row, Form, Dropdown } from 'react-bootstrap';
import { CustomToggle } from '../../CustomDropdown/CustomDropdownToggle';
import { LoadDataButton } from '../../LoadDataButton';
import { useTranslation } from 'react-i18next';
import styles from '../DataLoader.module.scss';
import classNames from 'classnames';

export async function fetchData(url, acceptHeader = 'text/csv') {
  const response = await fetch(url, {
    method: 'GET',
    headers: { Accept: acceptHeader },
  });
  return await response.text();
}

export default function UrlFetch({
  userInput,
  setUserInput,
  setLoadingError,
  initialState = null,
}) {
  const [url, setUrl] = useState(initialState?.url);
  const [acceptHeader, setAcceptHeader] = useState('text/csv');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(['translation']);
  const options = ['text/csv', 'text/tab-separated-values'];

  const fetchUrl = useCallback(
    async (url) => {
      const source = { type: 'url', url, acceptHeader };
      setLoading(true);
      let data;
      try {
        data = await fetchData(url, acceptHeader);
        setUserInput(data, source);
        setLoadingError(null);
      } catch (e) {
        setLoadingError('Loading error. ' + e.message);
      }
      setLoading(false);
    },
    [setLoadingError, setUserInput, acceptHeader]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      fetchUrl(url);
      return false;
    },
    [url, fetchUrl]
  );

  return (
    <>
      <div className={`d-flex ${styles['options-section']}`}>
        <span className={styles['options-section-text']}>
          {t('global.section.loaddata.url.message')}
        </span>
      </div>
      <form
        onSubmit={handleSubmit}
        className={[styles.form, 'd-flex flex-column py-top-10'].join(' ')}
      >
        <Row>
          <Col xs={3}>
            <Dropdown className="raw-dropdown">
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
                className={classNames(
                  styles['borderBox'],
                  'd-flex align-items-center justify-content-between form-control'
                )}
              >
                <span>{acceptHeader}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.values(options).map((option) => {
                  return (
                    <Dropdown.Item
                      key={option}
                      onClick={() => {
                        setAcceptHeader(option);
                      }}
                    >
                      {option}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Label className={styles['lighter']}>Url</Form.Label>
            <input
              className={classNames('form-control', styles['borderBox'])}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </Col>
        </Row>
        <div className="row general-buttons">
          <LoadDataButton disabled={!url || loading} loading={loading} />
          {/*<button
                        className="text-icon-button btn-thin-cancel"
                        disabled={!url || loading}
                        type="button" onClick={ //TODO nueva funcionalidad (en siguiente fase) }
                    >
                        <i className="fa-thin fa-eraser"></i>
                        {t('global.section.loaddata.url.clearFieldsButton').toUpperCase()}
                    </button>*/}
        </div>
      </form>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import styles from './DataSamples.module.scss';
import { useTranslation } from 'react-i18next';
import { applicationSampleDatasets } from '../ApplicationConfig/ApplicationConfig';

export default function DataSamples({ onSampleReady, setLoadingError }) {
  const { t } = useTranslation();
  const [samplesList, setSamplesList] = useState([]);
  useEffect(() => {
    applicationSampleDatasets().then((json) => setSamplesList(json));
  }, [setSamplesList]);

  const select = async (sample) => {
    const { delimiter, url } = sample;
    let response;
    try {
      response = await fetch(url);
    } catch (e) {
      setLoadingError('Loading error. ' + e.message);
      return;
    }
    const text = await response.text();
    onSampleReady(text, delimiter);
    setLoadingError(null);
  };
  return (
    <>
      <div className={[styles['container-samples']]}>
        <span className={[styles['title-samples']]}>
          {t('global.section.loaddata.sample.name')}
        </span>

        <Row>
          {samplesList.map((d, i) => {
            return (
              <Col
                xs={12}
                lg={4}
                xl={4}
                key={i}
                className={`custom-card-container ${styles['card-sample']}`}
              >
                <Card className="custom-card cursor-pointer h-100">
                  <Card.Body
                    onClick={() => {
                      select(d);
                    }}
                    className="d-flex flex-column"
                  >
                    <Card.Title>
                      <h2 className="">{t(d.name)}</h2>
                      <span className="m-0">{t(d.category)}</span>
                    </Card.Title>
                    <a
                      href={d.sourceURL}
                      className={[styles['dataset-source']].join(' ')}
                    >
                      {t('global.section.sampleData.source')}: {d.sourceName}
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}

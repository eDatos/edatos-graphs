import React from 'react';
import classNames from 'classnames';
import { Row, Col, Card } from 'react-bootstrap';
import styles from './ChartSelector.module.scss';
import { useTranslation } from 'react-i18next';

function ChartSelector({ availableCharts, currentChart, setCurrentChart }) {
  const charts = availableCharts;
  const { t } = useTranslation(['translation']);
  return (
    <>
      <Row>
        <Col xs={3} className={styles.currentChartContainer}>
          {currentChart && (
            <Card className={classNames(styles.currentChart, 'custom-card')}>
              <Card.Img variant="top" src={currentChart.metadata.thumbnail} />
              <Card.Body>
                <Card.Title>
                  <span className={styles.chartTitle}>
                    {t(currentChart.metadata.name).toUpperCase()}
                  </span>
                </Card.Title>
                <Card.Subtitle className="m-0">
                  <span className={styles.chartSubtitle}>
                    {currentChart.metadata.category}
                  </span>
                </Card.Subtitle>
                <Card.Text className={styles.chartText}>
                  {t(currentChart.metadata.description)}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col className="py-top-10">
          <Row>
            {charts.map((d, i) => {
              const categories = d.metadata.categories.map((s) => t(s));
              return (
                <Col
                  xs={4}
                  key={'chart-' + i}
                  className={`custom-card-container `}
                >
                  <Card
                    onClick={() => {
                      setCurrentChart(d);
                    }}
                    className={classNames(
                      'flex-row h-100 cursor-pointer custom-card',
                      {
                        active: d === currentChart ? 'active' : '',
                        [styles.customChart]: !!d.rawCustomChart,
                      }
                    )}
                  >
                    <div className={`h-100 py-3 image ${styles.thumbnail}`}>
                      <i className={`fa-thin ${d.metadata.icon}`}></i>
                    </div>
                    <Card.Body className="px-3 py-3 d-flex flex-column">
                      <Card.Title className="m-0">
                        <span className={styles.chartTitle}>
                          {t(d.metadata.name)}
                        </span>
                      </Card.Title>
                      <Card.Subtitle className="m-0">
                        <span className={styles.chartText}>
                          {categories.join(', ').charAt(0).toUpperCase() +
                            categories.join(', ').slice(1)}
                        </span>
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default React.memo(ChartSelector);

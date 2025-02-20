import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ChartOptions from '../ChartOptions';
import ChartPreview from '../ChartPreview';

const ChartPreviewWithOptions = ({
  chart,
  dataset,
  dataTypes,
  mapping,
  visualOptions,
  setVisualOptions,
  setRawViz,
  setSelectedSeries
}) => {
  const [error, setError] = useState({
    variant: 'secondary',
    message: 'Required chart variables',
  });

  return (
    <Row>
      <Col xs={4} xl={3} className="py-top-20 py-bottom-10">
        <ChartOptions
          chart={chart}
          dataset={dataset}
          mapping={mapping}
          dataTypes={dataTypes}
          visualOptions={visualOptions}
          setVisualOptions={setVisualOptions}
          error={error}
        />
      </Col>
      <Col xs={8} xl={9} className="py-top-20 px-left-20">
        <ChartPreview
          chart={chart}
          dataset={dataset}
          mapping={mapping}
          visualOptions={visualOptions}
          error={error}
          setError={setError}
          setRawViz={setRawViz}
          setSelectedSeries={setSelectedSeries}
        />
      </Col>
    </Row>
  );
};

export default ChartPreviewWithOptions;

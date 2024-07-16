import React from 'react';
import { Col, Row } from 'react-bootstrap';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import EgraphMapContainer from './EgraphMapContainer';

function WMSMap(props) {
  return (
    <Row>
      <Col className="py-top-20">
        <EgraphMapContainer setMap={props.setMap} sources={props.sources} />
      </Col>
    </Row>
  );
}

export default WMSMap;

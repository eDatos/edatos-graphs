import React from 'react';
import styles from './Section.module.scss';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

export default function Section(props) {
  return (
    <Container fluid className={[styles.section, props.className].join(' ')}>
      <Row>
        <Col>
          {props.title && (
            <div className={[styles.header].join(' ')}>
              <div className={styles.circle}>
                <div className={styles.circleContent}>{props.number}</div>
              </div>
              <span className={styles.title}>{props.title}</span>
              {props.loading && (
                <Spinner
                  animation="border"
                  variant="primary"
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderWidth: '2px',
                    marginLeft: '2rem',
                  }}
                />
              )}
            </div>
          )}

          {props.children}
        </Col>
      </Row>
    </Container>
  );
}

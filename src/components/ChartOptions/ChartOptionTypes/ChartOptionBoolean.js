import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from './../ChartOptions.module.scss';
import classNames from 'classnames';

const ChartOptionBoolean = ({
  optionId,
  label,
  value,
  error,
  onChange,
  className,
  isEnabled,
  show = true,
}) => {
  const { t } = useTranslation(['visualoptions']);
  return (
    show && (
      <div className={className}>
        <Col xs={6} className={styles['chart-option-label']}>
          {label}
        </Col>
        <Form className="col-6">
          <Form.Check
            type="checkbox"
            className="d-flex align-items-center custom-control custom-checkbox"
            id={optionId}
          >
            <Form.Check.Input
              disabled={!isEnabled}
              type="checkbox"
              checked={!!value}
              className="custom-control-input"
              onChange={(e) => {
                onChange(e.target.checked);
              }}
            />
            <Form.Check.Label
              className={classNames(
                styles['chart-option-label'],
                'custom-control-label px-0'
              )}
            >
              {value ? t('yes') : t('no')}
            </Form.Check.Label>
          </Form.Check>
        </Form>
        {error && (
          <div className="col-12">
            <small>
              <i>{error}</i>
            </small>
          </div>
        )}
      </div>
    )
  );
};

export default React.memo(ChartOptionBoolean);

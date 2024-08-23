import React from 'react';
import { Col } from 'react-bootstrap';
import ChartOptionSelect from './ChartOptionSelect';
import styles from './../ChartOptions.module.scss';

const ChartOptionNumber = ({
  value,
  error,
  onChange,
  default: defaultValue,
  label,
  isEnabled,
  ...props
}) => {
  if (props.options) {
    return (
      <ChartOptionSelect
        value={value}
        error={error}
        onChange={onChange}
        default={defaultValue}
        disabled={!isEnabled}
        label={label}
        {...props}
      />
    );
  }
  return (
    <div className={props.className}>
      <Col xs={6} className={styles['chart-option-label']}>
        {label}
      </Col>
      <Col xs={6}>
        <input
          className="form-control"
          type="number"
          value={value ?? ''}
          step={props.step}
          min={props.min}
          max={props.max}
          disabled={!isEnabled}
          onChange={(e) => {
            const str = e.target.value;
            if (str === '') {
              onChange(undefined);
            } else {
              const n = parseFloat(str);
              if (!isNaN(n)) {
                onChange(n);
              } else {
                onChange(undefined);
              }
            }
          }}
          placeholder={defaultValue}
        />
      </Col>
      {error && (
        <small>
          <i>{error}</i>
        </small>
      )}
    </div>
  );
};

export default React.memo(ChartOptionNumber);

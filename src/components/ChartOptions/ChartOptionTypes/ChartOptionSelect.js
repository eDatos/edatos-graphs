import React from 'react';
import { Col, Dropdown } from 'react-bootstrap';
import isObject from 'lodash/isObject';
import { useTranslation } from 'react-i18next';
import { CustomToggle } from '../../CustomDropdown/CustomDropdownToggle';
import styles from './../ChartOptions.module.scss';

const ChartOptionSelect = ({
  options = [],
  value,
  error,
  onChange,
  default: defaultValue,
  label,
  ...props
}) => {
  const { t } = useTranslation(['visualoptions']);
  return (
    <div className={props.className}>
      <Col xs={6} className={styles['chart-option-label']}>
        {label}
      </Col>
      <Col xs={6}>
        <Dropdown className="raw-dropdown">
          <Dropdown.Toggle
            as={CustomToggle}
            className="d-flex align-items-center justify-content-between form-control"
          >
            <span>{t(value) ?? t(defaultValue)}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.values(options).map((option) => {
              let key;
              isObject(option) ? (key = option.value) : (key = option);
              return (
                <Dropdown.Item
                  key={key}
                  onClick={() => {
                    const stringValue = key;
                    const value =
                      props.type === 'number'
                        ? Number(stringValue)
                        : stringValue;
                    onChange(value);
                  }}
                >
                  {t(option?.label)}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        {error && (
          <small>
            <i>{error}</i>
          </small>
        )}
      </Col>
    </div>
  );
};

export default React.memo(ChartOptionSelect);

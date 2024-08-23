import React, { useCallback } from 'react';
import { Dropdown } from 'react-bootstrap';
import { localeList } from '../../constants';
import { CustomToggle } from '../CustomDropdown/CustomDropdownToggle';
import styles from './ParsingOptions.module.scss';

export default function DateLocaleSelector({
  title,
  value,
  onChange,
  ...props
}) {
  const handleChange = useCallback(
    (locale) => {
      if (onChange) {
        const nextLocale = locale;
        onChange(nextLocale);
      }
    },
    [onChange]
  );

  return (
    <div className={styles.horizontalSeparator}>
      <span className={styles.labelSeparator}>{title}</span>
      <div className={styles.inputSeparator}>
        <Dropdown className="raw-dropdown">
          <Dropdown.Toggle
            as={CustomToggle}
            className="d-flex align-items-center form-control"
          >
            <span>{value}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(localeList).map((d) => {
              return (
                <Dropdown.Item key={d} onClick={() => handleChange(d)}>
                  {d}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

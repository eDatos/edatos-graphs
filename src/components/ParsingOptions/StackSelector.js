import React, { useCallback } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import { CustomToggle } from '../CustomDropdown/CustomDropdownToggle';
import styles from './ParsingOptions.module.scss';

export default function StackSelector({
  title,
  value,
  list,
  onChange,
  ...props
}) {
  const handleChange = useCallback(
    (nextDimension) => {
      if (onChange) {
        onChange(nextDimension);
      }
    },
    [onChange]
  );

  return (
    <div className={styles.horizontalSeparator}>
      <span className={styles.labelSeparator}>{title}</span>
      <div className={styles.bigInputSeparator}>
        <Dropdown className="raw-dropdown">
          <Dropdown.Toggle
            as={CustomToggle}
            id="dropdown-custom-components"
            className="d-flex align-items-center form-control"
            disabled={list.length === 0}
          >
            <span>
              {value ? value : <Trans i18nKey="global.column"></Trans>}
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {value && (
              <Dropdown.Item onClick={() => handleChange(null)}>
                {<Trans i18nKey="global.column"></Trans>}
              </Dropdown.Item>
            )}
            {Object.keys(list).map((d) => {
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

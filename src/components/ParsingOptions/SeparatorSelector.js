import React, { useCallback } from 'react';
import { Dropdown } from 'react-bootstrap';
import { separatorsLabels } from '../../constants';
import { useTranslation } from 'react-i18next';
import { CustomToggle } from '../CustomDropdown/CustomDropdownToggle';
import styles from './ParsingOptions.module.scss';

export default function SeparatorSelector({
  title,
  value,
  onChange,
  ...props
}) {
  const { t } = useTranslation();

  const inputValue = value
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
    .replace(/\t/g, '\\t');

  const handleChange = useCallback(
    (separator) => {
      if (onChange) {
        const nextValue = separator
          .replace(/\\r/g, '\r')
          .replace(/\\n/g, '\n')
          .replace(/\\t/g, '\t');
        onChange(nextValue);
      }
    },
    [onChange]
  );

  const formatValue = (value) => {
    return (
      <>
        <span className={['small', styles['separator-preview']].join(' ')}>
          {value}
        </span>{' '}
        <span>{t(separatorsLabels[value])}</span>
      </>
    );
  };

  return (
    <>
      <div className={styles.horizontalSeparator}>
        <span className={styles.labelSeparator}>{title}</span>
        <div className={styles.inputSeparator}>
          <Dropdown className="raw-dropdown">
            <Dropdown.Toggle
              as={CustomToggle}
              className="d-flex align-items-center text-truncate form-control"
            >
              {formatValue(inputValue)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(separatorsLabels).map((key) => {
                return (
                  <Dropdown.Item
                    key={separatorsLabels[key]}
                    onClick={() => handleChange(key)}
                  >
                    {formatValue(key)}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
}

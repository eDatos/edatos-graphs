import React, { useCallback } from 'react';
import styles from './ParsingOptions.module.scss';

export default function DecimalsSeparatorSelector({
  title,
  value,
  onChange,
  ...props
}) {
  const inputValue = value;

  const handleChange = useCallback(
    (e) => {
      if (onChange) {
        const nextValue = e.target.value;
        onChange(nextValue);
      }
    },
    [onChange]
  );

  return (
    <div className={styles.horizontalSeparator}>
      <span className={styles.labelSeparator}>{title}</span>
      <div className={styles.smallInputSeparator}>
        <input
          type="text"
          className="form-control d-inline-block"
          value={inputValue}
          onChange={handleChange}
          {...props}
        />
      </div>
    </div>
  );
}

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import InilineColorPicker from '../../InlineColorPicker';
import { Col } from 'react-bootstrap';
import get from 'lodash/get';
import style from '../ChartOptions.module.scss';
import { useTranslation } from 'react-i18next';

const ChartOptionColorScaleDefault = ({
  value,
  error,
  onChange,
  default: defaultValue,
  label,
  dimension,
  dataset,
  mapping,
  dataTypes,
  chart,
  mappedData,
  mappingValue,
  colorDataType,
  colorDataset,
  ...props
}) => {
  const colorFromValue = useMemo(() => {
    const colorFromDefault = get(defaultValue, 'defaultColor', '#cccccc');
    return get(value, 'defaultColor', colorFromDefault);
  }, [defaultValue, value]);

  const [defaultColor, setDefaultColor] = useState(colorFromValue);

  const handleChangeDefaultColor = useCallback(
    (nextDefaultColor) => {
      setDefaultColor(nextDefaultColor);
      const outScaleParams = {
        ...value,
        defaultColor: nextDefaultColor,
      };
      onChange(outScaleParams);
    },
    [value, onChange]
  );

  useEffect(() => {
    if (defaultValue && defaultValue.defaultColor !== defaultColor) {
      handleChangeDefaultColor(defaultValue.defaultColor);
    }
  }, [defaultColor, defaultValue, handleChangeDefaultColor]);

  const { t } = useTranslation(['visualoptions']);

  return (
    <>
      <div className={props.className}>
        <Col xs={6} className={style['chart-option-label']}>
          {t('color')}
        </Col>
        <Col xs={6}>
          <InilineColorPicker
            color={defaultColor}
            onChange={handleChangeDefaultColor}
          />
        </Col>
      </div>
    </>
  );
};

export default ChartOptionColorScaleDefault;

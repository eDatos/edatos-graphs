import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import InilineColorPicker from '../../InlineColorPicker';
import ColorSchemesDropDown from './ColorSchemesDropDown';
import { Col, Dropdown } from 'react-bootstrap';
import { ResetBtn, InvertBtn, LockBtn } from './ColorScaleUtils';
import { SCALES_LABELS, defaultPalette } from '../../../constants';
import { CustomToggle } from '../../CustomDropdown/CustomDropdownToggle';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import {
  getInitialScaleValues,
  getColorScale,
  getDefaultColorScale,
  getColorDomain,
  colorPresets,
  getAvailableScaleTypes,
  getValueType,
} from '@rawgraphs/rawgraphs-core';
import styles from '../ChartOptions.module.scss';
import usePrevious from '../../../hooks/usePrevious';
import { useTranslation } from 'react-i18next';
import * as d3Interpolate from 'd3-interpolate';
import * as d3Scale from 'd3-scale';
import classNames from 'classnames';

function getDatePickerValue(userValue) {
  if (userValue.userDomain === 0) {
    return 0;
  }
  if (!userValue.userDomain) {
    return '';
  }

  if (getValueType(userValue.userDomain) === 'date') {
    return userValue.userDomain.toISOString().substring(0, 10);
  }

  return userValue.userDomain;
}

const ChartOptionColorScale = ({
  value,
  error,
  onChange,
  defaultValue,
  label,
  dimension,
  dataset,
  mapping,
  dataTypes,
  chart,
  mappedData,
  mappingValue,
  colorDataset,
  colorDataType,
  hasAnyMapping,
  ...props
}) => {
  // here we leverage injection of the __loaded prop in the color scale, see App.js
  const initialValue = useRef(!!value.__loaded);

  const { t } = useTranslation(['visualoptions']);

  const [scaleType, setScaleType] = useState(get(value, 'scaleType'));

  const defaultColor = useMemo(() => {
    const colorFromDefault = get(defaultValue, 'defaultColor', '#cccccc');
    return get(value, 'defaultColor', colorFromDefault);
  }, [defaultValue, value]);

  const [locked, setLocked] = useState(get(value, 'locked'));

  const availableScaleTypes = useMemo(() => {
    const nextTypes = getAvailableScaleTypes(colorDataType, colorDataset);
    return nextTypes;
  }, [colorDataType, colorDataset]);

  const [interpolators, setInterpolators] = useState(
    get(value, 'scaleType')
      ? Object.keys(colorPresets[get(value, 'scaleType')])
      : []
  );

  const [interpolator, setInterpolator] = useState(get(value, 'interpolator'));
  const [userValues, setUserValues] = useState(
    get(value, 'userScaleValues', []).map((userValue) => ({
      ...userValue,
      userDomain: userValue.domain,
      userRange: userValue.range,
    }))
  );

  const getCurrentFinalScale = useCallback(
    (interpolator, scaleType, userValuesForFinalScale, defaultColor) => {
      if (
        !scaleType ||
        !interpolator ||
        !colorPresets[scaleType][interpolator] ||
        !userValuesForFinalScale ||
        !userValuesForFinalScale.length
      ) {
        return;
      }

      const domains = userValuesForFinalScale
        .map((x) => x.domain)
        .filter((x) => x !== undefined);
      if (!domains.length) {
        return;
      }

      const previewScale = getColorScale(
        colorDataset, //the array of values of the dataset mapped on the color dimension
        colorDataType,
        scaleType, //
        interpolator,
        userValuesForFinalScale
      );

      return previewScale;
    },
    [colorDataType, colorDataset]
  );

  const getDefaultUserValues = useCallback(
    (interpolator, scaleType) => {
      if (!colorDataset.length || !colorDataType || !scaleType) {
        return [];
      }
      if (!colorPresets[scaleType][interpolator]) {
        return [];
      }

      const domain = getColorDomain(colorDataset, colorDataType, scaleType);

      return getInitialScaleValues(domain, scaleType, interpolator).map(
        (userValue) => ({
          ...userValue,
          userRange: userValue.range,
          userDomain: userValue.domain,
        })
      );
    },
    [colorDataType, colorDataset]
  );

  const getUserValuesForFinalScale = useCallback(
    (values) => {
      return values.map((value) => ({
        range: value.userRange,
        domain:
          colorDataType === 'date'
            ? value.userDomain?.toString()
            : value.userDomain,
        // domain: value.userDomain,
      }));
    },
    [colorDataType]
  );

  const currentFinalScale = useMemo(() => {
    if (scaleType && interpolator) {
      const currentUserValues =
        userValues && userValues.length
          ? userValues
          : getDefaultUserValues(interpolator, scaleType);
      const valuesForFinalScale = getUserValuesForFinalScale(currentUserValues);
      return getCurrentFinalScale(interpolator, scaleType, valuesForFinalScale);
    }
    return getDefaultColorScale();
  }, [
    getCurrentFinalScale,
    getDefaultUserValues,
    getUserValuesForFinalScale,
    interpolator,
    scaleType,
    userValues,
  ]);

  const handleChangeValues = useCallback(
    (nextUserValues) => {
      let valuesForFinalScale = getUserValuesForFinalScale(nextUserValues);
      setLocked(true);

      //notify ui
      const outScaleParams = {
        scaleType,
        interpolator: interpolator,
        userScaleValues: valuesForFinalScale,
        defaultColor,
        locked,
      };
      onChange(outScaleParams);
    },
    [
      getUserValuesForFinalScale,
      scaleType,
      interpolator,
      defaultColor,
      locked,
      onChange,
    ]
  );

  const setUserValueRange = useCallback(
    (index, value) => {
      const newUserValues = [...userValues];
      newUserValues[index].userRange = value;
      setUserValues(newUserValues);
      handleChangeValues(newUserValues);
    },
    [handleChangeValues, userValues]
  );

  const setUserValueDomain = useCallback(
    (index, value) => {
      const newUserValues = [...userValues];
      newUserValues[index].userDomain = value;
      setUserValues(newUserValues);
      handleChangeValues(newUserValues);
    },
    [handleChangeValues, userValues]
  );

  const handleChangeScaleType = useCallback(
    (nextScaleType) => {
      setLocked(false);
      setScaleType(nextScaleType);

      //update interpolators
      const nextInterpolators = colorPresets[nextScaleType]
        ? Object.keys(colorPresets[nextScaleType])
        : [];

      //set first interpolator
      const nextInterpolator =
        nextInterpolators.findIndex((value) => value === interpolator) >= 0
          ? interpolator
          : nextInterpolators[0];
      setInterpolator(nextInterpolator);

      //user values
      const nextUserValues = getDefaultUserValues(
        nextInterpolator,
        nextScaleType
      );
      setUserValues(nextUserValues);
      setInterpolators(
        nextUserValues.length > 1 ? nextInterpolators : [nextInterpolator]
      );
      const valuesForFinalScale = getUserValuesForFinalScale(nextUserValues);

      //notify ui
      const outScaleParams = {
        scaleType: nextScaleType,
        interpolator: nextInterpolator,
        userScaleValues: valuesForFinalScale,
        defaultColor,
        locked,
      };
      onChange(outScaleParams);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      getDefaultUserValues,
      getUserValuesForFinalScale,
      defaultColor,
      onChange,
      locked,
    ]
  );

  const handleSetInterpolator = useCallback(
    (nextInterpolator, customUserValues) => {
      setInterpolator(nextInterpolator);

      //user values
      const nextUserValues = getDefaultUserValues(nextInterpolator, scaleType);
      setUserValues(nextUserValues);
      let valuesForFinalScale = getUserValuesForFinalScale(nextUserValues);

      if (customUserValues) {
        const byDomain = keyBy(customUserValues, 'domain');
        valuesForFinalScale = valuesForFinalScale.map((v) => ({
          ...v,
          range: byDomain[v.domain.toString()]
            ? byDomain[v.domain.toString()].userRange
            : v.range,
        }));
      }
      //notify ui
      const outScaleParams = {
        scaleType,
        interpolator: nextInterpolator,
        userScaleValues: valuesForFinalScale,
        defaultColor,
        locked,
      };
      onChange(outScaleParams);
    },
    [
      getDefaultUserValues,
      getUserValuesForFinalScale,
      onChange,
      scaleType,
      defaultColor,
      locked,
    ]
  );

  const handleChangeLocked = useCallback(
    (nextLocked) => {
      setLocked(nextLocked);
      //this is needed for disabiling automatic scale reset
      initialValue.current = true;

      const outScaleParams = {
        scaleType,
        interpolator,
        userScaleValues: userValues,
        defaultColor,
        locked: nextLocked,
      };
      onChange(outScaleParams);
    },
    [scaleType, interpolator, userValues, defaultColor, onChange]
  );

  const resetScale = useCallback(() => {
    handleSetInterpolator(interpolator);
  }, [handleSetInterpolator, interpolator]);

  const invertScale = useCallback(() => {
    let reversedValues = [...userValues];
    reversedValues.reverse();

    const invertedValues = userValues.map((v, i) => ({
      ...v,
      userRange: reversedValues[i].userRange,
      range: reversedValues[i].range,
    }));

    setUserValues(invertedValues);
    handleChangeValues(invertedValues);
  }, [handleChangeValues, userValues]);

  const prevMappingValue = usePrevious(mappingValue);

  useEffect(() => {
    if (prevMappingValue && mappingValue !== prevMappingValue) {
      initialValue.current = false;
    }
  }, [mappingValue, prevMappingValue]);

  useEffect(() => {
    if (!initialValue.current && !locked) {
      const nextScaleType = availableScaleTypes[0];
      handleChangeScaleType(nextScaleType);
    }
  }, [availableScaleTypes, handleChangeScaleType, locked]);

  let presetPalette = useMemo(() => {
    const interpolatorValue = colorPresets[scaleType][interpolator]
      ? colorPresets[scaleType][interpolator].value
      : defaultPalette;
    const scaleRange = Array.isArray(interpolatorValue)
      ? interpolatorValue
      : d3Interpolate.quantize(interpolatorValue, userValues.length);
    const colorScale = d3Scale.scaleOrdinal().range(scaleRange);
    return scaleRange.map((_, index) => colorScale(index));
  }, [interpolator, scaleType, userValues]);

  return hasAnyMapping ? (
    <>
      <div className={props.className}>
        <Col
          xs={5}
          className={classNames(styles['chart-option-label'], 'nowrap')}
        >
          {t('colorScale')}
        </Col>
        <Col xs={7}>
          <Dropdown className="raw-dropdown">
            <Dropdown.Toggle
              as={CustomToggle}
              className="d-flex align-items-center justify-content-between form-control"
              disabled={!colorDataType}
            >
              <span>{get(SCALES_LABELS, scaleType, scaleType)}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="w-100">
              {availableScaleTypes.map((s) => {
                return (
                  <Dropdown.Item
                    key={s}
                    onClick={() => handleChangeScaleType(s)}
                  >
                    {get(SCALES_LABELS, s, s)}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </div>

      {/* Color scheme */}
      <div className={props.className}>
        <Col
          xs={5}
          className={classNames(styles['chart-option-label'], 'nowrap')}
        >
          {t('colorScheme')}
        </Col>
        <Col xs={7}>
          <ColorSchemesDropDown
            interpolators={interpolators}
            interpolator={interpolator}
            setInterpolator={handleSetInterpolator}
            // To display color-scale preview
            colorDataset={colorDataset}
            colorDataType={colorDataType}
            scaleType={scaleType}
            currentFinalScale={currentFinalScale}
          />
        </Col>
      </div>

      {/* Scale color swatches */}
      {colorDataType && userValues && (
        <div className={styles['color-swatches-list']}>
          {userValues.map((userValue, i) => (
            <div
              key={i}
              className={[props.className, styles['color-swatch']].join(' ')}
            >
              <Col
                xs={5}
                className={classNames(styles['color-scale-item'], 'd-flex')}
              >
                {scaleType === 'ordinal' &&
                  get(userValue, 'domain') !== undefined && (
                    <span
                      className={classNames(
                        styles['chart-option-label'],
                        'nowrap text-truncate'
                      )}
                      title={userValue.domain && userValue.domain.toString()}
                    >
                      {userValue.domain === ''
                        ? '[empty string]'
                        : userValue.domain.toString()}
                    </span>
                  )}
                {scaleType !== 'ordinal' && (
                  <>
                    <span className="nowrap">
                      {i === 0
                        ? 'Start'
                        : i === userValues.length - 1
                        ? 'End'
                        : 'Middle'}
                    </span>
                    <input
                      disabled={locked}
                      type={getValueType(userValue.userDomain)}
                      className="form-control text-field"
                      value={getDatePickerValue(userValue)}
                      onChange={(e) => {
                        if (colorDataType === 'date') {
                          setUserValueDomain(i, new Date(e.target.value));
                        } else {
                          setUserValueDomain(i, e.target.value);
                        }
                      }}
                    ></input>
                  </>
                )}
              </Col>
              <Col xs={7}>
                <InilineColorPicker
                  color={userValue.userRange}
                  onChange={(color) => {
                    setUserValueRange(i, color);
                  }}
                  presetPalette={presetPalette}
                />
              </Col>
            </div>
          ))}

          <div
            className={[props.className, styles['color-swatch-actions']].join(
              ' '
            )}
          >
            <Col className="d-flex justify-content-end">
              <ResetBtn resetScale={resetScale} text={t('resetDomain')} />
              {userValues.length > 1 && (
                <InvertBtn invertScale={invertScale} text={t('invert')} />
              )}
              {scaleType !== 'ordinal' && (
                <LockBtn
                  locked={locked}
                  handleChangeLocked={handleChangeLocked}
                />
              )}
            </Col>
          </div>
        </div>
      )}
    </>
  ) : null;
};

export default ChartOptionColorScale;

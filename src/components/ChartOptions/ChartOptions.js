import React, { useCallback, useState, useMemo } from 'react';
import { Col } from 'react-bootstrap';
import {
  getOptionsConfig,
  getContainerOptions,
  getDefaultOptionsValues,
  getEnabledOptions,
  getTypeName,
} from '@rawgraphs/rawgraphs-core';
import ChartOptionNumber from './ChartOptionTypes/ChartOptionNumber';
import ChartOptionText from './ChartOptionTypes/ChartOptionText';
import ChartOptionColor from './ChartOptionTypes/ChartOptionColor';
import ChartOptionColorScaleWrapper from './ChartOptionTypes/ChartOptionColorScaleWrapper';
import ChartOptionBoolean from './ChartOptionTypes/ChartOptionBoolean';
import get from 'lodash/get';
import map from 'lodash/map';
import styles from './ChartOptions.module.scss';
import omit from 'lodash/omit';
import { useTranslation } from 'react-i18next';

const CHART_OPTION_COMPONENTS = {
  number: ChartOptionNumber,
  text: ChartOptionText,
  color: ChartOptionColor,
  colorScale: ChartOptionColorScaleWrapper,
  boolean: ChartOptionBoolean,
};

const optionFocus = ['legend', 'colors', 'chart','artboard'];

function getPartialMapping(mapping, dimension, repeatIndex) {
  const nv = get(mapping[dimension], `value[${repeatIndex}]`);
  return {
    ...mapping,
    [dimension]: {
      ...mapping[dimension],
      value: [nv],
    },
  };
}

function getDefaultForRepeat(def, index) {
  if (Array.isArray(def.repeatDefault)) {
    return get(def.repeatDefault, `[${index}]`, def.default);
  }
  return def.default;
}

function WrapControlComponent({
  type,
  optionId,
  setVisualOptions,
  label,
  repeatIndex,
  ...props
}) {
  const Component = CHART_OPTION_COMPONENTS[type];
  const { t } = useTranslation(['visualoptions']);

  const remainingOptions = useMemo(() => {
    if (type !== 'colorScale') {
      return null;
    }

    return Object.keys(omit(props.visualOptions, optionId))
      .map((k) => JSON.stringify(get(props.visualOptions, k, '')))
      .join('-');
  }, [type, props.visualOptions, optionId]);

  const domainFromChart = useMemo(() => {
    if (type !== 'colorScale') {
      return null;
    }
    if (props.domain && props.chart[props.domain]) {
      //as sometimes the current chart is not in synch with current options (chart is set before options, we just handle an exception)
      //everything should be ok on the next render.
      try {
        const domain = props.chart[props.domain](
          props.dataset,
          props.mapping,
          props.visualOptions
        );
        return domain;
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, props.chart, props.domain, props.mapping, remainingOptions]);

  const mappingValue = useMemo(() => {
    if (type !== 'colorScale') {
      return null;
    }
    return domainFromChart
      ? '__custom__'
      : get(props.mapping, `[${props.dimension}].value`);
  }, [domainFromChart, props.dimension, props.mapping, type]);

  const colorDataType = useMemo(() => {
    if (type !== 'colorScale') {
      return null;
    }
    if (domainFromChart) {
      return domainFromChart.type;
    }
    return props.dataTypes[mappingValue]
      ? getTypeName(props.dataTypes[mappingValue])
      : 'string';
  }, [type, props.dataTypes, domainFromChart, mappingValue]);

  const colorDataset = useMemo(() => {
    if (type !== 'colorScale') {
      return null;
    }
    if (domainFromChart) {
      return domainFromChart.domain;
    }
    return [];
  }, [type, domainFromChart]);

  const handleControlChange = useCallback(
    (nextValue) => {
      setVisualOptions((visualOptions) => {
        let newValue = nextValue;
        if (repeatIndex !== undefined) {
          newValue = visualOptions[optionId] || [];
          newValue[repeatIndex] = nextValue;
        }
        return {
          ...visualOptions,
          [optionId]: newValue,
        };
      });
    },
    [optionId, repeatIndex, setVisualOptions]
  );

  return (
    <Component
      type={type}
      domainFromChart={domainFromChart}
      mappingValue={mappingValue}
      colorDataType={colorDataType}
      colorDataset={colorDataset}
      optionId={optionId}
      label={
        repeatIndex !== undefined ? (
          <React.Fragment>
            {label} ({repeatIndex + 1})
          </React.Fragment>
        ) : (
          t(optionId)
        )
      }
      {...omit(props, [
        'mapping',
        'visualOptions',
        'chart',
        'dataset',
        'dataTypes',
      ])}
      onChange={handleControlChange}
    />
  );
}

const ChartOptions = ({
  chart,
  dataset,
  mapping,
  dataTypes,
  visualOptions,
  setVisualOptions,
  error,
}) => {
  const { t } = useTranslation(['visualoptions', 'translation']);

  const optionsConfig = useMemo(() => {
    if (chart?.getVisualOptionsConfig) {
      return chart.getVisualOptionsConfig(mapping);
    }
    return getOptionsConfig(chart?.visualOptions);
  }, [chart, mapping]);

  const [collapseStatus, setCollapseStatus] = useState(() => {
    const groups = {};
    for (const option in optionsConfig) {
      const group = optionsConfig[option].group;
      if (!groups.hasOwnProperty(group)) {
        groups[group] = true;
      }
    }
    return groups;
  });

  const enabledOptions = useMemo(() => {
    return getEnabledOptions(optionsConfig, visualOptions, mapping);
  }, [optionsConfig, visualOptions, mapping]);

  const sortOptions = (array, sortArray) => {
    return [...array]
      .sort((a, b) => sortArray.indexOf(b[0]) - sortArray.indexOf(a[0]));
  };

  const optionsDefinitionsByGroup = useMemo(() => {
    // update "collapseStatus" state
    // add/remove options groups when selected charts changes
    const groups = {};
    for (const option in optionsConfig) {
      const group = optionsConfig[option].group;
      if (!groups.hasOwnProperty(group)) {
        groups[group] = group === 'artboard' ? false : true;
      }
    }
    setCollapseStatus(groups);
    const array = Object.keys(optionsConfig).reduce((acc, optionId) => {
        const option = optionsConfig[optionId];
        const group = option?.group || '';
        if (!acc[group]) {
          acc[group] = {};
        }
        acc[group][optionId] = option;
        return acc;
      }, {}
    );
    return sortOptions(Object.entries(array), optionFocus);
  }, [optionsConfig]);

  const containerOptions = useMemo(() => {
    const defaultOptionsValues = getDefaultOptionsValues(
      optionsConfig,
      mapping
    );
    const opts = {
      ...defaultOptionsValues,
      ...visualOptions,
    };
    return getContainerOptions(optionsConfig, opts);
  }, [mapping, optionsConfig, visualOptions]);

  return (
    <div className={[styles['chart-options']].join(' ')}>
      {optionsDefinitionsByGroup.map(([groupName, options]) => {
        return (
          <div
            key={groupName}
            groupname={groupName}
            className={[
              styles['options-group'],
              collapseStatus[groupName] ? styles['collapsed'] : '',
            ].join(' ')}
          >
            <Col
              className={`d-flex justify-content-between align-items-center ${styles['group-header']}`}
            >
              <h5
                className={`text-uppercase m-0 ${styles['label-chart-option']}`}
              >
                {t(groupName)}
              </h5>
              <span
                className={[styles['collapse-button'], 'cursor-pointer'].join(
                  ' '
                )}
                onClick={() =>
                  setCollapseStatus({
                    ...collapseStatus,
                    [groupName]: !collapseStatus[groupName],
                  })
                }
              >
                <i
                  className={[
                    collapseStatus[groupName]
                      ? 'fa-thin fa-chevron-down'
                      : 'fa-thin fa-chevron-up',
                  ].join(' ')}
                ></i>
              </span>
            </Col>

            {map(options, (def, optionId) => {
              // repeated options: notice that value is set to a default if undefined
              // this is caused by changes in shapes of the mapping object
              // (when a new value is dragged to the dimension that repeats the option)
              // the same approach is applied in option validation by the raw core lib
              return def.repeatFor ? (
                get(mapping, `[${def.repeatFor}].value`, []).map(
                  (v, repeatIndex) => (
                    <WrapControlComponent
                      className={styles['chart-option']}
                      key={optionId + repeatIndex}
                      repeatIndex={repeatIndex}
                      {...def}
                      optionId={optionId}
                      error={error?.errors?.[optionId + repeatIndex]}
                      value={
                        visualOptions?.[optionId]?.[repeatIndex] ??
                        getDefaultForRepeat(def, repeatIndex)
                      }
                      mapping={
                        def.type === 'colorScale'
                          ? getPartialMapping(
                              mapping,
                              def.repeatFor,
                              repeatIndex
                            )
                          : undefined
                      }
                      chart={def.type === 'colorScale' ? chart : undefined}
                      dataset={def.type === 'colorScale' ? dataset : undefined}
                      dataTypes={
                        def.type === 'colorScale' ? dataTypes : undefined
                      }
                      visualOptions={
                        def.type === 'colorScale' ? visualOptions : undefined
                      }
                      setVisualOptions={setVisualOptions}
                      isEnabled={enabledOptions[optionId]}
                    />
                  )
                )
              ) : (
                <WrapControlComponent
                  className={styles['chart-option']}
                  key={optionId}
                  {...def}
                  optionId={optionId}
                  error={error?.errors?.[optionId]}
                  value={visualOptions?.[optionId]}
                  mapping={def.type === 'colorScale' ? mapping : undefined}
                  chart={def.type === 'colorScale' ? chart : undefined}
                  dataset={def.type === 'colorScale' ? dataset : undefined}
                  dataTypes={def.type === 'colorScale' ? dataTypes : undefined}
                  visualOptions={
                    def.type === 'colorScale' ? visualOptions : undefined
                  }
                  setVisualOptions={setVisualOptions}
                  isEnabled={enabledOptions[optionId]}
                />
              );
            })}
            {groupName === 'artboard' && visualOptions.showLegend && (
              <div className={styles['chart-option']}>
                <div
                  className={[
                    styles['chart-option-label'],
                    styles['small'],
                  ].join(' ')}
                >
                  {t('global.message.sizeoutput.part1', { ns: 'translation' })}{' '}
                  {containerOptions?.width}
                  px * {containerOptions?.height}px{' '}
                  {t('global.message.sizeoutput.part2', { ns: 'translation' })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChartOptions;

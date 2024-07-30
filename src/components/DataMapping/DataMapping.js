import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Row, Col } from 'react-bootstrap';
import map from 'lodash/map';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import ColumnCard from './ColumnCard';
import ChartDimensionCard from './ChartDimensionCard';
import get from 'lodash/get';
import uniqueId from 'lodash/uniqueId';
import arrayInsert from 'array-insert';
import { getDefaultDimensionAggregation } from '@rawgraphs/rawgraphs-core';
import { useTranslation } from 'react-i18next';
import styles from './DataMapping.module.scss';
import classNames from 'classnames';

function removeIndex(mapping, i) {
  let nextConfig;
  if (mapping.config) {
    nextConfig = {
      ...mapping.config,
      aggregation: mapping.config.aggregation.filter((col, j) => j !== i),
    };
  }

  return {
    ...mapping,
    ids: mapping.ids.filter((col, j) => j !== i),
    value: mapping.value.filter((col, j) => j !== i),
    config: nextConfig,
  };
}

function arrayReplace(arr, i, value) {
  return arr.map((item, j) => (j === i ? value : item));
}

function handleReplaceLocalMapping(
  nextId,
  prev,
  fromDimension,
  toDimension,
  fromIndex,
  toIndex,
  dimensions,
  dataTypes,
  multiple = false
) {
  const removedItem = {};
  removedItem.aggregation =
    prev[fromDimension]?.config?.aggregation?.[fromIndex];
  removedItem.value = prev[fromDimension]?.value[fromIndex];

  let moveFn = multiple ? arrayInsert : arrayReplace;

  const prevToMapping = prev[toDimension] || {};
  const originDimensionData = prev[fromDimension] || {};
  const toDimensionMapping = {
    ...originDimensionData,
    config: undefined,
    ids: moveFn(prevToMapping.ids ?? [], toIndex, nextId),
    value: moveFn(prevToMapping.value ?? [], toIndex, removedItem.value),
  };

  const dimension = dimensions.filter((d) => d.id === toDimension)[0];
  if (dimension?.aggregation) {
    let newAggregation;
    if (removedItem.aggregation) {
      newAggregation = removedItem.aggregation;
    } else {
      newAggregation = getDefaultDimensionAggregation(
        dimension,
        dataTypes[removedItem.value]
      );
    }
    toDimensionMapping.config = {
      aggregation: moveFn(
        get(prevToMapping, 'config.aggregation', []),
        toIndex,
        newAggregation
      ),
    };
  }
  const obj = {
    ...prev,
    [fromDimension]: removeIndex(prev[fromDimension], fromIndex),
    [toDimension]: toDimensionMapping,
  };
  return obj;
}

function DataMapping({ dataTypes, dimensions, mapping, setMapping }, ref) {
  const [localMapping, setLocalMapping] = useState(mapping);

  const updateMapping = useCallback(
    (dimension, mappingConf, isLocal) => {
      // Local
      setLocalMapping((prev) => ({
        ...prev,
        [dimension]: mappingConf,
      }));
      if (!isLocal) {
        // Gloab mapping
        setMapping((prev) => ({
          ...prev,
          [dimension]: mappingConf,
        }));
      }
    },
    [setMapping]
  );
  const replaceDimension = useCallback(
    (fromDimension, toDimension, fromIndex, toIndex, multiple = false) => {
      const nextId = uniqueId();
      if (multiple) {
        setDraggingId(nextId);
      }
      setLocalMapping((prev) => {
        return handleReplaceLocalMapping(
          nextId,
          prev,
          fromDimension,
          toDimension,
          fromIndex,
          toIndex,
          dimensions,
          dataTypes,
          multiple
        );
      });
      if (!multiple) {
        setMapping((prev) => {
          return handleReplaceLocalMapping(
            nextId,
            prev,
            fromDimension,
            toDimension,
            fromIndex,
            toIndex,
            dimensions,
            dataTypes
          );
        });
      }
    },
    [dataTypes, dimensions, setMapping]
  );

  const [draggingId, setDraggingId] = useState(null);
  const { t } = useTranslation();

  const rollbackLocalMapping = () => {
    setLocalMapping(mapping);
    setDraggingId(null);
  };

  const commitLocalMapping = () => {
    setDraggingId(null);
  };

  useEffect(() => {
    setMapping(localMapping);
  }, [setMapping, localMapping]);

  useImperativeHandle(ref, () => ({
    clearLocalMapping: () => {
      setLocalMapping({});
    },
  }));

  return (
    <DndProvider backend={HTML5Backend}>
      <Row>
        <Col xs={3}>
          <div className={classNames(styles.cardChartContent, 'py-top-20')}>
            <div
              className={classNames(styles['column-card'], styles['header'])}
            >
              <span>
                {t(
                  'global.section.mapping.chartvariables.dimensions'
                ).toUpperCase()}
              </span>
            </div>
            {map(dataTypes, (dataType, columnName) => {
              return (
                <ColumnCard
                  key={columnName}
                  dimensionName={columnName}
                  dimensionType={dataType}
                  commitLocalMapping={commitLocalMapping}
                  rollbackLocalMapping={rollbackLocalMapping}
                />
              );
            })}
          </div>
        </Col>
        <Col className="py-top-20">
          <Row>
            {dimensions.map((d) => {
              return (
                <ChartDimensionCard
                  key={d.id}
                  dimension={d}
                  dataTypes={dataTypes}
                  mapping={localMapping[d.id] || {}}
                  setMapping={(mappingConf, isLocal = false) =>
                    updateMapping(d.id, mappingConf, isLocal)
                  }
                  commitLocalMapping={commitLocalMapping}
                  rollbackLocalMapping={rollbackLocalMapping}
                  draggingId={draggingId}
                  setDraggingId={setDraggingId}
                  replaceDimension={replaceDimension}
                />
              );
            })}
          </Row>
        </Col>
      </Row>
    </DndProvider>
  );
}

export default React.memo(React.forwardRef(DataMapping));

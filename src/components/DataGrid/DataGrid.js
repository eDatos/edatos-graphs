import React, { useMemo, useRef, useState, useCallback } from 'react';
import ReactDataGrid, { headerRenderer, textEditor } from 'react-data-grid';
import { Overlay, OverlayTrigger } from 'react-bootstrap';
import classNames from 'classnames';
import { getTypeName, dateFormats } from '@rawgraphs/rawgraphs-core';
import S from './DataGrid.module.scss';
import 'react-data-grid/lib/styles.css';
import { keyBy, get, isEqual } from 'lodash';
import {
  dataTypeIcons,
  DateIcon,
  StringIcon,
  NumberIcon,
} from '../../constants';
import { BsFillCaretRightFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

//add custom date formats
dateFormats['YYYY-MMM'] = '%Y-M%m';
const DATE_FORMATS = Object.keys(dateFormats);

const DateFormatSelector = React.forwardRef(
  ({ currentFormat, onChange, className, ...props }, ref) => {
    return (
      <div
        className={classNames(className, S['date-format-selector'])}
        ref={ref}
        style={props.style}
      >
        {DATE_FORMATS.map((dateFmt) => (
          <div
            key={dateFmt}
            className={classNames(S['date-format-selector-entry'], {
              [S.selected]: get(currentFormat, 'dateFormat', '') === dateFmt,
            })}
            onMouseDownCapture={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onChange({
                type: 'date',
                dateFormat: dateFmt,
              });
            }}
          >
            {dateFmt}
          </div>
        ))}
      </div>
    );
  }
);

function DataTypeSelector({
  currentType: typeDescriptor,
  onTypeChange,
  currentTypeComplete,
}) {
  const { t } = useTranslation(['translation']);
  const dataTypeIconDomRef = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  const currentType = get(typeDescriptor, 'type', typeDescriptor);

  const handleTypeChange = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      const newType = e.target.dataset.datatype;
      if (
        typeof onTypeChange === 'function' &&
        !isEqual(newType, typeDescriptor)
      ) {
        onTypeChange(newType);
      }
      setShowPicker(false);
    },
    [typeDescriptor, onTypeChange]
  );

  const handleTypeChangeDate = useCallback(
    (newType) => {
      if (
        typeof onTypeChange === 'function' &&
        !isEqual(newType, typeDescriptor)
      ) {
        onTypeChange(newType);
      }
      setShowPicker(false);
    },
    [typeDescriptor, onTypeChange]
  );

  const handleTargetClick = useCallback(
    (e) => {
      setShowPicker(!showPicker);
    },
    [showPicker]
  );

  const Icon = dataTypeIcons[currentType];

  return (
    <>
      <span
        role="button"
        className={S['data-type-selector-trigger']}
        ref={dataTypeIconDomRef}
        onClick={handleTargetClick}
      >
        <Icon />
      </span>
      <Overlay
        target={dataTypeIconDomRef.current}
        show={showPicker}
        placement="bottom-start"
        rootClose={true}
        rootCloseEvent="click"
        onHide={() => {
          setShowPicker(false);
        }}
        container={document.body}
      >
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            id="data-type-selector"
            className={S['data-type-selector']}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            <div
              data-datatype="number"
              onClick={handleTypeChange}
              className={classNames(S['data-type-selector-item'], {
                [S.selected]: currentType === 'number',
              })}
            >
              <NumberIcon /> {t('global.section.loaddata.types.number')}
            </div>
            <div
              data-datatype="string"
              onClick={handleTypeChange}
              className={classNames(S['data-type-selector-item'], {
                [S.selected]: currentType === 'string',
              })}
            >
              <StringIcon /> {t('global.section.loaddata.types.string')}
            </div>
            <OverlayTrigger
              placement="right-start"
              overlay={
                <DateFormatSelector
                  currentType={typeDescriptor}
                  onChange={handleTypeChangeDate}
                />
              }
              trigger="click"
            >
              {({ ref, ...triggerHandler }) => (
                <div
                  ref={ref}
                  data-datatype="date"
                  {...triggerHandler}
                  className={classNames(
                    S['data-type-selector-item'],
                    S['parent-type-selector'],
                    { [S.selected]: currentType === 'date' }
                  )}
                >
                  <div>
                    <DateIcon />
                    {t('global.section.loaddata.types.date')}
                    {currentType === 'date' && (
                      <span className={S['date-format-preview']}>
                        {' (' + currentTypeComplete.dateFormat + ')  '}
                      </span>
                    )}
                  </div>
                  <BsFillCaretRightFill
                    style={{ marginRight: 0, fill: 'var(--gray-700)' }}
                  />
                </div>
              )}
            </OverlayTrigger>
          </div>
        )}
      </Overlay>
    </>
  );
}

function HeaderRenderer({ ...props }) {
  const { column, sortDirection } = props;
  return (
    <div
      className={classNames(
        { [S['raw-col-header']]: true },
        { [S['unsorted']]: sortDirection === undefined },
        { [S['acs']]: sortDirection === 'ASC' },
        { [S['desc']]: sortDirection === 'DESC' }
      )}
    >
      <DataTypeSelector
        currentType={column._raw_datatype}
        onTypeChange={column._raw_coerceType}
        currentTypeComplete={column._raw_datatype}
      />
      <span
        className={classNames(S['column-name'], 'text-truncate', 'd-block')}
        title={column.name}
      >
        {headerRenderer({ column, ...props })}
      </span>
    </div>
  );
}

function createColumns(
  userDataSet,
  dataTypes,
  containerEl,
  coerceTypes,
  locale
) {
  if (!userDataSet || !dataTypes) {
    return [];
  }
  const idColumnWidth =
    24 + 8 * (Math.floor(Math.log10(userDataSet.length)) + 1);
  const equalDinstribution =
    (containerEl.current?.getBoundingClientRect().width - idColumnWidth - 1) /
    Object.keys(dataTypes).length;
  const columnWidth = equalDinstribution
    ? Math.max(equalDinstribution, 170)
    : 170;
  return [
    ...Object.keys(dataTypes).map((k, i) => ({
      key: k,
      name: k,
      sortable: true,
      editable: true,
      resizable: true,
      width: columnWidth,
      _raw_datatype: dataTypes[k],
      _raw_coerceType: (nextType) =>
        coerceTypes({ ...dataTypes, [k]: nextType }),
      formatter: ({ row }) => {
        return (
          <div className={classNames({ [S['has-error']]: row?._errors?.[k] })}>
            {dataTypes[k] === 'number' || dataTypes[k]?.type === 'number'
              ? Intl.NumberFormat(locale, { useGrouping: true }).format(row[k])
              : row[k]?.toString()}
          </div>
        );
      },
      editor: textEditor,
    })),
  ];
}

export default function DataGrid({
  userDataset,
  errors,
  dataTypes,
  coerceTypes,
  onDataUpdate,
}) {
  const { i18n } = useTranslation();
  const keyedErrors = useMemo(() => keyBy(errors, 'row'), [errors]);
  const containerEl = useRef();
  const columns = createColumns(
    userDataset,
    dataTypes,
    containerEl,
    coerceTypes,
    i18n.language
  );
  const [sortColumns, setSortColumns] = useState([]);
  const onSortColumnsChange = useCallback((sortColumns) => {
    setSortColumns(sortColumns.slice(-1));
  }, []);

  const ordererColumns = useMemo(() => {
    function headerRenderer(props) {
      return <HeaderRenderer {...props} />;
    }
    return columns.map((c) => {
      if (c.key === 'id') return c;
      return { ...c, headerRenderer };
    });
  }, [columns]);

  const sortedRows = useMemo(() => {
    let datasetWithIds = userDataset.map((item, i) => ({
      // Using .map ensures that we are not mutating a property
      ...item,
      id: i + 1, // Give items some id to populate left-most column
      _stage3: item, // The dataset parsed by raw lib basing on data types is needed for sorting!
      _errors: keyedErrors[i]?.error, // Inject errors to format cells with parsing errors
    }));
    if (sortColumns.length === 0) return datasetWithIds;
    const { columnKey, direction } = sortColumns[0];

    const sortColumnType = getTypeName(dataTypes[columnKey]);

    let sortedRows;

    switch (sortColumnType) {
      case 'number':
        sortedRows = datasetWithIds.sort(
          (a, b) => a._stage3[columnKey] - b._stage3[columnKey]
        );
        break;
      case 'date':
        sortedRows =
          datasetWithIds.sort(
            (a, b) =>
              a._stage3[columnKey]?.valueOf() ??
              0 - b._stage3[columnKey]?.valueOf()
          ) ?? 0;
        break;
      default:
        sortedRows = datasetWithIds.sort((a, b) =>
          a._stage3[columnKey]
            ?.toString()
            .localeCompare(b._stage3[columnKey].toString())
        );
    }
    return direction === 'DESC' ? sortedRows.reverse() : sortedRows;
  }, [userDataset, sortColumns, dataTypes, keyedErrors]);

  return (
    <ReactDataGrid
      className="rdg-light"
      columns={ordererColumns}
      rows={sortedRows}
      sortColumns={sortColumns}
      onSortColumnsChange={onSortColumnsChange}
      defaultColumnOptions={{ width: '1fr' }}
      onRowsChange={(newRows) => onDataUpdate(newRows)}
    />
  );
}

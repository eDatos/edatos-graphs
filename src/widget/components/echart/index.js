import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import LangES from './i18n/LangES';
import LangESCa from './i18n/LangES-ca';
import charts from '../../../charts';
import { parseAndCheckData } from '../../../hooks/useDataLoaderUtils/parser';
import {
  colorPresets,
  dateFormats,
  parseDataset,
} from '@rawgraphs/rawgraphs-core';
import { get } from 'lodash';
import {
  defaultPalette,
  grayPalette2,
  islandPalette,
  localeList,
  sexPalette,
} from '../../../constants';

//add custom date formats
dateFormats['YYYY-MMM'] = '%Y-M%m';
//Custom colors
colorPresets.ordinal = {
  defaultPalette: {
    value: defaultPalette.map((e) => e.color),
    label: 'Default Palette',
  },
  grayPalette2: {
    value: grayPalette2.map((e) => e.color),
    label: 'Gray Palette',
  },
  sexPalette: {
    value: sexPalette.map((e) => e.color),
    label: 'Sex Palette',
  },
  islandPalette: {
    value: islandPalette.map((e) => e.color),
    label: 'Island Palette',
  },
};

const EDatosGraph = (props) => {
  const [options, setOptions] = useState({});
  echarts.registerLocale('es', LangES);
  echarts.registerLocale('ca', LangESCa);

  useEffect(() => {
    const fetchData = async (source) => {
      const response = await fetch(source.url);
      return await response.text();
    };

    const getChartOptions = (data) => {
      const parsedDataset = parseDataset(data, props.dataTypes, {
        locale: props.locale,
        decimal: props.decimalsSeparator,
        group: props.thousandsSeparator,
        dateLocale: get(localeList, props.locale),
      });
      return chart.getChartOptions(
        props.visualOptions,
        parsedDataset.dataset,
        props.mapping,
        props.dataTypes,
        chart.dimensions,
        props.locale
      );
    };

    const chart = charts[props.chartIndex];

    const fetchOptions = async () => {
      const data = await fetchData(props.source);
      const [dataType, parsedUserData, error, extra] = parseAndCheckData(data, {
        separator: null,
      });
      return getChartOptions(parsedUserData);
    };

    if (props.data) {
      setOptions(getChartOptions(props.data));
    } else {
      fetchOptions(props).then((options) => {
        setOptions(options);
      });
    }
  }, [props]);

  return (
    <ReactECharts
      option={options}
      opts={{ renderer: props.visualOptions.renderer, locale: props.locale }}
    />
  );
};

export default EDatosGraph;

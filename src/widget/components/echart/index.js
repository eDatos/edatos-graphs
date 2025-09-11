import React, { useEffect, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import LangES from './i18n/LangES';
import LangESCa from './i18n/LangES-ca';
import charts from '../../../charts';
import { parseAndCheckData } from '../../../hooks/useDataLoaderUtils/parser';
import {
  colorPresets,
  dateFormats,  
} from '@rawgraphs/rawgraphs-core';
import { get } from 'lodash';
import {
  defaultPalette,
  grayPalette2,
  islandPalette,
  localeList,
  sexPalette,
} from '../../../constants';
import { customParseDataSet as parseDataset } from '../../../hooks/customParseDataSet';

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
  const domRef = useRef(null);
  const [options, setOptions] = useState({});
  echarts.registerLocale('es', LangES);
  echarts.registerLocale('ca', LangESCa);

  useEffect(() => {
    const fetchData = async (source) => {
      const response = await fetch(source.url, {
        method: 'GET',
        headers: { Accept: source.acceptHeader ?? 'text/csv' },
      });
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

    const fetchOptions = async (source) => {
      const data = await fetchData(source);
      const [dataType, parsedUserData, error, extra] = parseAndCheckData(data, {
        separator: null,
      });
      return getChartOptions(parsedUserData);
    };

    const updateLegend = (options) => ({
      ...options,
      legend: {
        ...options.legend,
        selected: props.selectedSeries,
      },
    });

    if (props.data?.length > 0) {
      setOptions(updateLegend(getChartOptions(props.data)));
    } else {
      fetchOptions(props.source).then((options) => {
        setOptions(updateLegend(options));
      });
    }
  }, [props]);

  useEffect(() => {
    const echartsInstance = domRef.current?.getEchartsInstance();
    if (!echartsInstance) return;

    const legendSelectChanged = () => {
      var option = echartsInstance.getOption();

      // Esto forzará a redibujar las series y recolocar endLabels
      echartsInstance.setOption(option, {
        replaceMerge: ['series'],
      });
    };
    echartsInstance.on('legendselectchanged', legendSelectChanged);
  }, [options]);

  return (
    <ReactECharts
      ref={domRef}
      option={options}
      opts={{ renderer: props.visualOptions.renderer, locale: props.locale }}
    />
  );
};

export default EDatosGraph;

import { parseDataset } from '@rawgraphs/rawgraphs-core';
import { QUARTER_DATA_FORMAT, ISO_WEEK_DATA_FORMAT } from '../constants';

function parseQuarterStrToDate(str) {
  // Espera 'YYYY-Qn' donde n es de 1 a 4
  const match = str.match(/^(\d{4})-Q([1-4])$/);
  if (match) {
    const year = Number(match[1]);
    const quarter = Number(match[2]);
    const month = (quarter - 1) * 3 + 1;
    // Retornamos string 'YYYY-MM-DD' con primer día del trimestre
    return `${year}-${String(month).padStart(2, '0')}-01`;
  }
  // Si no coincide, retorna el string original
  return str;
}

function parseIsoWeekStrToDate(str) {
  // Espera 'YYYY-Wnn' (semana ISO 01 a 53)
  const match = str.match(/^(\d{4})-W(\d{2})$/);
  if (match) {
    const year = Number(match[1]);
    const week = Number(match[2]);
    // El 4 de enero siempre cae en la semana ISO 1
    const jan4 = new Date(Date.UTC(year, 0, 4));
    const jan4Day = jan4.getUTCDay() || 7;
    const monday = new Date(jan4);
    monday.setUTCDate(jan4.getUTCDate() - jan4Day + 1 + (week - 1) * 7);
    // Retornamos string 'YYYY-MM-DD' con el lunes de esa semana
    const yyyy = monday.getUTCFullYear();
    const mm = String(monday.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(monday.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  // Si no coincide, retorna el string original
  return str;
}

export function customParseDataSet(data, dataTypes, parsingOptions) {
  // Si no hay dataTypes, llamamos directamente
  if (dataTypes === undefined) {
    return parseDataset(data, dataTypes, parsingOptions);
  }
  // Creamos una copia para no mutar dataTypes original
  const dt = { ...dataTypes };
  // Recorremos tipos para detectar QUARTER_DATA_FORMAT / ISO_WEEK_DATA_FORMAT y transformar la data
  Object.keys(dt).forEach((key) => {
    if (typeof dt[key] !== 'object' || dt[key].type !== 'date') {
      return;
    }
    if (dt[key].dateFormat === QUARTER_DATA_FORMAT) {
      data.forEach((row) => {
        row[key] = parseQuarterStrToDate(row[key]);
      });
      // Cambiamos formato para que RAWGraphs lo entienda
      dt[key] = { type: 'date', dateFormat: 'YYYY-MM-DD' };
    } else if (dt[key].dateFormat === ISO_WEEK_DATA_FORMAT) {
      data.forEach((row) => {
        row[key] = parseIsoWeekStrToDate(row[key]);
      });
      // Cambiamos formato para que RAWGraphs lo entienda
      dt[key] = { type: 'date', dateFormat: 'YYYY-MM-DD' };
    }
  });
  // Llamamos al parser original con la data transformada y tipos ajustados
  return parseDataset(data, dt, parsingOptions);
}

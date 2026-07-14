import { parseDataset } from '@rawgraphs/rawgraphs-core';
import { QUARTER_DATA_FORMAT, ISO_WEEK_DATA_FORMAT } from '../constants';

function toIsoDateString(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function parseQuarterStrToDate(value) {
  if (value instanceof Date) {
    // Al conservar el dateFormat original, un reparseo posterior (cambio de idioma,
    // edición inline...) nos pasa un Date ya resuelto: no hay nada que traducir
    return toIsoDateString(value);
  }
  // Espera 'YYYY-Qn' donde n es de 1 a 4
  const match = value.match(/^(\d{4})-Q([1-4])$/);
  if (match) {
    const year = Number(match[1]);
    const quarter = Number(match[2]);
    const month = (quarter - 1) * 3 + 1;
    // Retornamos string 'YYYY-MM-DD' con primer día del trimestre
    return `${year}-${String(month).padStart(2, '0')}-01`;
  }
  // Si no coincide, retorna el string original
  return value;
}

function parseIsoWeekStrToDate(value) {
  if (value instanceof Date) {
    // Al conservar el dateFormat original, un reparseo posterior (cambio de idioma,
    // edición inline...) nos pasa un Date ya resuelto: no hay nada que traducir
    return toIsoDateString(value);
  }
  // Espera 'YYYY-Wnn' (semana ISO 01 a 53)
  const match = value.match(/^(\d{4})-W(\d{2})$/);
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
  return value;
}

export function customParseDataSet(data, dataTypes, parsingOptions) {
  // Si no hay dataTypes, llamamos directamente
  if (dataTypes === undefined) {
    return parseDataset(data, dataTypes, parsingOptions);
  }
  // Creamos una copia para no mutar dataTypes original
  const dt = { ...dataTypes };
  // Guardamos el dateFormat original de las columnas custom para restaurarlo después:
  // RAWGraphs necesita 'YYYY-MM-DD' para parsear, pero la UI y la exportación del
  // widget necesitan conservar 'YYYY-[Q]Q'/'YYYY-[W]WW' para saber cómo reinterpretar
  // los datos crudos (p.ej. al recargar el widget dinámicamente desde la fuente original)
  const originalCustomFormats = {};
  // Recorremos tipos para detectar QUARTER_DATA_FORMAT / ISO_WEEK_DATA_FORMAT y transformar la data
  Object.keys(dt).forEach((key) => {
    if (typeof dt[key] !== 'object' || dt[key].type !== 'date') {
      return;
    }
    if (dt[key].dateFormat === QUARTER_DATA_FORMAT) {
      originalCustomFormats[key] = QUARTER_DATA_FORMAT;
      data.forEach((row) => {
        row[key] = parseQuarterStrToDate(row[key]);
      });
      // Cambiamos formato para que RAWGraphs lo entienda
      dt[key] = { type: 'date', dateFormat: 'YYYY-MM-DD' };
    } else if (dt[key].dateFormat === ISO_WEEK_DATA_FORMAT) {
      originalCustomFormats[key] = ISO_WEEK_DATA_FORMAT;
      data.forEach((row) => {
        row[key] = parseIsoWeekStrToDate(row[key]);
      });
      // Cambiamos formato para que RAWGraphs lo entienda
      dt[key] = { type: 'date', dateFormat: 'YYYY-MM-DD' };
    }
  });
  // Llamamos al parser original con la data transformada y tipos ajustados
  const result = parseDataset(data, dt, parsingOptions);
  // Restauramos el dateFormat original en el dataTypes expuesto por el resultado
  Object.keys(originalCustomFormats).forEach((key) => {
    result.dataTypes[key] = {
      type: 'date',
      dateFormat: originalCustomFormats[key],
    };
  });
  return result;
}

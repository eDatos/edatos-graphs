import { parseDataset } from '@rawgraphs/rawgraphs-core';

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

export function customParseDataSet(data, dataTypes, parsingOptions) {
  // Si no hay dataTypes, llamamos directamente
  if (dataTypes === undefined) {
    return parseDataset(data, dataTypes, parsingOptions);
  }
  // Creamos una copia para no mutar dataTypes original
  const dt = { ...dataTypes };
  // Recorremos tipos para detectar 'YYYY-[Q]Q' y transformar la data
  Object.keys(dt).forEach((key) => {
    if (
      typeof dt[key] === 'object' &&
      dt[key].type === 'date' &&
      dt[key].dateFormat === 'YYYY-[Q]Q'
    ) {
      data.forEach((row) => {
        row[key] = parseQuarterStrToDate(row[key]);
      });
      // Cambiamos formato para que RAWGraphs lo entienda
      dt[key] = { type: 'date', dateFormat: 'YYYY-MM-DD' };
    }
  });
  // Llamamos al parser original con la data transformada y tipos ajustados
  return parseDataset(data, dt, parsingOptions);
}

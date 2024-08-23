export default {
  time: {
    month: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ],
    monthAbbr: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ],
    dayOfWeek: [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ],
    dayOfWeekAbbr: ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sáb'],
  },
  legend: {
    selector: {
      all: 'Todas',
      inverse: 'Inversa',
    },
  },
  toolbox: {
    brush: {
      title: {
        rect: 'Selección de cuadro',
        polygon: 'Selección de lazo',
        lineX: 'Seleccionar horizontalmente',
        lineY: 'Seleccionar verticalmente',
        keep: 'Mantener selección',
        clear: 'Despejar selecciones',
      },
    },
    dataView: {
      title: 'Ver datos',
      lang: ['Ver datos', 'Cerrar', 'Actualizar'],
    },
    dataZoom: {
      title: {
        zoom: 'Zoom',
        back: 'Restablecer zoom',
      },
    },
    magicType: {
      title: {
        line: 'Cambiar a gráfico de líneas',
        bar: 'Cambiar a gráfico de barras',
        stack: 'Pila',
        tiled: 'Teja',
      },
    },
    restore: {
      title: 'Restaurar',
    },
    saveAsImage: {
      title: 'Guardar como imagen',
      lang: ['Clic derecho para guardar imagen'],
    },
  },
  series: {
    typeNames: {
      pie: 'Diagrama de sectores',
      bar: 'Diagrama de barras',
      line: 'Diagrama de líneas',
      scatter: 'Diagrama de dispersión',
      tree: 'Árbol',
      treemap: 'Mapa de árbol',
      lines: 'Diagrama de líneas',
    },
  },
  aria: {
    general: {
      withTitle: 'Este es un gráfico sobre "{title}"',
      withoutTitle: 'Este es un gráfico',
    },
    series: {
      single: {
        prefix: '',
        withName: ' de tipo {seriesType} con nombre {seriesName}.',
        withoutName: ' de tipo {seriesType}.',
      },
      multiple: {
        prefix: '. Consta de {seriesCount} contador de series.',
        withName:
          ' La serie {seriesId} es de tipo {seriesType} representando {seriesName}.',
        withoutName: ' La serie {seriesId} es de tipo {seriesType}.',
        separator: {
          middle: '',
          end: '',
        },
      },
    },
    data: {
      allData: 'Los datos son los siguientes: ',
      partialData: 'Los primeros {displayCnt} items son: ',
      withName: 'el dato para {name} tiene valor {value}',
      withoutName: '{value}',
      separator: {
        middle: ', ',
        end: '. ',
      },
    },
  },
};

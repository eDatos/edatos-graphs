export default {
  time: {
    month: [
      'gener',
      'febrer',
      'març',
      'abril',
      'maig',
      'juny',
      'juliol',
      'agost',
      'setembre',
      'octubre',
      'novembre',
      'desembre',
    ],
    monthAbbr: [
      'gen',
      'feb',
      'mar',
      'abr',
      'mai',
      'jun',
      'jul',
      'ago',
      'set',
      'oct',
      'nov',
      'des',
    ],
    dayOfWeek: [
      'diumenge',
      'dilluns',
      'dimarts',
      'dimecres',
      'dijous',
      'divendres',
      'dissabte',
    ],
    dayOfWeekAbbr: ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'],
  },
  legend: {
    selector: {
      all: 'Totes',
      inverse: 'Inversa',
    },
  },
  toolbox: {
    brush: {
      title: {
        rect: 'Selecció de quadre',
        polygon: 'Selecció de llaç',
        lineX: 'Seleccionar horitzontalment',
        lineY: 'Seleccionar verticalment',
        keep: 'Mantenir selecció',
        clear: 'Aclarir seleccions',
      },
    },
    dataView: {
      title: 'Veure dades',
      lang: ['Veure dades', 'Tancar', 'Actualitzar'],
    },
    dataZoom: {
      title: {
        zoom: 'Zoom',
        back: 'Restablir zoom',
      },
    },
    magicType: {
      title: {
        line: 'Canvia a gràfic de línies',
        bar: 'Canviar a gràfic de barres',
        stack: 'Pila',
        tiled: 'Teula',
      },
    },
    restore: {
      title: 'Restaurar',
    },
    saveAsImage: {
      title: 'Desa com a imatge',
      lang: ['Clic dret per desar imatge'],
    },
  },
  series: {
    typeNames: {
      pie: 'Diagrama de sectors',
      bar: 'Diagrama de barres',
      line: 'Diagrama de línies',
      scatter: 'Diagrama de dispersió',
      tree: 'Arbre',
      treemap: "Mapa d'arbre",
      lines: 'Diagrama de línies',
    },
  },
  aria: {
    general: {
      withTitle: 'Aquest és un gràfic sobre "{title}"',
      withoutTitle: 'Aquest és un gràfic',
    },
    series: {
      single: {
        prefix: '',
        withName: ' de tipus {seriesType} amb nom {seriesName}.',
        withoutName: ' de tipus {seriesType}.',
      },
      multiple: {
        prefix: '. Consta de {seriesCount} comptador de sèries.',
        withName:
          ' La sèrie {seriesId} ès de tipus {seriesType} representant {seriesName}.',
        withoutName: ' La sèrie {seriesId} ès de tipus {seriesType}.',
        separator: {
          middle: '',
          end: '',
        },
      },
    },
    data: {
      allData: 'Les dades són les següents: ',
      partialData: 'Els primers {displayCnt} ítems són: ',
      withName: 'la dada per {name} té valor {value}',
      withoutName: '{value}',
      separator: {
        middle: ', ',
        end: '. ',
      },
    },
  },
};

import L from 'leaflet';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet/hooks';
import styles from './WMSMap.module.scss';

export default function Legend(props) {
  const map = useMap();
  const legend = L.control({ position: 'bottomleft' });
  const [isLegendHovering, setIsLegendHovering] = useState(false);

  useEffect(() => {
    if (map && props.legendURL?.url) {
      legend.onAdd = () => {
        const container = L.DomUtil.create('div', 'legend-container');
        container.id = props.layer;
        const divImg = L.DomUtil.create('div', styles.legend, container);
        divImg.innerHTML += `<img alt="legend" src="${props.legendURL.url}" width="${props.legendURL.width}" height="${props.legendURL.height}"/>`;
        divImg.hidden = !isLegendHovering;
        const div = L.DomUtil.create('div', styles.legend, container);
        div.innerHTML += `${props.layerTitle}`;
        L.DomEvent.addListener(container, 'click', (map) =>
          setIsLegendHovering(!isLegendHovering)
        );
        L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
        return container;
      };
      legend.addTo(map);
      return () => {
        legend.remove();
      };
    }
  }, [
    map,
    legend,
    props.layerTitle,
    props.legendURL,
    props.layer,
    isLegendHovering,
  ]);

  return null;
}

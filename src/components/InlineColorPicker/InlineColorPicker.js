import React, { useState } from 'react';
import styles from './InlineColorPicker.module.scss';
import CustomColorPicker from './CustomPicker/CustomColorPicker';
import {
  bluePalette,
  defaultPalette,
  grayPalette,
  islandPalette,
  sexPalette,
} from '../../constants';
import { useTranslation } from 'react-i18next';

function getPaletteWithDescription(presetPalette) {
  if (!presetPalette) {
    return defaultPalette;
  }
  const sPresetPalette = JSON.stringify(presetPalette);
  if (JSON.stringify(sexPalette.map((e) => e.color)) === sPresetPalette) {
    return sexPalette;
  } else if (
    JSON.stringify(islandPalette.map((e) => e.color)) === sPresetPalette
  ) {
    return islandPalette;
  }
  return defaultPalette;
}

export default function InlineColorPicker({
  color: maybeColor,
  onChange,
  disabled,
  presetPalette,
}) {
  const { t } = useTranslation(['visualoptions']);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const color = maybeColor ?? '#000000'; // Same as <input type='color' />
  const presetPalettes = [
    {
      name: '',
      value: presetPalette
        ? ['TRANSPARENT', ...getPaletteWithDescription(presetPalette)]
        : ['TRANSPARENT', ...defaultPalette],
    },
    { name: t('grayPalette'), value: grayPalette },
    { name: t('bluePalette'), value: bluePalette },
  ];

  return (
    <>
      <div
        className={styles.swatch}
        onClick={() => setDisplayColorPicker(true)}
      >
        <div className={styles.color} style={{ background: color }} />
        {color.toUpperCase()}
      </div>
      {displayColorPicker && (
        <div className={styles.popover}>
          <div
            className={styles.cover}
            onClick={() => setDisplayColorPicker(false)}
          />
          <CustomColorPicker
            disabled={disabled}
            color={color}
            onChangeComplete={(color) => {
              const colorRepresentation =
                color.rgb.a !== 1
                  ? `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
                  : color.hex;
              onChange(colorRepresentation);
            }}
            presetPalettes={presetPalettes}
          />
        </div>
      )}
    </>
  );
}

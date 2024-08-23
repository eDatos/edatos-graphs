import React from 'react';
import { COLOR_SCHEMES_LABELS } from '../../../constants';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';

const ColorSchemePreview = ({ label, scale, numSamples = 150 }) => {
  const { t } = useTranslation(['visualoptions']);
  let samples;
  if (scale.ticks) {
    samples = scale.ticks(numSamples);
  } else {
    if (scale.domain) {
      samples = scale.domain();
    } else {
      samples = [];
    }
  }
  return (
    <div className="w-100">
      {label && (
        <div style={{ marginBottom: 2 }}>
          {t(get(COLOR_SCHEMES_LABELS, label, label))}
        </div>
      )}
      <div className="d-flex">
        {samples.map((sample) => (
          <div
            key={'sample-' + sample}
            style={{ flex: 1, height: 10, background: scale(sample) }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ColorSchemePreview);

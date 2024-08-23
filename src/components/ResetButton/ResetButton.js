import React, { useCallback } from 'react';
import { useReloadRAW } from '../../hooks/useReloadRAW';
import { useTranslation } from 'react-i18next';

export function ResetButton() {
  const reset = useReloadRAW();

  const handleReset = useCallback(() => {
    reset();
    setTimeout(() => {}, 3000);
  }, [reset]);
  const { t } = useTranslation();

  return (
    <div className="" onClick={handleReset}>
      <button className="text-icon-button btn-thin-cancel" type="button">
        <i className="fa-thin fa-arrow-rotate-right"></i>
        <span>{t('global.reset').toUpperCase()}</span>
      </button>
    </div>
  );
}

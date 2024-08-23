import React from 'react';
import { useTranslation } from 'react-i18next';

export function LoadDataButton({ disabled, loading }) {
  const { t } = useTranslation();

  return (
    <button
      className="text-icon-button btn-thin-first"
      disabled={disabled}
      type="submit"
    >
      <i
        className={'fa-thin fa-cloud-arrow-up ' + (loading ? 'fa-spin' : '')}
      ></i>
      <span>
        {loading
          ? ' ' + t('global.section.loaddata.loadingButton').toUpperCase()
          : t('global.section.loaddata.loadButton').toUpperCase()}
      </span>
    </button>
  );
}

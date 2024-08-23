import React, { useCallback, useState } from 'react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { useTranslation } from 'react-i18next';

export function CopyToClipboardButton({ content }) {
  const copyToClipboard = useCopyToClipboard();
  const [pending, setPending] = useState(false);

  const handleCopy = useCallback(() => {
    if (!pending) {
      setPending(true);
      copyToClipboard(content);
      setTimeout(() => {
        setPending(false);
      }, 3000);
    }
  }, [content, copyToClipboard, pending]);
  const { t } = useTranslation();

  return (
    <div className="" onClick={handleCopy}>
      <button
        className={
          pending
            ? 'text-icon-button btn-thin-default text-success'
            : 'text-icon-button btn-thin-default'
        }
        type="button"
      >
        <i className="fa-thin fa-copy"></i>
        <span>
          {pending
            ? t('global.copiedclipboard').toUpperCase()
            : t('global.copyclipboard').toUpperCase()}
        </span>
      </button>
    </div>
  );
}

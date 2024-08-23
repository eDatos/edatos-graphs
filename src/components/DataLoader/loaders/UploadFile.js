import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import S from './UploadFile.module.scss';
import { useTranslation } from 'react-i18next';
import styles from '../DataLoader.module.scss';

export default function UploadFile({ setUserInput, setLoadingError }) {
  const { t } = useTranslation(['translation']);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        setUserInput(e.target.result);
        setLoadingError(null);
      });
      if (acceptedFiles.length) {
        reader.readAsText(acceptedFiles[0]);
      }
    },
    [setLoadingError, setUserInput]
  );
  const { getRootProps, getInputProps, isDragReject, isDragAccept } =
    useDropzone({
      onDrop,
      accept:
        'text/csv,text/plain,application/json,application/vnd.ms-excel,text/tsv,text/tab-separated-values',
      maxFiles: 1,
    });
  return (
    <>
      <div className={`d-flex ${styles['options-section']}`}>
        <span className={styles['options-section-number']}>
          {t('global.section.loaddata.options.2')}
        </span>
        <span className={styles['options-section-text']}>
          {t('global.section.loaddata.options.label2')}
        </span>
      </div>
      <div
        className={classNames(S.dropzone, {
          [S.reject]: isDragReject,
          [S.accept]: isDragAccept,
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className={S.contentWrapper}>
          <span>{t('global.section.loaddata.project.dragAndBrowseFile')} </span>
          <span>
            <button className="text-icon-button btn-thin-default" type="button">
              <i className="fa-thin fa-file"></i>
              <span>
                {t('global.section.loaddata.project.browseFile').toUpperCase()}
              </span>
            </button>
          </span>
        </div>

        {isDragAccept && <p>{t('global.section.loaddata.project.accepted')}</p>}
        {isDragReject && <p>{t('global.section.loaddata.project.rejected')}</p>}
      </div>
    </>
  );
}

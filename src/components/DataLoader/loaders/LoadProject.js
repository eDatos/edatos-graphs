import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import S from './UploadFile.module.scss';
import styles from '../DataLoader.module.scss';
import { deserializeProject } from '@rawgraphs/rawgraphs-core';
import charts from '../../../charts';
import { useTranslation } from 'react-i18next';

export default function LoadProject({ onProjectSelected, setLoadingError }) {
  const { t } = useTranslation(['translation']);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        try {
          const project = deserializeProject(e.target.result, charts);
          setLoadingError(null);
          onProjectSelected(project);
        } catch (e) {
          setLoadingError(e.message);
        }
      });
      if (acceptedFiles.length) {
        reader.readAsText(acceptedFiles[0]);
      }
    },
    [onProjectSelected, setLoadingError]
  );
  const { getRootProps, getInputProps, isDragReject, isDragAccept } =
    useDropzone({
      onDrop,
      accept: '.edatosgraphs',
      maxFiles: 1,
    });
  return (
    <>
      <div className={`d-flex ${styles['options-section']}`}>
        <span className={styles['options-section-text']}>
          {t('global.section.loaddata.project.message')}
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

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function DataMismatchModal({
  replaceRequiresConfirmation,
  commitDataReplace,
  cancelDataReplace,
}) {
  const [showModal, setShowModal] = useState(true);
  const { t } = useTranslation(['dataloader']);

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <Modal
      className="raw-modal"
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title as="h5">
          {t('datamismatch.warning')}:{' '}
          {replaceRequiresConfirmation === 'parse-error' && (
            <>{t('datamismatch.parsingerror')}</>
          )}
          {replaceRequiresConfirmation.startsWith('missing-column:') && (
            <>{t('datamismatch.missingcolumn')}</>
          )}
          {replaceRequiresConfirmation === 'type-mismatch' && (
            <>{t('datamismatch.typemismatch')}</>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {replaceRequiresConfirmation === 'parse-error' && (
          <>
            <p>{t('datamismatch.parsingerrortitle')}</p>
            <p>{t('datamismatch.parsingerrordesc')}</p>
          </>
        )}
        {replaceRequiresConfirmation.startsWith('missing-column:') && (
          <>
            <p>
              {t('datamismatch.missingcolumntitle')}{' '}
              <span className="font-weight-bold">
                {replaceRequiresConfirmation.split(':')[1]}
              </span>
              , {t('datamismatch.missingcolumntitle2')}
            </p>
            <p>{t('datamismatch.missingcolumndesc')}</p>
          </>
        )}
        {replaceRequiresConfirmation === 'type-mismatch' && (
          <>
            <p>{t('datamismatch.typemismatchtitle')}</p>
            <p>{t('datamismatch.typemismatchdesc')}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={() => {
            commitDataReplace();
          }}
        >
          {t('datamismatch.load')}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            cancelDataReplace();
          }}
        >
          {t('datamismatch.cancel')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DataMismatchModal;

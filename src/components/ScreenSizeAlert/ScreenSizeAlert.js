import React, { useState, useEffect } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { Modal, Button } from 'react-bootstrap';
import { BsEnvelopeFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

// import styles from './ScreenSizeAlert.module.scss'

function ScreenSizeAlert() {
  const size = useWindowSize();
  const [showModal, setShowModal] = useState(size.width < 992);
  const [modalWasClosed, setModalWasClosed] = useState(false);
  const { t } = useTranslation(['translation']);

  const handleClose = () => {
    setShowModal(false);
    setModalWasClosed(true);
  };

  useEffect(() => {
    if (modalWasClosed === false) {
      setShowModal(size.width < 992);
    }
  }, [modalWasClosed, size]);

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
          <span role="img" aria-label="Party icon">
            🎉
          </span>{' '}
          {t('global.screenSizeAlert.header')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="big">{t('global.screenSizeAlert.body.header')}</p>
        <p>
          {t('global.screenSizeAlert.body.text.1')}
          <a href="mailto:?subject=Visit+RAWGraphs+2.0&body=Hello%21%0D%0APlease+do+not+forget+to+take+a+look+at+the+new+version+of+RAWGraphs%21%0D%0A%0D%0AVisit%3A+https%3A%2F%2Fdev.rawgraphs.io%2F%0D%0A%0D%0ASee+you+later%2C%0D%0AThe+RAWGraphs+Team">
            <BsEnvelopeFill /> {t('global.screenSizeAlert.body.text.2')}
          </a>
          {t('global.screenSizeAlert.body.text.3')}
        </p>
        <p>{t('global.screenSizeAlert.body.footer')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          {t('global.screenSizeAlert.gotIt')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ScreenSizeAlert;

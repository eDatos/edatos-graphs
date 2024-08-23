import React from 'react';
import { ReactComponent as Asterisk } from './asterisk.svg';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function RequiredIcon() {
  const { t } = useTranslation();
  return (
    <OverlayTrigger
      key="top"
      placement="top"
      overlay={<Tooltip id={`tooltip-top`}>{t('global.mandatory')}</Tooltip>}
    >
      <Asterisk style={{ marginRight: '2px' }} />
    </OverlayTrigger>
  );
}

export default RequiredIcon;

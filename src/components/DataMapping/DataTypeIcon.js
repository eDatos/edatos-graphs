import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { dataTypeIcons } from '../../constants';
import styles from './DataMapping.module.scss';
import { Translation } from 'react-i18next';

class DataTypeIcon extends React.Component {
  constructor(props) {
    super(props);
    this.iconRef = React.createRef();
  }

  render() {
    const DataTypeIcon = dataTypeIcons[this.props.type];
    const renderTooltip = (props, t) => (
      <Tooltip id={`tooltip-top`} {...props}>
        {t('global.accepts')}{' '}
        {t(`global.section.loaddata.types.${this.props.type}`)}s
      </Tooltip>
    );

    return (
      <Translation ns={'translation'}>
        {(t, { i18n }) => (
          <span>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={renderTooltip(this.props, t)}
            >
              <div ref={this.iconRef} className="d-inline-block">
                <DataTypeIcon className={styles['accepted-type-icon']} />
              </div>
            </OverlayTrigger>
          </span>
        )}
      </Translation>
    );
  }
}

export default DataTypeIcon;

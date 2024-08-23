import React from 'react';
import { Dropdown } from 'react-bootstrap';
import ColorSchemePreview from './ColorSchemePreview';
import {
  colorPresets,
  getColorDomain,
  getPresetScale,
} from '@rawgraphs/rawgraphs-core';
import { CustomToggle } from '../../CustomDropdown/CustomDropdownToggle';
import styles from '../ChartOptions.module.scss';

const ColorSchemesDropDown = ({
  interpolators,
  interpolator,
  setInterpolator,
  // To display color-scale preview
  colorDataset,
  colorDataType,
  scaleType,
  currentFinalScale,
}) => {
  return (
    <Dropdown className="raw-dropdown">
      <Dropdown.Toggle
        as={CustomToggle}
        className="d-flex align-items-center justify-content-between form-control"
        disabled={!colorDataType}
      >
        {currentFinalScale && <ColorSchemePreview scale={currentFinalScale} />}
      </Dropdown.Toggle>
      {colorDataType && (
        <Dropdown.Menu className="w-100">
          {interpolators.map((intrplr) => {
            return (
              <Dropdown.Item
                key={intrplr}
                onClick={() => setInterpolator(intrplr)}
                className={styles['color-scheme-dropdown-item']}
              >
                {colorDataset[0] && colorPresets[scaleType][interpolator] && (
                  <ColorSchemePreview
                    scale={getPresetScale(
                      scaleType,
                      getColorDomain(colorDataset, colorDataType, scaleType),
                      intrplr
                    )}
                    label={intrplr}
                  />
                )}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
};

export default React.memo(ColorSchemesDropDown);

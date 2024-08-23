import React from 'react';

export const CustomDropdownIcon = ({ isOpen }) => (
  <i
    className={
      isOpen
        ? 'input-dropdown-icon fa-thin fa-chevron-up'
        : 'input-dropdown-icon fa-thin fa-chevron-down'
    }
  ></i>
);

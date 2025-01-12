import React, { FC } from 'react';
import { Switch } from '@headlessui/react';
import './Checkbox.scss';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  checked = false,
  onChange = () => {},
  label = 'Checkbox',
}) => {
  return (
    <div className="cc-checkbox-wrapper">
      <Switch
        checked={checked}
        onChange={onChange}
        className={checked ? 'cc-checkbox-checked' : 'cc-checkbox'}
      >
        {label}
      </Switch>
    </div>
  );
};

export default Checkbox;

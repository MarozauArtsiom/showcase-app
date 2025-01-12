import { Switch } from "@headlessui/react";
import "./Checkbox.scss";

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`cc-checkbox ${checked ? "m-checked" : "m-unchecked"}`}
    >
      <span className="sr-only"></span>
      <span aria-hidden="true" className="cc-checkbox__indicator" />
    </Switch>
  );
};

export default Checkbox;

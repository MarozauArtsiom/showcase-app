import { Button as HeadlessButton } from "@headlessui/react";
import "./Button.scss";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  variant = "primary",
}) => {
  return (
    <HeadlessButton
      onClick={onClick}
      disabled={disabled}
      className={`cc-button m-${variant} ${disabled ? "m-disabled" : ""}`}
    >
      {label}
    </HeadlessButton>
  );
};

export default Button;

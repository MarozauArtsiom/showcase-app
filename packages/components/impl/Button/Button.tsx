import React, { FC, ReactNode } from "react";
import "./Button.scss";
import { Button } from "@headlessui/react";

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

const ButtonCmp: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <Button className="cc-button" onClick={onClick}>
      {children}
    </Button>
  );
};

export default ButtonCmp;

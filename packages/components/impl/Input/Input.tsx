import React, { FC, ComponentPropsWithoutRef } from "react";
import { Input as HeadlessInput } from "@headlessui/react";
import "./Input.scss";

/**
 * A thin wrapper around the Headless UI <Input> component, using
 * `@headlessui/react` (v2.1) official docs.
 *
 * Usage example:
 *    <Input type="text" name="full_name" placeholder="Enter your name..." />
 *
 * Additional notes:
 * - You can style focus/hover states using data attributes:
 *    [data-focus], [data-hover], [data-disabled], etc.
 * - Or switch to render props to manage those states in your JSX.
 */
interface InputProps extends ComponentPropsWithoutRef<"input"> {
  // Add any custom props you'd like here
}

const Input: FC<InputProps> = (props) => {
  // Spread all native <input> props onto the Headless UI Input
  return (
    <HeadlessInput {...props} className={`cc-input ${props.className || ""}`} />
  );
};

export default Input;

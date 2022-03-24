import React from "react";
import { ButtonProps } from "./types";

import "./button.css";

const Button = ({
  buttonText,
  disabled,
  handler,
  name,
  value,
}: ButtonProps) => {
  const handleClick = () => handler();

  return (
    <button
      className={name}
      name={name}
      type="button"
      value={value}
      onClick={handleClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
};

export default Button;

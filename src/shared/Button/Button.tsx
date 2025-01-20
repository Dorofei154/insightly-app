import React, { ButtonHTMLAttributes, memo } from "react";
import { useTheme } from "../../utils/hooks";
import styles from "./Button.module.css";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  onClick,
  disabled = false,
  children,
  type = "button",
}) => {
  const { theme } = useTheme();
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${styles.button} ${
        theme === "dark" ? styles.button__dark : styles.button__light
      }`}
    >
      {children}
    </button>
  );
};

export default memo(Button);

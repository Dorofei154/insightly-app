import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";
import { ThemeContextState } from "../../../interfaces/ThemeContextState";

export const useTheme = (): ThemeContextState => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

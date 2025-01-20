import { createContext } from "react";
import { ThemeContextState } from "../../interfaces/ThemeContextState";

export const ThemeContext = createContext<ThemeContextState | undefined>(
  undefined
);

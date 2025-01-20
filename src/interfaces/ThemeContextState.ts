import { Theme } from "../enum/theme";

export interface ThemeContextState {
  theme: Theme;
  toggleTheme: () => void;
}

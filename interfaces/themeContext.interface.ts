import { ThemeColors } from "./themeColors.interface";

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
}
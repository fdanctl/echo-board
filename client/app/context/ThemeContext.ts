import { createContext, useContext } from "react";

export type ThemeType = "dark" | "light" | "system";

export const ThemeContext = createContext<
  { theme: ThemeType | null; changeTheme: (theme: ThemeType) => void } | undefined
>(undefined);

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("ThemeContext must be used within a ThemeContext.Provider");
  }
  return context;
}

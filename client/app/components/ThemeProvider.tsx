import { useState, useEffect, type ReactNode } from "react";
import { ThemeContext, type ThemeType } from "~/context/ThemeContext";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.theme as ThemeType) || "system";
    }
    return "system"; // fallback for SSR
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle(
        "dark",
        localStorage.theme === "dark" ||
        ((!("theme" in localStorage) || localStorage.theme === "system") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
  }, [theme]);

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const THEME_KEY = "theme";

function getInitialTheme() {
  if (typeof window === "undefined") return false;
  const saved = localStorage.getItem(THEME_KEY);
  if (saved !== null) return saved === "dark";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

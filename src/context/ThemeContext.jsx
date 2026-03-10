import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();
const THEME_KEY = "theme";

function getInitialTheme() {
  if (typeof window === "undefined") return true;

  const saved = localStorage.getItem(THEME_KEY);
  
  // Agar pehle se "light" ya "dark" saved hai, toh wahi uthao
  if (saved) {
    return saved === "dark";
  }

  // AGAR KUCH BHI SAVED NAHI HAI (Pehli baar visit), toh Forcefully DARK (true)
  return true; 
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
    
    // Background color ko forcefully body par bhi apply karo
    document.body.style.backgroundColor = isDark ? "#000000" : "#ffffff";
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
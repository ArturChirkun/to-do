import React, { useState, createContext, useEffect } from "react";
import { switchTheme, preTheme } from "../services/local-storage";
// Context has been created
const ThemeContext = createContext();
// Provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(preTheme());
  }, []);


  const toggleTheme = () => {
    setTheme(switchTheme());
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };

import React, { createContext, useContext, useState, useEffect } from "react";

const DarkThemeContext = createContext();

export const DarkThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("darkMode");
      setDarkMode(savedTheme ? JSON.parse(savedTheme) : true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }
  }, [darkMode]);

  return (
    <DarkThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkThemeContext.Provider>
  );
};

export const useDarkThemeContext = () => useContext(DarkThemeContext);

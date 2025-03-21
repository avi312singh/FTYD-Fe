import React, { createContext, useContext, useState, useEffect } from "react";

const DarkThemeContext = createContext();

export const DarkThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <DarkThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkThemeContext.Provider>
  );
};

export const useDarkThemeContext = () => useContext(DarkThemeContext);

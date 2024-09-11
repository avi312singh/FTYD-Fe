import React, { createContext, useContext, useState } from "react";

const DarkThemeContext = createContext();

export const DarkThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkThemeContext.Provider>
  );
};

export const useDarkThemeContext = () => useContext(DarkThemeContext);

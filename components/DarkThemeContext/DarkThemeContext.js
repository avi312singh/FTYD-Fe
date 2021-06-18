import React, { useState, useContext } from "react"

const DarkThemeContext = React.createContext({
  darkMode: false,
  setDarkMode: () => {},
})

export const DarkThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false)

  return (
    <DarkThemeContext.Provider
      value={{
        darkMode: isDark,
        setDarkMode: setIsDark,
      }}
    >
      {children}
    </DarkThemeContext.Provider>
  )
}

const useDarkThemeContext = () => useContext(DarkThemeContext);

export default useDarkThemeContext;

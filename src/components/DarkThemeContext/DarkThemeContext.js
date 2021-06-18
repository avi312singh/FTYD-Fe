import React, { useState, useContext, useEffect } from "react"

const DarkThemeContext = React.createContext({
  darkMode: false,
  setDarkMode: () => { },
})

export const DarkThemeProvider = ({ children }) => {
  console.log("check here ", localStorage.getItem('darkModeLocalStorage'))
  const [isDark, setIsDark] = useState(
    localStorage.getItem('darkModeLocalStorage') !== null ? localStorage.getItem('darkModeLocalStorage') : false
  );
  useEffect(() => {
    localStorage.setItem('darkModeLocalStorage', isDark);
  }, [localStorage.getItem('darkModeLocalStorage'), isDark])


 console.log("isdark in context ", isDark)

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

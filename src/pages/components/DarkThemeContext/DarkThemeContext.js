import React from "react";

const DarkThemeContext = React.createContext({
    darkMode: false,
    setDarkMode:() => {},
});

export default DarkThemeContext
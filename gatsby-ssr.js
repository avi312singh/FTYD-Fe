import React from "react"

import { DarkThemeProvider } from './components/DarkThemeContext/DarkThemeContext'

export const wrapRootElement = ({ element }) => {
    return <DarkThemeProvider>{element}</DarkThemeProvider>
}

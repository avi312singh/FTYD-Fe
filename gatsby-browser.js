import React from "react"

import { DarkThemeProvider } from './src/pages/components/DarkThemeContext/DarkThemeContext'

export const wrapRootElement = ({ element }) => {
  return <DarkThemeProvider>{element}</DarkThemeProvider>
}

import React from "react"

import { DarkThemeProvider } from "./src/components/DarkThemeContext/DarkThemeContext"

export const wrapRootElement = ({ element }) => {
  return <DarkThemeProvider>{element}</DarkThemeProvider>
}

import React from "react"
import { IconButton, Tooltip, useTheme } from "@mui/material"
import LightThemeIcon from "@mui/icons-material/Brightness7"
import DarkThemeIcon from "@mui/icons-material/Brightness4"
import { useDarkThemeContext } from "../DarkThemeContext/DarkThemeContext"

const DarkThemeSwitcher = ({ mobile }) => {
  const theme = useTheme() // Ensure this is from @mui/material/styles
  const { darkMode, setDarkMode } = useDarkThemeContext()

  const handleLightThemeToggle = () => {
    setDarkMode(darkMode => !darkMode)
  }

  return (
    <Tooltip
      title={`${darkMode ? "Light" : "Dark"} Mode`}
      sx={{
        display: mobile
          ? { sm: "none", xs: "flex" }
          : { background: "none", border: "none" },
      }}
      onClick={handleLightThemeToggle}
    >
      <IconButton aria-label={`${darkMode ? "Light" : "Dark"} Mode`}>
        {darkMode ? (
          <LightThemeIcon fontSize={mobile ? "default" : "large"} />
        ) : (
          <DarkThemeIcon fontSize={mobile ? "default" : "large"} />
        )}
      </IconButton>
    </Tooltip>
  )
}

export default DarkThemeSwitcher

import React from "react"
import { IconButton, Tooltip } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import LightThemeIcon from "@material-ui/icons/Brightness7"
import DarkThemeIcon from "@material-ui/icons/Brightness4"
import useDarkThemeContext from "../DarkThemeContext/DarkThemeContext"

const useStyles = makeStyles(theme => ({
  darkThemeButton: {
    background: "none",
    border: "none",
  },
  darkThemeMobileButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    [theme.breakpoints.down("sm")]: {
      background: "none",
      border: "none",
      display: "visible",
      paddingLeft: theme.spacing(2),
      minWidth: "25%",
    },
  },
  menuHeaderText: {
    minWidth: "97%",
  },
}))

const DarkThemeSwitcher = ({ mobile }) => {
  const classes = useStyles()
  const { darkMode, setDarkMode } = useDarkThemeContext();

  const handleLightThemeToggle = () => {
    setDarkMode(darkMode => !darkMode)
  }

  const mobileSize = mobile ? "default" : "large"

  return (
    <Tooltip
      title={`${darkMode ? 'Light' : "Dark"} Mode`}
      className={mobile ? classes.darkThemeMobileButton : classes.darkThemeButton}
      onClick={handleLightThemeToggle}
    >
      <IconButton aria-label={`${darkMode ? 'Light' : "Dark"} Mode`}>
        {darkMode ? <LightThemeIcon fontSize={mobileSize} /> : <DarkThemeIcon fontSize={mobileSize}/>}
      </IconButton>
    </Tooltip>
  )
}

export default DarkThemeSwitcher

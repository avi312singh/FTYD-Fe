import React from "react"
import PropTypes from "prop-types"
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Toolbar,
  Typography,
  SwipeableDrawer,
} from "@material-ui/core"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import SearchIcon from "@material-ui/icons/Search"
import PieChartIcon from '@material-ui/icons/PieChart';
import HomeIcon from "@material-ui/icons/Home"
import InfoIcon from "@material-ui/icons/Info"
import PersonIcon from "@material-ui/icons/Person"
import MenuIcon from "@material-ui/icons/Menu"
import DarkThemeSwitcher from "../DarkThemeSwitcher/DarkThemeSwitcher"
import useDarkThemeContext from "../DarkThemeContext/DarkThemeContext"
import { Link } from "gatsby"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  darkModeButton: {
    background: "none",
    border: "none",
  },
  darkModeMobileButton: {
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
    minWidth: "92%",
  },
  homeLogo: {
    [theme.breakpoints.down("sm")]: {
      minWidth: "150%",
      // paddingLeft: theme.spacing(10)
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: "0%",
      // paddingLeft: theme.spacing(10)
    },
  },
}))

const NavDrawer = ({ children, window }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { darkMode } = useDarkThemeContext()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const linkStyles = {
    textDecoration: "none",
    color: darkMode ? "white" : "black",
  }

  const activeStyle = {
    textDecoration: "none",
    color: "red",
  }

  const appBarColour = darkMode ? { 'background-color': '#333' } : { 'background-color':'#2196f3'};

  const darkModeStyling = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  })

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <DarkThemeSwitcher mobile />
      <Divider />
      <List>
        {[
          { text: "Home", href: "/", icon: <HomeIcon /> },
          { text: "Weekly Leaderboards", href: "/top-players/", icon: <PersonIcon /> },
          { text: "Donate", href: "/donate/", icon: <AttachMoneyIcon /> },
          { text: "Server Info", href: "/server-info/", icon: <InfoIcon /> },
          { text: "Player Stats", href: "/player-stats/", icon: <SearchIcon /> },
          { text: "Server Data", href: "/server-data/", icon: <PieChartIcon /> },
        ].map((link, index) => (
          <ListItem key={link.text}>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <Link
              to={link.href}
              activeStyle={activeStyle}
              style={linkStyles}
            >
              {link.text}
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <ThemeProvider theme={darkModeStyling}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar style={appBarColour} position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.menuHeaderText} variant="h6" noWrap>
              <IconButton className={classes.homeLogo}>
                <Link to="/">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 256 256">
                  <path d="M124.3 8.7c1.5.2 3.7.2 5 0 1.2-.2 0-.4-2.8-.4-2.7 0-3.8.2-2.2.4zM136.1 10.6c-1.9 2.4-1.9 2.8-.4 5 2.1 3.3 6.5 3.2 9.1-.1 1.1-1.4 2.7-2.5 3.6-2.5 2.6 0 1.9-1.8-1.4-3.5s-5.4-2-4.5-.5c.3.5.1 1-.4 1-.6 0-1.1-.5-1.1-1 0-1.9-2.9-1-4.9 1.6zm4.9.9c1.1 1.3 1 1.8-.6 3s-2.1 1.2-3.3 0c-1.2-1.1-1.2-1.7-.1-2.9 1.6-2 2.4-2 4-.1zM104.3 10.7c1.5.2 3.7.2 5 0 1.2-.2 0-.4-2.8-.4-2.7 0-3.8.2-2.2.4zM165 12.1c-2 1.6-3.5 1.9-7.5 1.4l-5-.5 2.4 2c3.4 3 6.6 2.4 11.5-2.1 2.7-2.6 1.6-3.2-1.4-.8zM90.8 12.7c1.2.2 3 .2 4 0 .9-.3-.1-.5-2.3-.4-2.2 0-3 .2-1.7.4zM78.8 14.7c.7.3 1.6.2 1.9-.1.4-.3-.2-.6-1.3-.5-1.1 0-1.4.3-.6.6zM110.2 21.2c-.5.5-3.2.9-6.1 1-3.2 0-5.7.6-6.7 1.5-1.2 1.2-1.7 1.3-3 .3-1.1-1-2.1-1-3.7-.3-1.3.6-3.5.9-4.9.6-1.4-.3-2.9 0-3.2.6-.4.6-1.6 1.1-2.7 1.1s-2.2.7-2.5 1.5c-.4 1-1.4 1.3-3 .9-1.3-.3-4.2.1-6.4 1s-5 1.6-6.3 1.7c-1.2 0-4.6 1.2-7.6 2.7l-5.5 2.7-.1 6c-.1 3.3-.4 6.7-.7 7.5-.8 2.2-2.7 11.6-3.8 18.5-.5 3.3-.7 9.6-.3 14 .5 7 .7 19.8.4 27.4-.1 2.3-.2 2.3-1.9.8-2.6-2.4-4.5-2.1-7.1.9-3.1 3.6-2.2 7.4 1.8 7.4 1.6 0 3.6-.6 4.4-1.4 2.2-2.2 3.7-.4 4.7 5.5 1.6 9.9 2.2 12.4 4.2 19.4 6.1 21.4 19 44.8 31.6 57.8 5.5 5.6 20.7 19.2 30.2 26.9 17.3 14 25.2 11.7 56.6-17.1 20.5-18.7 31.2-35.3 40.3-62.1 1.5-4.7 3.4-11 4.1-14 .7-3 1.6-6.5 2.1-7.8.5-1.3.9-3.3.9-4.5.1-2.1.2-2.1 2.1.5 1.6 2.2 2.5 2.6 5 2.1 2.6-.5 2.9-.3 2.9 1.8 0 5.5-7.5 31.7-11.5 40.6-.8 1.7-1.5 3.6-1.5 4.1 0 .6-1.8 1.3-4 1.7-3 .5-4 1.1-4 2.6 0 2.3.1 2.3 4.4.5 3.3-1.4 4.5-3.2 8.6-13.6 3.9-9.8 11.1-40 10.9-45.9l-.1-3.6-1.3 4c-.8 2.2-1.4 3.4-1.4 2.6-.1-1.7-3.1-4-5.3-4.1-.9 0-2.4 1-3.4 2.2l-1.6 2.3.6-2.8c2.5-10.7 2.9-28.7 1-39.2-.2-1.1-.6-6.3-.9-11.5-.3-5.2-.8-12.9-1.2-17-.4-4.1-.8-8.4-.8-9.4-.1-2.2-5.3-5.3-10.5-6.2-1.9-.3-5.5-1.5-8-2.7-2.5-1.1-5.3-2-6.3-1.9-.9 0-2.9-.5-4.3-1.3-1.5-.7-3.3-1.1-4.1-.8-.8.3-1.8 0-2.2-.6-.5-.7-3.2-1.3-6.2-1.4-3-.1-5.7-.6-6-1.1-1.7-2.3-54.6-4.5-56.7-2.4zm22.3 6.8c.3.5.1 1-.4 1-.6 0-1.1-.5-1.1-1 0-.6.2-1 .4-1 .3 0 .8.4 1.1 1zM97 32c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm32 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm-84 4c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm65.4 1.6c4.7.6 4.8.7 4.2 3.7-.3 1.7-1.3 3.8-2 4.6-1.1 1.2-1.3 3.8-1 10.3.3 5.3 0 8.9-.6 9.3-.6.3-4.7-.1-9.1-1-12.9-2.7-29.1-1.2-39.6 3.6-9.7 4.4-21 15.5-24.7 24.3-1.8 4.4-2.1 13.1-.5 14.2.6.3.8 1.7.5 3-.4 1.4 0 3.7 1 5.5 1.3 2.6 1.4 3.6.4 5.4-1.4 2.6-.5 5.1 1.3 3.7 1.8-1.4 4.9.1 8.8 4.4 4 4.5 12.4 10.8 16 12 3.4 1.1 4.1 1.2 16.7 2.5 9.7 1 11.9.9 15-.4 2.1-.8 4.6-1.5 5.7-1.5 1.1 0 4.9-.5 8.5-1.1 3.5-.5 6.6-.9 6.8-.7.1.2-.3 1.5-.9 2.9-1.1 2.5-3.9 4.1-8.9 5.3-9.4 2.2-12.1 2.7-17 2.9-3 .2-6.2.6-7.1 1-1 .3-1.9.3-2.2-.2-.3-.4-4.4-.7-9.1-.6-6.5.1-9.5.6-11.9 2-3.5 2.1-10.7 2.3-13 .4-.9-.7-2.4-.8-4.5-.1-1.8.5-3.6.9-4 .9-3.2.4-10.2 3.2-10.2 4.1 0 1.7 18.9 3.7 19.1 2.1.1-.6.3-1.6.4-2.1.1-.6.3-1.2.4-1.5 0-.3.7 0 1.5.7 1 1 1.1 1.7.2 3.1-.9 1.4-.8 2 .4 2.7 2.2 1.4 4 1.2 4.6-.5.9-2.1 2.4-1.9 2.4.4 0 2.5.9 3 7.8 4.6 4.7 1.1 8.4 1.1 22-.1 15.9-1.4 20.2-2.4 20.2-4.5 0-.7-3-.9-8.2-.7-6.9.2-8.3 0-8.3-1.2 0-1 1.2-1.6 3.4-1.8 2.1-.2 3.1 0 2.6.7-.9 1.6 1.2 1.4 3.8-.3 1.2-.8 4.7-1.6 7.7-1.8l5.5-.3-.2 3c-.7 8-1.8 10-6.6 11.5-10.8 3.4-49.1 2.9-63.1-.8-2.2-.6-4.3-.9-4.7-.6-.4.2-.9-.5-1.2-1.5-.2-1.1-1.7-2.1-3.6-2.5-1.7-.3-4.6-.9-6.3-1.2-1.8-.4-3.8-1.5-4.5-2.4-.7-1-2.7-2.3-4.5-3-1.8-.8-4.8-2.4-6.7-3.7-2.1-1.3-4.3-2-5.6-1.7-1.6.4-2.4-.1-3.3-2-.6-1.4-1.6-2.6-2.2-2.6-.5 0-1-.6-1-1.4 0-.7-.9-1.6-2-1.9-1.1-.3-2.5-1.8-3.1-3.4-.6-1.5-2-4.5-3-6.6-1.1-2.2-1.9-5.2-1.9-6.7 0-1.6-.4-3.2-1-3.5-.5-.3-1-2.4-1-4.6 0-2.1-.5-3.9-1.1-3.9-.7 0-.9-3-.5-9.3.9-17.7 1.2-18.6 7.1-24.7 6.7-7 7.5-8.6 7.5-15.5 0-5.1.3-6 3.1-8.6 1.7-1.6 4-2.9 5.1-2.9 1.1 0 4-2 6.4-4.5 5.9-5.9 15.4-10.1 17.7-7.9.4.4.3 1.2 0 1.8-.9 1.4-1.6 8.2-.7 7.4.3-.4 1.9-.1 3.5.8 3.6 1.8 4.1 6.3.9 7.1l-2.1.6 2.1 1.9c3 2.8 5 1.6 5-3 0-2.3.6-4.5 1.5-5.2.9-.8 1.5-3 1.5-6 0-6.2 3.2-11.1 8.2-12.5 3.9-1.1 47.6-1 56.2.1zM73 40c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm-44 4c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm-12 4c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm8 0c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm-4 4c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm-4 4c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm-23.9 55.6c1 1.3 1 1.7-.2 2.5-.8.5-1.6.9-1.9.9-.3 0-1.1-.4-1.9-.9-1.2-.8-1.2-1.2-.2-2.5.8-.9 1.7-1.6 2.1-1.6.4 0 1.3.7 2.1 1.6zm181.9 5.9c1.1 1.3 1 1.8-.6 3s-2.1 1.2-3.3 0c-1.2-1.1-1.2-1.7-.1-2.9 1.6-2 2.4-2 4-.1zm-67.4 44.3c-.8.8-5.8 1.2-6.8.6-1.8-1.1.2-2 3.7-1.6 2 .2 3.4.7 3.1 1zm-12.9-.2c-.3.3-1.2.4-1.9.1-.8-.3-.5-.6.6-.6 1.1-.1 1.7.2 1.3.5z" />
                  <path d="M140 45c0 .5.6 1 1.4 1 .8 0 1.8-.5 2.1-1 .3-.6-.3-1-1.4-1-1.2 0-2.1.4-2.1 1zM110 68.9c0 1.2.5 2.1 1 2.1.6 0 1-.6 1-1.4 0-.8-.4-1.8-1-2.1-.5-.3-1 .3-1 1.4zM91 103c-5.1 5-6.6 7.9-3.2 6.1 2.3-1.2 10.6-11.1 9.3-11.1-.6 0-3.3 2.2-6.1 5zM83.7 110.7c-.4.3-.7 1.1-.7 1.7 0 .6.5.5 1.2-.2.6-.6.9-1.4.7-1.7-.3-.3-.9-.2-1.2.2zM42.5 30.4c-2.5 2.5-2.5 2.7-.9 5.1 1.9 3 4.4 3.2 6.7.7s2.1-3.4-.7-6.1l-2.5-2.3-2.6 2.6zm4.5 1.1c1.1 1.3 1 1.8-.6 3s-2.1 1.2-3.3 0c-1.2-1.1-1.2-1.7-.1-2.9 1.6-2 2.4-2 4-.1zM213.6 31.2c-1.4 1.9-1.3 2.4.5 5 2.7 3.7 7.2 3.9 9.5.4 1.2-1.9 1.3-2.9.5-4.3-.6-1-1.1-1.3-1.1-.5s-.8.6-2.2-.8c-2.8-2.6-5.3-2.5-7.2.2zm5.4.3c1.1 1.3 1 1.8-.6 3s-2.1 1.2-3.3 0c-1.2-1.1-1.2-1.7-.1-2.9 1.6-2 2.4-2 4-.1zM226.1 45.2c.1.7.5 2.4.9 3.8.8 2.4.8 2.4.9-.7.1-1.7-.3-3.5-.9-3.8-.5-.3-1 0-.9.7zM31.3 73c0 3.6.2 5 .4 3.2.2-1.7.2-4.7 0-6.5-.2-1.7-.4-.3-.4 3.3zM227.6 76.6c-1 3.7-.2 3.9 1.1.4.6-1.7.8-3 .3-3-.4 0-1.1 1.2-1.4 2.6zM31.3 106c0 3 .2 4.3.4 2.7.2-1.5.2-3.9 0-5.5-.2-1.5-.4-.2-.4 2.8zM229.2 106c0 1.4.2 1.9.5 1.2.2-.6.2-1.8 0-2.5-.3-.6-.5-.1-.5 1.3zM34 130.1c-.1 7.1 8.3 32.6 15.6 47 8.4 16.9 14.6 25.3 20.6 28.3 1.3.6 3.6 3.8 5.2 6.9 2.4 4.8 5.1 7.7 14.3 15.5 6.3 5.3 13.3 10.5 15.6 11.6 2.3 1 4.9 2.4 5.7 3 .8.7 3.7 2.1 6.3 3 2.6 1 6.1 2.9 7.6 4.2 4.2 3.5 9.6 3.2 17.9-1 9.3-4.7 14.7-8.9 17.7-13.6 1.8-2.8 3.2-4 4.9-4 4.2 0 27-21.8 31.2-29.8 1.4-2.6 2-9.2.8-7.9-.4.3-1.5-.5-2.6-1.8-2.1-2.7-4.7-3.2-6.6-1.3-2.7 2.7-.2 7.7 4.2 8 1.4.1 2.6.4 2.6.7 0 .2-1.9 2.9-4.2 5.9-5.1 6.6-17.2 16.4-24.6 19.9-5 2.4-9.2 6.3-9.2 8.6 0 1.3-5.2 5.7-6.7 5.7-.6 0-1.3.3-1.5.7-.5 1.3-8.5 5.3-10.5 5.3-1.2 0-1.9-.8-2-2.1-.2-2.7-3.1-5.9-5.4-5.9-1 0-2.5 1-3.3 2.1-1.3 1.9-1.3 2.4 0 4.4 1.3 2 1.3 2.4-.1 3.5-1.2 1-1.5 1-1.5-.3 0-.9-1-2.2-2.2-2.8-1.2-.7-2.9-2.1-3.8-3.1-1-1.3-2.8-1.9-5.7-2-3.9 0-5.4-1.1-5.7-4.2-.1-1.4-2.6-2-2.6-.6 0 1.3-3.7-.5-6-3-.8-.9-3.1-2.7-5-4-6.2-4.2-17-14.2-16.4-15.1.3-.5-.2-.9-1-.9-1.8 0-3.2-3.8-1.8-5.2.7-.7.6-1.8-.6-3.6-.9-1.3-1.5-4-1.4-6 .3-3.8-2-7.2-4.8-7.2-2 0-5 3-5 5 0 .7-1.1 0-2.5-1.6s-2.5-3.3-2.5-3.7c0-.4-.9-1.8-2.1-3-2.7-2.8-10.8-19.2-14.4-28.9-1.5-4-4-12.3-5.5-18.3-1.6-6.1-2.9-9.8-3-8.4zm37.1 61.5c1 1.3 1 1.7-.2 2.5-3.2 2-6.1 0-3.9-2.6 1.6-1.9 2.4-1.9 4.1.1zm121.9-.1c1.1 1.3 1 1.8-.6 3s-2.1 1.2-3.3 0c-1.2-1.1-1.2-1.7-.1-2.9 1.6-2 2.4-2 4-.1zm-126.3 7.7c-.3.7-.5.2-.5-1.2s.2-1.9.5-1.3c.2.7.2 1.9 0 2.5zm6.8 3.4c.9 1.4 1.4 2.8 1.2 3.1-.3.2-1.1-.5-1.7-1.7-.6-1.1-2.1-2.5-3.3-3l-2.2-.9h2.1c1.3-.1 2.9 1 3.9 2.5zm59.5 36.9c1.1 1.3 1 1.8-.6 3s-2.1 1.2-3.3 0c-1.2-1.1-1.2-1.7-.1-2.9 1.6-2 2.4-2 4-.1zM200.5 181.1c-1 1.5.3 2.5 1.6 1.2.7-.7.7-1.3.1-1.7-.6-.3-1.4-.1-1.7.5z" />
                </svg>
                </Link>
              </IconButton>
            </Typography>
            <DarkThemeSwitcher mobile={false} />
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="navigation links">
          <Hidden smUp implementation="css">
            <SwipeableDrawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onOpen={console.debug("mobile draw open")}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </SwipeableDrawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}

NavDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default NavDrawer

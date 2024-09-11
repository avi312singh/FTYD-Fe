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
  useTheme,
} from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import SearchIcon from "@mui/icons-material/Search"
import HomeIcon from "@mui/icons-material/Home"
import InfoIcon from "@mui/icons-material/Info"
import PersonIcon from "@mui/icons-material/Person"
import MenuIcon from "@mui/icons-material/Menu"
import PieChartIcon from "@mui/icons-material/PieChart"
import DarkThemeSwitcher from "../DarkThemeSwitcher/DarkThemeSwitcher"
import { useDarkThemeContext } from '../DarkThemeContext/DarkThemeContext';
import { Link } from "gatsby"

const drawerWidth = 240

const NavDrawer = ({ children, window }) => {
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

  const appBarColour = darkMode
    ? { backgroundColor: "#333" }
    : { backgroundColor: "#2196f3" }

  const darkModeStyling = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  })

  const drawer = (
    <div>
      <div sx={theme.mixins.toolbar} />
      <DarkThemeSwitcher mobile />
      <Divider />
      <List>
        {[
          { text: "Home", href: "/", icon: <HomeIcon /> },
          { text: "Weekly Leaderboards", href: "/top-players/", icon: <PersonIcon /> },
          { text: "Donate", href: "/donate/", icon: <AttachMoneyIcon /> },
          { text: "Current Players", href: "/server-info/", icon: <InfoIcon /> },
          { text: "Player Stats", href: "/player-stats/", icon: <SearchIcon /> },
          { text: "Server Data", href: "/server-data/", icon: <PieChartIcon /> },
        ].map((link) => (
          <ListItem key={link.text}>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <Link to={link.href} activeStyle={activeStyle} style={linkStyles}>
              {link.text}
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <ThemeProvider theme={darkModeStyling}>
      <div sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ ...appBarColour, width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography sx={{ flexGrow: 1 }} variant="h6" noWrap>
              <IconButton>
                <Link to="/"> {/* Your logo here */}</Link>
              </IconButton>
            </Typography>
            <DarkThemeSwitcher mobile={false} />
          </Toolbar>
        </AppBar>
        <nav aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <SwipeableDrawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              onOpen={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
              }}
            >
              {drawer}
            </SwipeableDrawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              sx={{
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main sx={{ flexGrow: 1, p: 3 }}>
          <div sx={theme.mixins.toolbar} />
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}

NavDrawer.propTypes = {
  window: PropTypes.func,
}

export default NavDrawer

import React, { useEffect } from "react"
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
import usePageTracking from "../../utils/usePageTracking"
import { useLocation } from "@reach/router"
import { Link } from "gatsby"
import LogoWithEffects from "../LogoWithEffects/LogoWithEffects"

const drawerWidth = 240

const NavDrawer = ({ children, window: windowProp }) => {
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { darkMode } = useDarkThemeContext()
  usePageTracking();

  const location = useLocation()

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0); // Wait for the route to fully mount
  
    return () => clearTimeout(timeout); // cleanup
  }, [location.pathname]);

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
    {/* YouTube Playlist */}
    <ListItem>
      <ListItemIcon>
        <img
          src="https://img.icons8.com/color/48/youtube-play.png"
          alt="YouTube"
          width={24}
          height={24}
        />
      </ListItemIcon>
      <a
        href="https://www.youtube.com/watch?v=0FU3iAdJwsU&list=PLqBaHNBE-DBxLB8VfMaaAONaJJ3Jxf5bz&index=1&t=4s&pp=gAQBiAQB8AUB"
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...linkStyles, display: "block", width: "100%" }}
      >
        FTYD Playlist
      </a>
    </ListItem>

    {/* Join Discord */}
    <ListItem>
      <ListItemIcon>
        <img
          src="https://img.icons8.com/color/48/discord-logo.png"
          alt="Discord"
          width={24}
          height={24}
        />
      </ListItemIcon>
      <a
        href="https://discord.gg/EjpnynHR2B"
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...linkStyles, display: "block", width: "100%" }}
      >
        Join Discord
      </a>
    </ListItem>
  </List>

      <Divider />
    </div>
  )

  const container = windowProp !== undefined ? () => window().document.body : undefined

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
            <IconButton component={Link} to="/">
            <LogoWithEffects darkMode={darkMode}/>
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

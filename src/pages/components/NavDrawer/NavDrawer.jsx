import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LightThemeIcon from '@material-ui/icons/Brightness7';
import DarkThemeIcon from '@material-ui/icons/Brightness4';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Link } from "gatsby"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
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
    darkThemeButton: {
        background: "none",
        border: "none",
    },
    darkThemeMobileButton: {
        [theme.breakpoints.up('sm')]: {
            display: "none",
        },
        [theme.breakpoints.down('sm')]: {
            background: "none",
            border: "none",
            display: "visible",
            paddingLeft: theme.spacing(2),
            minWidth: '25%'

        },
    },
    menuHeaderText: {
        minWidth: '97%',
    }
}));

const NavDrawer = ({ children, window }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [darkTheme, setDarkTheme] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLightThemeToggle = () => {
        setDarkTheme(!darkTheme);
    };

    const linkStyles = {
        textDecoration: "none",
        color: darkTheme ? "white" : "black"
    }

    const activeStyle = {
        textDecoration: "none",
        color: "red"
    }

    const darkThemeStyling = createMuiTheme(darkTheme ? {
        palette: {
            type: "dark",
        }
    } :
        {
            palette: {
                type: "light",
            }
        });

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            {darkTheme ?
                <Tooltip title="Light Mode" className={classes.darkThemeMobileButton} onClick={handleLightThemeToggle}>
                    <IconButton aria-label="Light Mode">

                        <DarkThemeIcon />
                    </IconButton>
                </Tooltip>
                :
                <Tooltip title="Dark Mode" className={classes.darkThemeMobileButton} onClick={handleLightThemeToggle}>
                    <IconButton aria-label="Dark Mode">

                        <LightThemeIcon />
                    </IconButton>
                </Tooltip>
            }
            <Divider />
            <List>
                {[{ text: 'Home', href: '/', icon: <HomeIcon /> }, { text: 'Leaderboards', href: '/top-players', icon: <PersonIcon /> },
                { text: 'Donate', href: '/donate', icon: <AttachMoneyIcon /> }, { text: 'Server Info', href: '/server-info', icon: <InfoIcon /> },
                { text: 'Player Stats', href: '/player-stats', icon: <SearchIcon /> }]
                    .map((link, index) => (
                        <ListItem key={link.text}>
                            <ListItemIcon>{link.icon}</ListItemIcon>
                            <Link to={link.href} activeStyle={activeStyle} style={linkStyles} state={{ darkTheme: darkTheme }}>{link.text}</Link>
                        </ListItem>
                    ))}
            </List>
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    const darkThemeState = window !== undefined ? () => window().history.state : undefined;

    return (
        <ThemeProvider theme={darkThemeStyling}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
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
                            Fall to your death
          </Typography>
                        {darkTheme ?
                            <Tooltip title="Light Mode" className={classes.darkThemeButton} onClick={handleLightThemeToggle}>
                                <IconButton aria-label="Light Mode">

                            <DarkThemeIcon />
                             </IconButton>
                            </Tooltip>
                         :
                            <Tooltip title="Dark Mode" className={classes.darkThemeButton} onClick={handleLightThemeToggle}>
                                    <IconButton aria-label="Dark Mode">

                                <LightThemeIcon />
                                </IconButton>
                               </Tooltip>
                            }
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="navigation links">
                    <Hidden smUp implementation="css">
                        <SwipeableDrawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
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
    );
}

NavDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default NavDrawer;

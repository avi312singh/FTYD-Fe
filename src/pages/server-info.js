import React, { useEffect, useState } from "react"
import axios from 'axios'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import MUIDataTable from "mui-datatables";
import CircularProgress from '@material-ui/core/CircularProgress';


import { Link } from "gatsby"

import 'react-dropdown/style.css';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    graphContainer: {
        paddingTop: '16px',
    },
    durationDropdown: {
        paddingTop: '8px'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    serverStatus: {
        marginBottom: theme.spacing(3),
    }
}))

export default function ServerInfo() {
    const [open, setOpen] = React.useState(false);
    const [response, setResponse] = useState([]);
    const [players, setPlayers] = useState([]);
    const [serverInfo, setServerInfo] = useState({ loading: true });
    const classes = useStyles();

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const theme = useTheme();

    const endpoint = process.env.GATSBY_ENDPOINT || (() => { new Error("Provide an endpoint in env vars") });
    const authorisation = process.env.GATSBY_AUTHORISATION || (() => { new Error("Provide a server IP in env vars") });
    const config = {
        method: 'get',
        url: `${endpoint}serverStats`,
        headers: {
            'Authorization': `Basic ${authorisation}`,
        }
    }

    useEffect(() => {
        axios(config)
            .then((response) => {
                if (response.status === 201 || 200) {
                    setTimeout(() => {
                        setResponse(response.data.response);
                        setServerInfo(response.data.response[0].directQueryInfo, { loading: false })
                        if (serverInfo.status === "online") {
                            setPlayers(response.data.response[1].directPlayerInfo)
                        }
                        console.log(response);
                    }, 1000
                    )
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    // if(serverInfo.status === "online") {
    //     const playersAmount = players && response[1]?.directPlayerInfo?.map(Object.values).length
    //     const indexForDuration = playersAmount + 2;

    //     for (var i = 0; i < playersAmount; i++) {
    //         const player = players[i];
    //         for (var j = 2; j < indexForDuration * 2; j += 2) {
    //             player[j] = player[j] / 60;
    //         }
    //     }
    // }

    const columns = ["Name", "Score", "Seconds"];

    const options = {
        filterType: 'checkbox',
    };

    const linkStyles = {
        textDecoration: "none",
        color: "black"
    }

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Menu
          </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {[{ text: 'Home', href: '/', icon: <HomeIcon /> }, { text: 'Top Players', href: '/top-players', icon: <PersonIcon /> }, { text: 'Donate', href: '/donate', icon: <AttachMoneyIcon /> }, { text: 'Server Info', href: '/server-info', icon: <InfoIcon /> }].map((link, index) => (
                            <ListItem key={link.text}>
                                <ListItemIcon>{link.icon}</ListItemIcon>
                                <Link to={link.href} style={linkStyles}>{link.text}</Link>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <div>
                        <h2>Fall to your death server</h2>
                    </div>
                    {<MUIDataTable
                        title={"Current Players"}
                        data={players}
                        columns={columns}
                        options={options}
                    />}
                    <Typography className={classes.serverStatus}>
                        Server Status:
                        {serverInfo.loading === true ? <CircularProgress size="1.5rem" />
                            : serverInfo.status === "online" ? <CheckIcon /> : <ErrorIcon />}
                    </Typography>

                </main>
            </div>
        </>)
}

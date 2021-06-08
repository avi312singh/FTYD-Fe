import React from "react"
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
import TextField from '@material-ui/core/TextField';


import { Link } from "gatsby"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
        marginLeft: theme.spacing(3),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    PayPalButton: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(5)
    },
    amountInput: {
        marginTop: theme.spacing(1),
    }
}))

export default function Home() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const theme = useTheme();

    const linkStyles = {
        textDecoration: "none",
        color: "black"
    }

    const [donationAmount, setDonationAmount] = React.useState("5.00");
    const [orderID, setOrderID] = React.useState(false);


    const donationAmountRegex = /^[0-9]*\.{1}[0-9][0-9]$/g;
    const clientId = process.env.GATSBY_PAYPAL_CLIENTID;

    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: donationAmount,
                        },
                    },
                ],
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
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
                    <Typography>
                        Please support the server and this site for future content and free hosting!
                    </Typography>
                    {
                        donationAmount.match(donationAmountRegex) ?
                            <form className={classes.amountInput} noValidate autoComplete="off">
                                <TextField defaultValue="5.00"
                                    id="outlined-basic"
                                    label="Donation Amount"
                                    variant="outlined"
                                    style={{ "minWidth": "55%", "margin-left": "40px" }}
                                    onChange={e => setDonationAmount(e.target.value)} />
                            </form>
                            :
                            <form className={classes.amountInput} noValidate autoComplete="off">
                                <TextField defaultValue="5.00"
                                    label="Error" helperText="Please enter a valid donation amount greater than 0.01"
                                    id="outlined-basic"
                                    label="Donation Amount"
                                    variant="outlined"
                                    style={{ "minWidth": "55%", "margin-left": "40px" }}
                                    onChange={e => setDonationAmount(e.target.value)} />
                            </form>
                    }
                    <div className={classes.PayPalButton}>
                        <PayPalScriptProvider options={{ "client-id": clientId, currency: "GBP", "disable-funding": "sofort"}}>
                            {donationAmount.match(donationAmountRegex) ? <PayPalButtons createOrder={createOrder}/> : <PayPalButtons disabled/>}
                        </PayPalScriptProvider>
                    </div>
                    {console.log(donationAmount.replace(/^0+/, ''))}
                </main>
            </div>
        </>)
}

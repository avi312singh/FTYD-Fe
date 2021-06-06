import React, { useEffect, useState } from "react"
import axios from 'axios'
import Dropdown from 'react-dropdown';
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts'
import { Container, Tab, Tabs } from "@material-ui/core";
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
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import KillsPieChart from './components/KillsPieChart/KillsPieChart'
import 'react-dropdown/style.css';

const drawerWidth = 240;
const options = [
  { value: 288, label: 'Day' },
  { value: 2016, label: 'Week' },
  { value: 8760, label: 'Month' },
];

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
}))

export default function Home() {
  const endpoint = process.env.GATSBY_ENDPOINT || (() => { new Error("Provide an endpoint in env vars") });
  const authorisation = process.env.GATSBY_AUTHORISATION || (() => { new Error("Provide a server IP in env vars") });
  const [response, setResponse] = useState([]);
  const [currentOption, setCurrentOption] = useState(288)
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const [config, setConfig] = React.useState({
    method: 'get',
    url: `${endpoint}aggregatedstats/playerCount?duration=${currentOption}`,
    headers: {
      'Authorization': `Basic ${authorisation}`,
    }
  })

  useEffect(() => {
    console.log(config)
    axios(config)
      .then((response) => {
        if (response.status === 201 || 200) {
          setResponse(response.data.result.response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentOption, config])

  const defaultOption = options[0];

  const parseSelected = (event) => {
    const valueToParse = event.value;
    setCurrentOption(valueToParse);
    setConfig({
      method: 'get',
      url: `${endpoint}aggregatedstats/playerCount?duration=${valueToParse}`,
      headers: {
        'Authorization': `Basic ${authorisation}`,
      }
    })
  }

  const classes = useStyles();

  const handleTabChange = (event, newValue) => {
    setCurrentOption(288);
    if (value !== newValue) {
    setValue(newValue);
      switch (newValue) {
    default: console.error("Unknown value: ", newValue)
    break;
    case 0:
        setConfig({
          method: 'get',
          url: `${endpoint}aggregatedstats/playerCount?duration=${currentOption}`,
          headers: {
            'Authorization': `Basic ${authorisation}`,
          }
        })
      break;
    case 1:
        setConfig({
          method: 'get',
          url: `${endpoint}aggregatedstats/killCount?duration=999`,
          headers: {
            'Authorization': `Basic ${authorisation}`,
          }
        })
      break;
    case 2:
        setConfig({
          method: 'get',
          url: `${endpoint}aggregatedstats/durationCount?duration=999`,
          headers: {
            'Authorization': `Basic ${authorisation}`,
          }
        })
      break;
    }
  }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const theme = useTheme();

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
            {[{text: 'Home', href: 'home'}, {text: 'Top Players', href: 'top-players'}, {text: 'Donate', href: 'donate'}, {text: 'Server Info', href: 'server-info'}].map((link, index) => (
              <ListItem key={link.text} component="a" href={link.href} button color="inherit">
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={link.text} />
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
          <Container className={classes.graphContainer}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Player Count" />
              <Tab label="Kill Count" />
              <Tab label="Duration Count" />
            </Tabs>
            {value === 0 &&
              <>
                <Dropdown options={options} value={defaultOption} onChange={parseSelected} placeholder="Select an option" className={classes.durationDropdown} />
                <LineChart
                  width={1000}
                  height={400}
                  data={response}
                  margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                >
                  <Line type="monotone" dataKey="playerCount" stroke="black" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="time" />
                  <YAxis dataKey="playerCount" />
                  <Tooltip />
                </LineChart>
              </>}
            {value === 1 &&
            <KillsPieChart/>
            }
            {
              value === 2 &&
              "durations"
            }
          </Container>
        </main>
      </div>
    </>)
}

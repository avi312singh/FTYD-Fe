import React, { useEffect, useState } from "react"
import axios from 'axios'
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts'
import DurationPieChart from '../components/DurationPieChart/DurationPieChart';
import { InputLabel, MenuItem, FormControl, Container, Tab, Tabs, Select } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ReactGA from 'react-ga';

import NavDrawer from '../components/NavDrawer/NavDrawer';
import KillsPieChart from '../components/KillsPieChart/KillsPieChart';
import Seo from "../components/Seo/Seo";
import useDarkThemeContext from "../components/DarkThemeContext/DarkThemeContext"

const useStyles = makeStyles((theme) => ({
    graphContainer: {
        paddingTop: theme.spacing(2),
    },
    durationDropdown: {
    },
}))

export default function ServerData() {
    const endpoint = process.env.GATSBY_ENDPOINT || (() => { new Error("Provide an endpoint in env vars") });
    const authorisation = process.env.GATSBY_AUTHORISATION || (() => { new Error("Provide a server IP in env vars") });
    const googleAnalytics = process.env.GATSBY_GA || (() => { new Error("Provide a server IP in env vars") });
    const [response, setResponse] = useState([]);
    const [currentOption, setCurrentOption] = useState(288)
    const [value, setValue] = React.useState(0);
    const { darkMode } = useDarkThemeContext()

    const [config, setConfig] = React.useState({
        method: 'get',
        url: `${endpoint}aggregatedstats/playerCount?duration=${currentOption}`,
        headers: {
            'Authorization': `Basic ${authorisation}`,
        }
    })

    const configViewCountUpdate = {
        method: 'put',
        url: `${endpoint}aggregatedstats/pageCount/?page=server-data`,
        headers: {
            'Authorization': `Basic ${authorisation}`,
        }
    };

    useEffect(() => {
        axios(config)
            .then((response) => {
                if (response.status === 201 || 200) {
                    setResponse(response.data.result.response);
                }
            })
            .catch((error) => {
                console.log(error);
            }).then(
                axios(configViewCountUpdate)
                    .catch((error) => {
                        console.log(error);
                    })
            )
    }, [currentOption, config])

    const parseSelected = (event) => {
        const valueToParse = event.target.value;
        setCurrentOption(valueToParse);
        setConfig({
            method: 'get',
            url: `${endpoint}aggregatedstats/playerCount?duration=${valueToParse}`,
            headers: {
                'Authorization': `Basic ${authorisation}`,
            }
        })
    }


    const handleTabChange = (event, newValue) => {
        setCurrentOption(288);
        if (value !== newValue) {
            setValue(newValue);
        }
    };

    ReactGA.initialize(googleAnalytics);
    ReactGA.pageview('/server-data');

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const classes = useStyles();

    return (
        <>
            <Seo />
            <NavDrawer>
                {<Container className={classes.graphContainer}>
                    <Tabs
                        value={value}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Player Count" />
                        <Tab label="Kill Count" />
                        <Tab label="Minutes Spent" />
                    </Tabs>
                    {value === 0 &&
                        <>
                            <FormControl fullWidth={matches ? true : false} variant="outlined" className={classes.durationDropdown}>
                                <InputLabel id="duration-filled-label">Duration</InputLabel>
                                <Select
                                    labelId="duration-filled-label"
                                    id="duration-filled"
                                    value={currentOption}
                                    onChange={parseSelected}
                                    label="Duration"
                                >
                                    <MenuItem value={288}>Day</MenuItem>
                                    <MenuItem value={2016}>Week</MenuItem>
                                    <MenuItem value={8760}>Month</MenuItem>
                                </Select>
                            </FormControl>
                            <LineChart
                                width={1000}
                                height={400}
                                data={response}
                                margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                            >
                                <Line type="monotone" dataKey="playerCount" stroke={darkMode ? "white" : "black"} />
                                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#000" : "#ccc"} />
                                <XAxis dataKey="time" />
                                <YAxis dataKey="playerCount" />
                                {darkMode ? <Tooltip contentStyle={{ 'background': '#4e4e4e', 'color': 'white' }} /> : <Tooltip contentStyle={{ 'background': '#fff', 'color': 'black' }} />}
                            </LineChart>
                        </>}
                    {value === 1 &&
                        <KillsPieChart />
                    }
                    {
                        value === 2 &&
                        <DurationPieChart />
                    }
                </Container>
                }
            </NavDrawer>
        </>)
}
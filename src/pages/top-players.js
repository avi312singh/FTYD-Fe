import React, { useEffect, useState } from "react"
import axios from 'axios'
import NavDrawer from "../components/NavDrawer/NavDrawer"
import MUIDataTable from "mui-datatables";
import { IconButton, Tooltip } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import ReactGA from 'react-ga';

import useDarkThemeContext from "../components/DarkThemeContext/DarkThemeContext"
import Seo from "../components/Seo/Seo";

export default function TopPlayers() {
    const endpoint = process.env.GATSBY_ENDPOINT || (() => { new Error("Provide an endpoint in env vars") });
    const authorisation = process.env.GATSBY_AUTHORISATION || (() => { new Error("Provide a server IP in env vars") });
    const googleAnalytics = process.env.GATSBY_GA || (() => { new Error("Provide a server IP in env vars") });
    const [response, setResponse] = useState([]);
    const [refreshIndex, setRefreshIndex] = useState(0);
    const [disableRefresh, setDisableRefresh] = useState(false)

    const { darkMode } = useDarkThemeContext()

    const config = {
        method: 'get',
        url: `${endpoint}aggregatedstats/topPlayers`,
        headers: {
            'Authorization': `Basic ${authorisation}`,
        }
    };

    const configViewCount = {
        method: 'get',
        url: `${endpoint}aggregatedstats/pageCount/?page=top-players`,
        headers: {
            'Authorization': `Basic ${authorisation}`,
        }
    };

    useEffect(() => {
        axios(configViewCount)
            .catch((error) => {
                console.log(error);
            });
        axios(config)
            .then((response) => {
                if (response.status === 201 || 200) {
                    setResponse(response.data.result.response);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [refreshIndex])

    const refreshButton = () => {
        setRefreshIndex(refreshIndex + 1)
        setDisableRefresh(true)
        setTimeout(() => {
            setDisableRefresh(false)
        }, 5000);
    }

    const topPlayerColour = darkMode ? "rgba(255,255,255,0.3)" : "#e3e3e3";

    const columns = [
        {name: "name", label: "Name"},
        {name: "weeklyKills", label: "Weekly Kills"},
        {name: "weeklyHours", label: "Weekly Minutes"},
        {name: "killsPerTimeRatio", label: "Kills Per Time Ratio"},
    ];

    const options = {
        filterType: 'checkbox',
        selectableRows: "none",
        pagination: false,
        filter: false,
        download: false,
        viewColumns: false,
        setRowProps: (row, index) => {
            return {
                style: {
                    backgroundColor: index === 0 && topPlayerColour,
                },
            }
        },
        customToolbar: () => {
            return (
                <Tooltip
                    title="Refresh"
                >
                    <IconButton
                        onClick={refreshButton}
                        disabled={disableRefresh}
                        aria-label="Refresh">
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            );
        },
    };

    ReactGA.initialize(googleAnalytics);
    ReactGA.pageview('/top-players');

    return (
        <NavDrawer>
            <>
                <Seo />
                <MUIDataTable
                    title={`Top Weekly Players (${response.length} Players)`}
                    data={response}
                    columns={columns}
                    options={options}
                />
            </>
        </NavDrawer>
    )
}
import React, { useEffect, useState } from "react"
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import MUIDataTable from "mui-datatables";
import Seo from "./components/Seo/Seo";

import NavDrawer from "./components/NavDrawer/NavDrawer"

const useStyles = makeStyles((theme) => ({
    serverStatus: {
        marginBottom: theme.spacing(3),
    },
}))

export default function ServerInfo() {
    const [players, setPlayers] = useState([]);
    const [serverInfo, setServerInfo] = useState({ loading: true });
    const classes = useStyles();

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
                        setServerInfo(response.data.response[0].directQueryInfo, { loading: false })
                        response.data.response[0].directQueryInfo.status === "online" && setPlayers(response.data.response[1].directPlayerInfo.map(Object.values))
                    }, 1000)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    if (serverInfo.status === "online") {
        for (var i = 0; i < players.length; i++) {
            const eachPlayer = players[i];
            for (var j = 2; j < eachPlayer.length; j++) {
                const eachScoreInMinutes = Math.trunc(eachPlayer[j] / 60);
                eachPlayer[j] = eachScoreInMinutes
                console.log(eachScoreInMinutes)
            }
        }
    }

    const columns = ["Name", "Score", " Minutes"];
    const options = {
        filterType: 'checkbox',
        responsive: "simple",
        selectableRows: "none",
        pagination: false,
        print: false,
        search: false,
        filter: false,
        download: false,
        viewColumns: false
    };

    return (
        <>
            <Seo />
            <NavDrawer>
                <div>
                    <Typography className={classes.serverStatus}>
                        Server Status:
                        {serverInfo.loading === true ? <CircularProgress size="1.5rem" />
                            : serverInfo.status === "online" ? <CheckIcon />
                                : <ErrorIcon />}
                    </Typography>
                </div>
                {
                    players && <MUIDataTable
                        title={`Current Players: ${(players.length)}`}
                        data={players}
                        columns={columns}
                        options={options}
                    />
                }
            </NavDrawer>
        </>)
}
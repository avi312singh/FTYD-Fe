import React, { useEffect, useState } from "react"
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import NavDrawer from "./components/NavDrawer/NavDrawer"
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import MUIDataTable from "mui-datatables";
import CircularProgress from '@material-ui/core/CircularProgress';
import Seo from "./components/Seo/Seo";

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
        responsive: "simple",
        selectableRows: "none"
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
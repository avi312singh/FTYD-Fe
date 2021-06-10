import React, { useEffect, useState } from "react"
import axios from 'axios'
import NavDrawer from "./components/NavDrawer/NavDrawer"
import MUIDataTable from "mui-datatables";
import Seo from "./components/Seo/Seo";

export default function PlayerSearch() {
    const endpoint = process.env.GATSBY_ENDPOINT || (() => { new Error("Provide an endpoint in env vars") });
    const authorisation = process.env.GATSBY_AUTHORISATION || (() => { new Error("Provide a server IP in env vars") });
    const [players, setPlayers] = useState([]);

    const config = {
        method: 'get',
        url: `${endpoint}dbinteractions/allrows?tableName=playerInfo`,
        headers: {
            'Authorization': `Basic ${authorisation}`,
        }
    };

    useEffect(() => {
        axios(config)
            .then((players) => {
                if (players.status === 201 || 200) {
                    setPlayers(players.data.result.rows);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const columns = [
        {
            name: "playerName",
            label: "Name",
            options: {
                display: true,
            }
        },
        {
            name: "totalTime",
            label: "Total Hours",
            options: {
                display: true,
            }
        },
        {
            name: "totalKills",
            label: "Total Kills",
            options: {
                display: true,
            }
        },
        {
            name: "totalPointsSpent",
            label: "Total Points Spent",
            options: {
                display: true,
            }
        },
        {
            name: "totalTimeDaily",
            label: "Daily Hours",
            options: {
                display: false,
            }
        },
        {
            name: "totalKillsDaily",
            label: "Daily Kills",
            options: {
                display: false,
            }
        },
        {
            name: "totalPointsSpentDaily",
            label: "Daily Points Spent",
            options: {
                display: false,
            }
        },
        {
            name: "totalTimeWeekly",
            label: "Weekly Hours",
            options: {
                display: false,
            }
        },
        {
            name: "totalKillsWeekly",
            label: "Weekly Kills",
            options: {
                display: false,
            }
        },
        {
            name: "totalPointsSpentWeekly",
            label: "Weekly Points Spent",
            options: {
                display: false,
            }
        },
        {
            name: "totalTimeMonthly",
            label: "Monthly Hours",
            options: {
                display: false,
            }
        },
        {
            name: "totalKillsMonthly",
            label: "Monthly Kills",
            options: {
                display: false,
            }
        },
        {
            name: "totalPointsSpentMonthly",
            label: "Monthly Points Spent",
            options: {
                display: false,
            }
        },
        {
            name: "online",
            label: "Online",
            options: {
                display: true,
                hint: "1 means online and 0 means offline"
            }
        },
        {
            name: "lastLogin",
            label: "Last Login",
            options: {
                display: true,
            }
        },
        {
            name: "dateCreated",
            label: "1st Server Join",
            options: {
                display: true,
                hint: "The time recorded when the player first joined the server"
            }
        },
    ];

    const options = {
        filterType: 'multiselect',
        rowsPerPage: 100,
        rowsPerPageOptions: [100, 200, 1000],
        searchPlaceholder: 'Search Player',
        responsive: "standard"
    };

    return (
        <NavDrawer>
            <>
                <Seo />
                    <MUIDataTable
                        title={"All Players"}
                        data={players}
                        columns={columns}
                        options={options}
                    />
            </>
        </NavDrawer>
    )
}
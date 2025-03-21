import React, { useEffect, useState } from "react"
import axios from "axios"
import MUIDataTable from "mui-datatables"
import { IconButton, Tooltip } from "@mui/material"
import Skeleton from "@mui/material/Skeleton"
import { useTheme } from "@mui/material/styles" // Updated to use the correct useTheme from material styles
import useMediaQuery from "@mui/material/useMediaQuery"

import RefreshIcon from "@mui/icons-material/Refresh"
import ReactGA from "react-ga"

import NavDrawer from "../components/NavDrawer/NavDrawer"
import Seo from "../components/Seo/Seo"

export default function PlayerStats() {
  const endpoint =
    process.env.GATSBY_ENDPOINT ||
    (() => {
      new Error("Provide an endpoint in env vars")
    })
  const authorisation =
    process.env.GATSBY_AUTHORISATION ||
    (() => {
      new Error("Provide a server IP in env vars")
    })
  const googleAnalytics =
    process.env.GATSBY_GA ||
    (() => {
      new Error("Provide a server IP in env vars")
    })
  const [players, setPlayers] = useState([])
  const [refreshIndex, setRefreshIndex] = useState(0)
  const [disableRefresh, setDisableRefresh] = useState(false)

  const config = {
    method: "get",
    url: `${endpoint}dbinteractions/allrows?tableName=playerInfo`,

  }
  const configViewCountUpdate = {
    method: "put",
    url: `${endpoint}aggregatedStats/pageCount/?page=player-stats`,

  }

  useEffect(() => {
    axios(config)
      .then(players => {
        if (players.status === 201 || 200) {
          setPlayers(players.data.result.rows)
        }
      })
      .catch(error => {
        console.log(error)
      })
      .then(
        axios(configViewCountUpdate).catch(error => {
          console.log(error)
        }),
      )
  }, [refreshIndex])

  ReactGA.initialize(googleAnalytics)
  ReactGA.pageview("/player-stats")

  const columns = [
    {
      name: "playerName",
      label: "Name",
      options: {
        display: true,
      },
    },
    {
      name: "totalTime",
      label: "Total Minutes",
      options: {
        display: true,
      },
    },
    {
      name: "totalKills",
      label: "Total Kills",
      options: {
        display: true,
      },
    },
    {
      name: "totalPointsSpent",
      label: "Total Points Spent",
      options: {
        display: true,
      },
    },
    {
      name: "totalTimeDaily",
      label: "Daily Minutes",
      options: {
        display: false,
      },
    },
    {
      name: "totalKillsDaily",
      label: "Daily Kills",
      options: {
        display: false,
      },
    },
    {
      name: "totalPointsSpentDaily",
      label: "Daily Points Spent",
      options: {
        display: false,
      },
    },
    {
      name: "totalTimeWeekly",
      label: "Weekly Minutes",
      options: {
        display: false,
      },
    },
    {
      name: "totalKillsWeekly",
      label: "Weekly Kills",
      options: {
        display: false,
      },
    },
    {
      name: "totalPointsSpentWeekly",
      label: "Weekly Points Spent",
      options: {
        display: false,
      },
    },
    {
      name: "totalTimeMonthly",
      label: "Monthly Minutes",
      options: {
        display: false,
      },
    },
    {
      name: "totalKillsMonthly",
      label: "Monthly Kills",
      options: {
        display: false,
      },
    },
    {
      name: "totalPointsSpentMonthly",
      label: "Monthly Points Spent",
      options: {
        display: false,
      },
    },
    {
      name: "online",
      label: "Online",
      options: {
        display: false,
        hint: "1 means online and 0 means offline",
      },
    },
    {
      name: "lastLogin",
      label: "Last Login",
      options: {
        display: true,
      },
    },
    {
      name: "dateCreated",
      label: "1st Recorded Join",
      options: {
        display: true,
        hint: "The time recorded when the player first joined the server",
      },
    },
  ]

  const tableOptions = {
    filterType: "multiselect",
    rowsPerPage: 100,
    rowsPerPageOptions: [100, 200, 1000],
    searchPlaceholder: "Search Player",
    responsive: "standard",
    customToolbar: () => {
      return (
        <Tooltip title="Refresh">
          <IconButton
            onClick={refreshButton}
            disabled={disableRefresh}
            aria-label="Refresh"
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      )
    },
  }

  const theme = useTheme() // Ensure that the ThemeProvider is wrapping this component higher up
  const matches = useMediaQuery(theme?.breakpoints?.up("sm")) // Safely access theme.breakpoints

  const refreshButton = () => {
    setRefreshIndex(refreshIndex + 1)
    setDisableRefresh(true)
    setTimeout(() => {
      setDisableRefresh(false)
    }, 7500)
  }

  return (
    <NavDrawer>
      <>
        <Seo />
        {players.length > 0 ? (
          <MUIDataTable
            title={`Player Statistics (${players.length} Players)`}
            data={players}
            columns={columns}
            options={tableOptions}
          />
        ) : (
          <div>
            {matches ? (
              <Skeleton variant="rectangular" width={1550} height={9655} />
            ) : (
              <Skeleton variant="rectangular" width={910} height={9655} />
            )}
          </div>
        )}
      </>
    </NavDrawer>
  )
}

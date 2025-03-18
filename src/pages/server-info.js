import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  Typography,
  CircularProgress,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import ErrorIcon from "@mui/icons-material/Error"
import RefreshIcon from "@mui/icons-material/Refresh"
import MUIDataTable from "mui-datatables"
import ReactGA from "react-ga"

import Seo from "../components/Seo/Seo"
import NavDrawer from "../components/NavDrawer/NavDrawer"

export default function ServerInfo() {
  const [players, setPlayers] = useState([])
  const [serverInfo, setServerInfo] = useState({ loading: true })
  const [refreshIndex, setRefreshIndex] = useState(0)
  const [disableRefresh, setDisableRefresh] = useState(false)

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
  const config = {
    method: "get",
    url: `${endpoint}serverStats`,

  }

  const configViewCountUpdate = {
    method: "put",
    url: `${endpoint}aggregatedStats/pageCount/?page=server-info`,

  }

  useEffect(() => {
    axios(config)
      .then(response => {
        if (response.status === 201 || 200) {
          setTimeout(() => {
            setServerInfo(response.data.response[0].directQueryInfo, {
              loading: false,
            })
            if (response.data.response[0].directQueryInfo.status === "online") {
              setPlayers(
                response.data.response[1].directPlayerInfo.map(Object.values),
              )
            }
          }, 1000)
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

  if (serverInfo.status === "online") {
    for (let i = 0; i < players.length; i++) {
      const eachPlayer = players[i]
      for (let j = 2; j < eachPlayer.length; j++) {
        const eachScoreInMinutes = Math.trunc(eachPlayer[j] / 60)
        eachPlayer[j] = eachScoreInMinutes
      }
    }
  }

  ReactGA.initialize(googleAnalytics)
  ReactGA.pageview("/server-info")

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "score",
      label: "Score",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "minutes",
      label: "Minutes",
      options: {
        filter: true,
        sort: true,
      },
    },
  ]

  const options = {
    textLabels: {
      body: {
        noMatch:
          serverInfo.loading === true ? (
            <CircularProgress size="3.5rem" />
          ) : (
            "No players currently on the server"
          ),
      },
    },
    filterType: "checkbox",
    responsive: "simple",
    selectableRows: "none",
    pagination: false,
    print: false,
    search: false,
    filter: false,
    download: false,
    viewColumns: false,
    sortOrder: { name: "score", direction: "desc" },
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

  const refreshButton = () => {
    setRefreshIndex(refreshIndex + 1)
    setDisableRefresh(true)
    setTimeout(() => {
      setDisableRefresh(false)
    }, 999)
  }

  return (
    <>
      <Seo />
      <NavDrawer>
        <Box sx={{ mb: 3 }}>
          <Typography>
            Server Status:
            {serverInfo.loading === true ? (
              <CircularProgress size="1.5rem" />
            ) : serverInfo.status === "online" ? (
              <CheckIcon />
            ) : (
              <ErrorIcon />
            )}
          </Typography>
        </Box>
        {players && (
          <MUIDataTable
            title={`Current Players: ${players.length}`}
            data={players}
            columns={columns}
            options={options}
          />
        )}
      </NavDrawer>
    </>
  )
}

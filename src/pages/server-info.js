import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  Typography,
  CircularProgress,
  IconButton,
  Tooltip,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import ErrorIcon from "@mui/icons-material/Error"
import RefreshIcon from "@mui/icons-material/Refresh"
import MUIDataTable from "mui-datatables"

import Seo from "../components/Seo/Seo"
import NavDrawer from "../components/NavDrawer/NavDrawer"

export default function ServerInfo() {
  const [players, setPlayers] = useState([])
  const [serverInfo, setServerInfo] = useState({ loading: true })
  const [refreshIndex, setRefreshIndex] = useState(0)
  const [disableRefresh, setDisableRefresh] = useState(false)
  const [selectedServer, setSelectedServer] = useState("ftyd")

  const endpoint = process.env.GATSBY_ENDPOINT

  const configViewCountUpdate = {
    method: "put",
    url: `${endpoint}aggregatedStats/pageCount/?page=server-info`,
  }

  useEffect(() => {
    const config = {
      method: "get",
      url: `${endpoint}server/currentInfo?serverId=${selectedServer}`,
    }

    axios(config)
      .then(response => {
        if (response.status === 201 || response.status === 200) {
          const info = response.data
          const playerData = response.data

          setServerInfo({ ...info, loading: false })
          if (info.status === "online" && playerData.players.length > 0) {
            const parsedPlayers = playerData.players.map(p => {
              const [name, score, seconds] = Object.values(p)
              return { name, score, minutes: Math.floor(seconds / 60) }
            })
            setPlayers(parsedPlayers)
          } else {
            setPlayers([])
          }
        }
      })
      .catch(error => {
        console.error("Error fetching server stats:", error)
        setServerInfo({ loading: false })
      })

    axios(configViewCountUpdate).catch(console.error)
  }, [refreshIndex, selectedServer])

  const refreshButton = () => {
    setRefreshIndex(prev => prev + 1)
    setDisableRefresh(true)
    setTimeout(() => setDisableRefresh(false), 1000)
  }

  const handleServerChange = event => {
    setSelectedServer(event.target.value)
    setRefreshIndex(prev => prev + 1) // Trigger re-fetch
  }

  const columns = [
    { name: "name", label: "Name" },
    { name: "score", label: "Score" },
    { name: "minutes", label: "Minutes" },
  ]

  const options = {
    textLabels: {
      body: {
        noMatch: serverInfo.loading ? (
          <CircularProgress size="3.5rem" />
        ) : (
          "No players currently on the server"
        ),
      },
    },
    filter: false,
    sortOrder: { name: "score", direction: "desc" },
    responsive: "simple",
    selectableRows: "none",
    pagination: false,
    print: false,
    search: false,
    download: false,
    viewColumns: false,
    customToolbar: () => (
      <Tooltip title="Refresh">
        <IconButton onClick={refreshButton} disabled={disableRefresh}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    ),
  }

  return (
    <>
      <Seo
        title="Fall to Your Death | Server Info"
        description="Welcome to the website of the iconic Fall to your Death server. Enjoy your stay!"
        image="\static\images\ftyd.jpg"
        article={false}
      />
      <NavDrawer>
        <Box
          sx={{
            mt: 6,
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 3 },
            overflowX: "auto",
            maxWidth: "100%",
            minHeight: "100vh",
            ml: { sm: "240px" },
          }}
        >
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="server-select-label">Server</InputLabel>
            <Select
              labelId="server-select-label"
              value={selectedServer}
              onChange={handleServerChange}
              label="Server"
            >
              <MenuItem value="ftyd">Fall to Your Death</MenuItem>
              <MenuItem value="lasersword">Laser Sword</MenuItem>
            </Select>
          </FormControl>

          <Typography sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            Server Status:&nbsp;
            {serverInfo.loading ? (
              <CircularProgress size="1.5rem" />
            ) : serverInfo.status === "online" ? (
              <CheckIcon color="success" />
            ) : (
              <ErrorIcon color="error" />
            )}
          </Typography>

          {players && (
            <Box sx={{ overflowX: "auto" }}>
              <MUIDataTable
                title={`Current Players (${selectedServer.toUpperCase()}): ${players.length}`}
                data={players}
                columns={columns}
                options={options}
              />
            </Box>
          )}
        </Box>
      </NavDrawer>
    </>
  )
}

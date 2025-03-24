import React, { useEffect, useState } from "react"
import axios from "axios"
import NavDrawer from "../components/NavDrawer/NavDrawer"
import MUIDataTable from "mui-datatables"
import { IconButton, Tooltip, MenuItem, FormControl, Select, Box } from "@mui/material"
import RefreshIcon from "@mui/icons-material/Refresh"

import { useDarkThemeContext } from "../components/DarkThemeContext/DarkThemeContext"
import Seo from "../components/Seo/Seo"

export default function TopPlayers() {
  const endpoint = process.env.GATSBY_ENDPOINT

  const [response, setResponse] = useState([])
  const [refreshIndex, setRefreshIndex] = useState(0)
  const [disableRefresh, setDisableRefresh] = useState(false)
  const [selectedServer, setSelectedServer] = useState("ftyd")

  const { darkMode } = useDarkThemeContext()

  const fetchTopPlayers = () => {
    axios({
      method: "get",
      url: `${endpoint}aggregatedStats/topPlayers?serverId=${selectedServer}`,
    })
      .then(response => {
        if (response.status === 201 || response.status === 200) {
          setResponse(response.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchTopPlayers()
    axios({
      method: "put",
      url: `${endpoint}aggregatedStats/pageCount/?page=top-players`,
    }).catch(error => {
      console.log(error)
    })
  }, [refreshIndex, selectedServer])

  const refreshButton = () => {
    setRefreshIndex(prev => prev + 1)
    setDisableRefresh(true)
    setTimeout(() => setDisableRefresh(false), 5000)
  }

  const topPlayerColour = darkMode ? "rgba(255,255,255,0.3)" : "#e3e3e3"

  const columns = [
    { name: "playerName", label: "Name" },
    { name: "totalKillsWeekly", label: "Weekly Kills" },
    { name: "totalTimeWeekly", label: "Weekly Minutes" },
    { name: "killsPerTimeSpentRatio", label: "Kills Per Time Ratio" },
  ];  

  const options = {
    responsive: "scroll",
    filterType: "checkbox",
    selectableRows: "none",
    pagination: false,
    filter: false,
    download: false,
    viewColumns: false,
    setRowProps: (row, index) => ({
      style: {
        backgroundColor: index === 0 ? topPlayerColour : undefined,
      },
    }),
    customToolbar: () => (
      <Tooltip title="Refresh">
        <IconButton
          onClick={refreshButton}
          disabled={disableRefresh}
          aria-label="Refresh"
        >
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    ),
  }

  return (
      <NavDrawer>
      <Box
      sx={{
        mt: 6,
        ml: { sm: '240px' },
        pt: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 3 },
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
        <Seo
          title="Fall to Your Death | Leaderboards"
          description="Welcome to the website of the iconic Fall to your Death server. Enjoy your stay!"
          image="\static\images\ftyd.jpg"
          article={false}
        />  
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <Select
            value={selectedServer}
            onChange={e => setSelectedServer(e.target.value)}
            displayEmpty
          >
            <MenuItem value="ftyd">Fall To Your Death</MenuItem>
            <MenuItem value="lasersword">Laser Sword</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <MUIDataTable
          title={`Top Weekly Players (${response.length} Players) — ${selectedServer === 'ftyd' ? 'Fall To Your Death' : 'Laser Sword'}`}
          data={response}
          columns={columns}
          options={{
            responsive: "standard",
            selectableRows: "none",
            pagination: false, // ✅ Disabled
            filter: false,
            download: false,
            viewColumns: false,
            setRowProps: (row, index) => ({
              style: {
                backgroundColor: index === 0 ? topPlayerColour : undefined,
              },
            }),
            customToolbar: () => (
              <Tooltip title="Refresh">
                <IconButton
                  onClick={refreshButton}
                  disabled={disableRefresh}
                  aria-label="Refresh"
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            ),
          }}
        />
      </Box>
    </Box>
    </NavDrawer>
  )
}

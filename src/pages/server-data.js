import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ResponsiveContainer,
} from "recharts"
import DurationPieChart from "../components/DurationPieChart/DurationPieChart"
import {
  InputLabel,
  MenuItem,
  FormControl,
  Container,
  Tab,
  Tabs,
  Select,
  Box,
} from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"

import NavDrawer from "../components/NavDrawer/NavDrawer"
import KillsPieChart from "../components/KillsPieChart/KillsPieChart"
import Seo from "../components/Seo/Seo"
import { useDarkThemeContext } from "../components/DarkThemeContext/DarkThemeContext"

export default function ServerData() {
  const endpoint = process.env.GATSBY_ENDPOINT

  const [response, setResponse] = useState([])
  const [currentOption, setCurrentOption] = useState(288)
  const [selectedServer, setSelectedServer] = useState("ftyd")
  const [value, setValue] = useState(0)

  const { darkMode } = useDarkThemeContext()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const fetchData = () => {
    axios
      .get(
        `${endpoint}aggregatedStats/playerCount?duration=${currentOption}&serverId=${selectedServer}`
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          const parsed = res.data.response.map((item) => ({
            ...item,
            time: new Date(item.time).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }))
          setResponse(parsed)
        }
      })
      .catch(console.error)

    axios
      .put(`${endpoint}aggregatedStats/pageCount/?page=server-data`)
      .catch(console.error)
  }

  useEffect(() => {
    fetchData()
  }, [currentOption, selectedServer])

  const handleDurationChange = (e) => setCurrentOption(e.target.value)
  const handleServerChange = (e) => setSelectedServer(e.target.value)
  const handleTabChange = (e, newVal) => {
    if (value !== newVal) {
      setValue(newVal)
      setCurrentOption(288)
    }
  }

  return (
    <>
        <Seo
          title="Fall to Your Death | Server Data"
          description="Welcome to the website of the iconic Fall to your Death server. Enjoy your stay!"
          image="\static\images\ftyd.jpg"
          article={false}
        />  
      <NavDrawer>
      <Box
          sx={{
            paddingTop: isMobile ? 2 : 4,
            paddingLeft: { xs: 0, sm: 3 },
            marginLeft: { sm: "240px" }, // compensate for NavDrawer width
            width: { xs: "100%", sm: `calc(100% - 240px)` },
            boxSizing: "border-box",
          }}
        >
          <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-end",
              mb: 2,
              mt: isMobile ? 5 : 6,
            }}
          >
            <FormControl size="small" sx={{ minWidth: 180 }}>
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
          </Box>

          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons="auto"
          >
            <Tab label="Player Count" />
            <Tab label="Kill Count" />
            <Tab label="Minutes Spent" />
          </Tabs>

          {value === 0 && (
            <>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="duration-label">Duration</InputLabel>
                <Select
                  labelId="duration-label"
                  value={currentOption}
                  onChange={handleDurationChange}
                  label="Duration"
                >
                  <MenuItem value={288}>Day</MenuItem>
                  <MenuItem value={2016}>Week</MenuItem>
                  <MenuItem value={8760}>Month</MenuItem>
                </Select>
              </FormControl>

              <Box
                sx={{
                  mt: 4,
                  height: 400,
                  width: "100%",
                  overflowX: "auto",
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={response}
                    margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                  >
                    <Line
                      type="monotone"
                      dataKey="playerCount"
                      stroke={darkMode ? "white" : "black"}
                    />
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={darkMode ? "#333" : "#ccc"}
                    />
                    <XAxis dataKey="time" />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        background: darkMode ? "#4e4e4e" : "#fff",
                        color: darkMode ? "white" : "black",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </>
          )}

        {(value === 1 || value === 2) && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 4,
              mt: 4,
            }}
          >
          {(value === 1 || value === 2) && (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                mt: 4,
                width: "100%",
              }}
            >
              {value === 1 && <KillsPieChart serverId={selectedServer} />}
              {value === 2 && <DurationPieChart serverId={selectedServer} />}
            </Box>
          )}
          </Box>
        )}
          </Container>
        </Box>
      </NavDrawer>
    </>
  )
}

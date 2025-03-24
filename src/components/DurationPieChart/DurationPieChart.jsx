import React, { useEffect, useState } from "react"
import axios from "axios"
import { Box, useTheme, useMediaQuery } from "@mui/material"
import { Tooltip, Pie, PieChart, Cell, ResponsiveContainer } from "recharts"

const DurationPieChart = ({ serverId = "ftyd" }) => {
  const [response, setResponse] = useState([])
  const endpoint = process.env.GATSBY_ENDPOINT

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    const config = {
      method: "get",
      url: `${endpoint}aggregatedStats/duration?duration=999&serverId=${serverId}`,
    }

    axios(config)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          setResponse(res.data.result.response)
        }
      })
      .catch(console.error)
  }, [serverId])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#42C1FF"]

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        width: "100%",
        mt: 4,
      }}
    >
      {/* First Pie Chart */}
      <Box sx={{ width: 350, height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Pie
              data={response.filter(item => item.name !== "All")}
              dataKey="minutes"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              fill="#8884d8"
              paddingAngle={5}
              label
            >
              {response.map((entry, index) => (
                <Cell key={`cell-a-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Second Pie Chart */}
      <Box sx={{ width: 350, height: 350 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Pie
              data={response}
              dataKey="minutes"
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius={30}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={5}
              label
            >
              {response.map((entry, index) => (
                <Cell key={`cell-b-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}

export default DurationPieChart

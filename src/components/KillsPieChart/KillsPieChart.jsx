import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Tooltip, Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

const KillsPieChart = ({ serverId = "ftyd" }) => {
  const [response, setResponse] = useState([]);
  const endpoint = process.env.GATSBY_ENDPOINT;

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    axios
      .get(`${endpoint}aggregatedStats/killCount?duration=999&serverId=${serverId}`)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          setResponse(res.data.totalKills);
        }
      })
      .catch(console.error);
  }, [serverId]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#42C1FF"];

  return (
    <Box sx={{ width: "100%", maxWidth: isLargeScreen ? 900 : 700, height: isLargeScreen ? 500 : 400,  maxWidth: "1600px", mx: "auto", boxSizing: "border-box" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip />
          <Pie
            data={response.filter(duration => duration.name !== "All")}
            dataKey="kills"
            cx="30%"
            cy="50%"
            innerRadius={isLargeScreen ? 80 : 60}
            outerRadius={isLargeScreen ? 120 : 90}
            paddingAngle={5}
            label
            labelLine
          >
            {response.map((entry, index) => (
              <Cell key={`cell-1-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Pie
            data={response}
            dataKey="kills"
            cx="70%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={isLargeScreen ? 50 : 30}
            outerRadius={isLargeScreen ? 70 : 50}
            paddingAngle={5}
            label
            labelLine
          >
            {response.map((entry, index) => (
              <Cell key={`cell-2-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default KillsPieChart;

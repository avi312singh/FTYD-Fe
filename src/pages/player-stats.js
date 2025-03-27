import React, { useEffect, useState } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import {
  IconButton,
  Tooltip,
  MenuItem,
  Select,
  Box,
  Skeleton,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import RefreshIcon from "@mui/icons-material/Refresh";

import NavDrawer from "../components/NavDrawer/NavDrawer";
import Seo from "../components/Seo/Seo";

export default function PlayerStats() {
  const [players, setPlayers] = useState([]);
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [disableRefresh, setDisableRefresh] = useState(false);
  const [selectedServer, setSelectedServer] = useState("ftyd");

  const endpoint =
    process.env.GATSBY_ENDPOINT || (() => new Error("Provide an endpoint"))();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    axios
      .get(`${endpoint}dbInteractions/allrows?tableName=PlayerStats&serverId=${selectedServer}`)
      .then(response => {
        if ((response.status === 200 || response.status === 201) && response.data.items) {
          const transformed = response.data.items.map(item => {
            const nameFromSortKey = item.sortKey?.startsWith("PLAYER#")
              ? item.sortKey.replace("PLAYER#", "")
              : "Unknown";
            return { ...item, playerName: nameFromSortKey };
          });
          setPlayers(transformed);
        }
      })
      .catch(console.error)
      .then(() =>
        axios
          .put(`${endpoint}aggregatedStats/pageCount/?page=player-stats`)
          .catch(console.error)
      );
  }, [refreshIndex, selectedServer]);
  

  const handleServerChange = e => setSelectedServer(e.target.value);

  const refreshButton = () => {
    setRefreshIndex(prev => prev + 1);
    setDisableRefresh(true);
    setTimeout(() => setDisableRefresh(false), 7500);
  };

  const columns = [
    {
      name: "playerName",
      label: "Name",
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const player = players[dataIndex];
          const lastLoginTime = new Date(player.lastLogin).getTime();
          const now = Date.now();
          const isOnline = now - lastLoginTime < 60000; // within the last 60s
    
          return (
            <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              {isOnline && (
                <FiberManualRecordIcon
                  fontSize="small"
                  sx={{ color: "green" }}
                />
              )}
              {player.playerName}
            </span>
          );
        },
      },
    },    
    { name: "totalTime", label: "Total Minutes" },
    { name: "totalKills", label: "Total Kills" },
    { name: "totalPointsSpent", label: "Total Points Spent" },
    { name: "totalTimeDaily", label: "Daily Minutes", options: { display: false } },
    { name: "totalKillsDaily", label: "Daily Kills", options: { display: false } },
    { name: "totalPointsSpentDaily", label: "Daily Points Spent", options: { display: false } },
    { name: "totalTimeWeekly", label: "Weekly Minutes", options: { display: false } },
    { name: "totalKillsWeekly", label: "Weekly Kills", options: { display: false } },
    { name: "totalPointsSpentWeekly", label: "Weekly Points Spent", options: { display: false } },
    { name: "totalTimeMonthly", label: "Monthly Minutes", options: { display: false } },
    { name: "totalKillsMonthly", label: "Monthly Kills", options: { display: false } },
    { name: "totalPointsSpentMonthly", label: "Monthly Points Spent", options: { display: false } },
    { name: "online", label: "Online", options: { display: false, hint: "1 means online and 0 means offline" } },
    { name: "lastLogin", label: "Last Login" },
    { name: "dateCreated", label: "1st Recorded Join", options: { hint: "When the player first joined" } },
  ];

  const tableOptions = {
    filterType: "multiselect",
    searchPlaceholder: "Search Player",
    responsive: "scrollFullHeight",
    pagination: true,
    customToolbar: () => (
      <Tooltip title="Refresh">
        <IconButton onClick={refreshButton} disabled={disableRefresh}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    ),
  };

  return (
  <NavDrawer>
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 3 },
        ml: { sm: "240px" },
        overflowX: "auto",
        maxWidth: "100%",
        minHeight: "100vh",
      }}
    >
        <Seo
          title="Fall to Your Death | Player Stats"
          description="Welcome to the website of the iconic Fall to your Death server. Enjoy your stay!"
          image="\static\images\ftyd.jpg"
          article={false}
        />      
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, mt: 6 }}>
        <FormControl size="small">
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

      {players.length > 0 ? (
        <MUIDataTable
          title={`Player Statistics (${players.length} Players)`}
          data={players}
          columns={columns}
          options={{
            ...tableOptions,
            pagination: true,
            rowsPerPage: 100,
            rowsPerPageOptions: [],
          }}
        />
      ) : (
        <Skeleton
          variant="rectangular"
          width={matches ? 1550 : 910}
          height={9655}
        />
      )}
    </Box>
  </NavDrawer>

  );
}

import React, { useEffect, useState, useCallback, useMemo } from "react"
import axios from "axios"
import { ThemeProvider, createTheme, keyframes } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Box, Typography, useMediaQuery, Avatar } from "@mui/material"
import { useDarkThemeContext } from "../components/DarkThemeContext/DarkThemeContext"
import NavDrawer from "../components/NavDrawer/NavDrawer"
import TypeWriter from "../components/TypeWriter/TypeWriter"
import Seo from "../components/Seo/Seo"
import YouTubePlaylist from "../components/YouTubePlaylist/YouTubePlaylist"
import SpecialThanksCarousel from "../components/SpecialThanksCarousel/SpecialThanksCarousel"
import Carousel from "react-material-ui-carousel"
import { Paper } from "@mui/material"
import Confetti from "react-confetti";

import GoldTrophy from "/static/images/A_golden_medieval_knight_emblem_with_a_chivalric_s.png"
import SilverTrophy from "/static/images/A_silver_medieval_sword_and_shield_emblem_with_int.png"
import BronzeTrophy from "/static/images/A_bronze_medieval_helmet_emblem_with_intricate_det.png"


const Home = () => {
  const { darkMode } = useDarkThemeContext()
  const [response, setResponse] = useState([])
  const [viewCount, setViewCount] = useState(0)

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    spacing: 8,
  })

  const endpoint = process.env.GATSBY_ENDPOINT

  const config = useMemo(() => ({
    method: "GET",
    url: `${endpoint}aggregatedStats/topPlayers?serverId=ftyd`,
    mode: "cors",
  }), [endpoint]);

  const configViewCount = useMemo(() => ({
    method: "GET",
    url: `${endpoint}aggregatedStats/pageCount/?page=/`,
    mode: "cors",
  }), [endpoint]);

  const configViewCountUpdate = useMemo(() => ({
    method: "PUT",
    url: `${endpoint}aggregatedStats/pageCount/?page=/`,
    mode: "cors",
  }), [endpoint]);


  const fadeInZoom = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const ConfettiEffect = () => {
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={200}
      gravity={0.3}
    />
  );
};

  const fetchData = useCallback(() => {

    axios(config)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          setResponse(response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching topPlayers:", error);
      });

    axios(configViewCount)
      .then(viewCount => {
        if (viewCount.status === 201 || viewCount.status === 200) {
          setViewCount(viewCount.data.result.result[0].hits);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .then(
        axios(configViewCountUpdate).catch(error => {
          console.log(error);
        }),
      );
  }, [config, configViewCount, configViewCountUpdate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const notMobile = useMediaQuery(theme.breakpoints.up("sm"))
  const chivSteamBrowser = useMediaQuery(theme.breakpoints.between("sm", "md"))

  const goldWave = keyframes`
  0% { background-position: 0% 50%; filter: brightness(1.04); }
  50% { background-position: 100% 50%; filter: brightness(1.08); }
  100% { background-position: 0% 50%; filter: brightness(1.04); }
`;

const silverShimmer = keyframes`
  0% { background-position: -200% 0; }
  50% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

const bronzePulse = keyframes`
  0% { filter: brightness(1); transform: scale(1); }
  50% { filter: brightness(1.1); transform: scale(1.03); }
  100% { filter: brightness(1); transform: scale(1); }
`;

let trophyIcons = [
  "/static/images/A_golden_medieval_knight_emblem_with_a_chivalric_s.png",
  "/static/images/A_silver_medieval_sword_and_shield_emblem_with_int.png",
  "/static/images/A_bronze_medieval_helmet_emblem_with_intricate_det.png",
];

// Ensure that image paths are correctly encoded
trophyIcons = trophyIcons.map(icon => encodeURI(icon));

  const items = response.map((player, index) => ({
    name: player.playerName || "No player yet!",
    kills: player.totalKillsWeekly || "N/A",
    imageSrc:
      player.imageSrc !== null && player.imageSrc !== ""
        ? player.imageSrc
        : "http://clipart-library.com/images_k/blue-flame-transparent-background/blue-flame-transparent-background-13.png",
        rank: index + 1
  }))
  console.log('items', items)
  console.log('response', response)

  const opts = {
    height: notMobile ? "480" : "195",
    width: notMobile ? "800" : "320",
    playerVars: {
      autoplay: 1,
      listType: "playlist",
      list: "PLqBaHNBE-DBxLB8VfMaaAONaJJ3Jxf5bz",
      showinfo: 0,
      fs: 0,
      controls: 1,
      modestbranding: 1,
      iv_load_policy: 3,
    },
  }

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{ display: "flex" }}>
      <NavDrawer sx={{ position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 1200 }} />
      <Box component="main" sx={{ flexGrow: 1, padding: theme.spacing(3), marginLeft: notMobile && "240px", marginTop: theme.spacing(3) }}>
        <Seo />
        <TypeWriter
          sx={{ height: "100%" }}
          messages={[
            "Welcome",
            "Bienvenue",
            "Benvenuta",
            "добро пожаловать",
            "Bienvenidas",
            "欢迎",
            "Hoşgeldiniz",
            "Добре дошли",
            "어서 오세요",
            "Willkommen",
            "Witamy",
            "Vítejte",
            "Welkom",
            "Bine ati venit",
          ]}
        />
        {!chivSteamBrowser ? (
          <Typography variant={notMobile ? "h4" : "h6"} component={notMobile ? "h4" : "h6"}>
            To the official website of the Fall to your Death server
          </Typography>
        ) : (
          <Typography gutter variant={notMobile ? "h4" : "h6"} component={notMobile ? "h4" : "h6"}>
            To the official website of the Fall to your Death server
          </Typography>
        )}
        {chivSteamBrowser && (
          <Typography variant={"body1"} component={"body1"}>
            Press <Typography variant="caption">Open website</Typography> and expand window for a much better experience
          </Typography>
        )}
        <Typography
          sx={{
            paddingTop: 4,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: notMobile ? "2rem" : "1.5rem",
            position: "relative",
            color: darkMode ? "#f0f0f0" : "#1a1a1a",
            "&::after": {
              content: '""',
              position: "absolute",
              left: "50%",
              bottom: -5,
              width: "50%",
              height: 3,
              background: darkMode
                ? "linear-gradient(90deg, #00e5ff, #7f00ff, #ff00ff, #00e5ff)"
                : "linear-gradient(90deg, #ff8a00, #e52e71, #ff2e2e, #ff8a00)",
              backgroundSize: "200% 100%",
              transform: "translateX(-50%)",
              transition: "all 0.4s ease-in-out", // ✅ Smooth transition effect
            },
            "&:hover::after": {
              width: "100%", // ✅ Grows from 50% to 100% on hover
            },
          }}
          gutterBottom
        >
          Players of the Week
        </Typography>
        <Carousel interval={7500} stopAutoPlayOnHover={false}>
    {items.map((item, i) => {
      let bgStyle = {};
      let trophyIcon = null;

      if (i === 0) {
        bgStyle = {
          background: "linear-gradient(45deg, #FFD700, #FFEC8B, #FFD700)",
          backgroundSize: "200% 100%",
          animation: `${goldWave} 3s infinite linear`,
          boxShadow: "0px 0px 20px rgba(255, 215, 0, 0.8)",
        };
        trophyIcon = GoldTrophy;
      } else if (i === 1) {
        bgStyle = {
          background: "linear-gradient(90deg, silver, #D3D3D3, silver)",
          backgroundSize: "400% 100%",
          animation: `${silverShimmer} 4s infinite linear`,
          boxShadow: "0px 0px 15px rgba(192,192,192,0.8)",
        };
        trophyIcon = SilverTrophy;
      } else if (i === 2) {
        bgStyle = {
          background: "linear-gradient(45deg, #CD7F32, #B87333, #CD7F32)",
          backgroundSize: "200% 100%",
          animation: `${bronzePulse} 2.5s infinite ease-in-out`,
          boxShadow: "0px 0px 10px rgba(205,127,50,0.7)",
        };
        trophyIcon = BronzeTrophy;
      } else {
        // ✅ Apply Blue Flame for Non-Top-3 Players
        bgStyle = {
          backgroundImage: "url('http://clipart-library.com/images_k/blue-flame-transparent-background/blue-flame-transparent-background-13.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          boxShadow: "0px 0px 12px rgba(0, 162, 255, 0.5)", // 🔵 Blue glow effect
        };
      }
      return (
        <Paper
          key={i}
          sx={{
            position: "relative",
            height: notMobile ? 550 : 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            borderRadius: "8px",
            transition: "transform 0.4s ease-out, box-shadow 0.4s ease-out",
            animation: `${fadeInZoom} 0.8s ease-out`,
            ...bgStyle,
          }}
        >
          {i === 0 && <ConfettiEffect />}
          {trophyIcon && <Avatar src={trophyIcon} sx={{ width: 64, height: 64, position: "absolute", top: 10, left: 10 }} />}
          <Box sx={{ padding: "16px", textAlign: "center" }}>
            <Typography sx={{ fontWeight: "bold" }} variant={notMobile ? "h3" : "h6"}>
              {item.name}
            </Typography>
            <Typography variant={notMobile ? "h5" : "body1"}>Kills: {item.kills}</Typography>
          </Box>
        </Paper>
      )
    })} 
  </Carousel>
        <YouTubePlaylist notMobile={notMobile} opts={opts} />
        <SpecialThanksCarousel notMobile={notMobile} />
        <div>
          <Typography variant="body2">Website hits: {viewCount === 0 ? 0 : viewCount}</Typography>
        </div>
      </Box>
    </Box>
  </ThemeProvider>
  )
}

export default Home

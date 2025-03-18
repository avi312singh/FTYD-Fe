import React, { useEffect, useState, useCallback, useMemo } from "react"
import axios from "axios"
import { ThemeProvider, createTheme, keyframes } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Box, Typography, useMediaQuery } from "@mui/material"
import { useDarkThemeContext } from "../components/DarkThemeContext/DarkThemeContext"
import NavDrawer from "../components/NavDrawer/NavDrawer"
import TypeWriter from "../components/TypeWriter/TypeWriter"
import Seo from "../components/Seo/Seo"
import YouTubePlaylist from "../components/YouTubePlaylist/YouTubePlaylist"
import SpecialThanksCarousel from "../components/SpecialThanksCarousel/SpecialThanksCarousel"
import Carousel from "react-material-ui-carousel"
import { Paper } from "@mui/material"

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
    url: `${endpoint}aggregatedStats/topPlayers?serverId=lasersword`,
    mode: "cors",
  }), [endpoint]); 

  const configViewCount = useMemo(() => ({
    method: "get",
    url: `${endpoint}aggregatedStats/pageCount/?page=/`,
    mode: "cors",
  }), [endpoint]); 

  const configViewCountUpdate = useMemo(() => ({
    method: "put",
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
  const movingGradientDark = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

const movingGradientLight = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;


  const items = response.map(player => ({
    name: player.playerName || "No player yet!",
    kills: player.totalKillsWeekly || "N/A",
    imageSrc:
      player.imageSrc !== null && player.imageSrc !== ""
        ? player.imageSrc
        : "http://clipart-library.com/images_k/blue-flame-transparent-background/blue-flame-transparent-background-13.png",
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
        <NavDrawer
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 1200, // Ensures it stays above content
        }}
      />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: theme.spacing(3),
            marginLeft: "240px",
            marginTop: theme.spacing(3),
          }}
        >
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
            <Typography
              variant={notMobile ? "h4" : "h6"}
              component={notMobile ? "h4" : "h6"}
            >
              To the official website of the Fall to your Death server
            </Typography>
          ) : (
            <Typography
              gutter
              variant={notMobile ? "h4" : "h6"}
              component={notMobile ? "h4" : "h6"}
            >
              To the official website of the Fall to your Death server
            </Typography>
          )}
          {chivSteamBrowser && (
            <Typography variant={"body1"} component={"body1"}>
              Press <Typography variant="caption">Open website</Typography> and
              expand window for a much better experience
            </Typography>
          )}
          <Typography
            sx={{
              paddingTop: 4,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: notMobile ? "2rem" : "1.5rem",
              position: "relative",
              color: darkMode ? "#f0f0f0" : "#1a1a1a", // Better text contrast
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
                animation: `${darkMode ? movingGradientDark : movingGradientLight} 3s linear infinite`,
              },
            }}
            gutterBottom
          >
            Players of the Week
          </Typography>
          <Carousel interval={5200} stopAutoPlayOnHover={false}>
            {items.map((item, i) => (
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
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0px 0px 12px rgba(255,255,255,0.2)"
                      : "0px 0px 12px rgba(0,0,0,0.2)",
                  transition: "transform 0.4s ease-out, box-shadow 0.4s ease-out",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${item.imageSrc})`,
                  color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  animation: `${fadeInZoom} 0.8s ease-out`,         
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0px 0px 20px rgba(255,255,255,0.3)"
                        : "0px 0px 20px rgba(0,0,0,0.3)", 
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(0, 0, 0, 0.6)"
                        : "rgba(255, 255, 255, 0.6)",
                    padding: "16px",
                    borderRadius: "8px",
                    textAlign: "center",
                    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                    opacity: 0.9,
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                    variant={notMobile ? "h3" : "h6"}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                    }}
                    variant={notMobile ? "h5" : "body1"}
                  >
                    Kills: {item.kills}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Carousel>
          <YouTubePlaylist notMobile={notMobile} opts={opts} />
          <SpecialThanksCarousel notMobile={notMobile} />
          <div>
            <Typography variant="body2">
              Website hits: {viewCount === 0 ? 0 : viewCount}
            </Typography>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Home

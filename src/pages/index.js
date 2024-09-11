import React, { useEffect, useState } from "react"
import axios from "axios"
import { ThemeProvider, createTheme } from "@mui/material/styles"
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
  const authorisation = process.env.GATSBY_AUTHORISATION

  console.log("GATSBY_ENDPOINT", endpoint)

  const config = {
    method: "get",
    url: `${endpoint}aggregatedstats/topPlayers`,
    headers: {
      Authorization: `Basic ${authorisation}`,
    },
  }

  const configViewCount = {
    method: "get",
    url: `${endpoint}aggregatedstats/pageCount/?page=/`,
    headers: {
      Authorization: `Basic ${authorisation}`,
    },
  }

  const configViewCountUpdate = {
    method: "put",
    url: `${endpoint}aggregatedstats/pageCount/?page=/`,
    headers: {
      Authorization: `Basic ${authorisation}`,
    },
  }

  useEffect(() => {
    axios(config)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          console.log(response.data.result.topPlayers)
          setResponse(response.data.result.topPlayers)
        }
      })
      .catch(error => {
        console.error(error)
      })

    axios(configViewCount)
      .then(viewCount => {
        if (viewCount.status === 201 || viewCount.status === 200) {
          setViewCount(viewCount.data.result.result[0].hits)
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
  }, [])

  const notMobile = useMediaQuery(theme.breakpoints.up("sm"))
  const chivSteamBrowser = useMediaQuery(theme.breakpoints.between("sm", "md"))

  // Set up default items with blue-flame as a placeholder image
  const items = response.map(player => ({
    name: player.playerName || "No player yet!",
    kills: player.totalKills || "N/A",
    imageSrc:
      player.imageSrc !== null && player.imageSrc !== ""
        ? player.imageSrc
        : "http://clipart-library.com/images_k/blue-flame-transparent-background/blue-flame-transparent-background-13.png",
  }))

  const opts = {
    height: notMobile ? "480" : "195",
    width: notMobile ? "800" : "320",
    playerVars: {
      autoplay: 1,
      listType: "playlist",
      list: "PLqBaHNBE-DBxLB8VfMaaAONaJJ3Jxf5bz", // Use your playlist ID here
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
        <NavDrawer />
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

          {/* Carousel for Players of the Week */}
          <Typography
            sx={{ paddingTop: 4, textAlign: "center" }}
            gutterBottom
            variant={notMobile ? "h5" : "h6"}
          >
            Players of the Week
          </Typography>
          <Carousel interval={5200} stopAutoPlayOnHover={false}>
            {items.map((item, i) => (
              <Paper
                key={i}
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#333" : "#fff",
                  color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0px 0px 12px rgba(255,255,255,0.2)"
                      : "0px 0px 12px rgba(0,0,0,0.2)",
                  transition: "background-color 0.3s, color 0.3s",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  }}
                  variant={notMobile ? "h3" : "h6"}
                >
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  }}
                  variant={notMobile ? "h5" : "body"}
                >
                  Kills: {item.kills}
                </Typography>
                <Box sx={{ textAlign: "center", paddingTop: "8px" }}>
                  <img
                    src={item.imageSrc}
                    alt={`Avatar of ${item.name}`}
                    style={{ width: "100px", height: "100px" }}
                  />
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

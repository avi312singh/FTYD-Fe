import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Card, CardContent, Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import YouTube from 'react-youtube';
import ReactGA from 'react-ga';

import TypeWriter from '../components/TypeWriter/TypeWriter'
import NavDrawer from '../components/NavDrawer/NavDrawer';
import Carousel from 'react-material-ui-carousel'
import Seo from "../components/Seo/Seo";

// import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const useStyles = makeStyles((theme) => ({
  miniCardContainers: {
    maxWidth: 220,
    margin: theme.spacing(0.5),
    marginTop: theme.spacing(4),
    backgroundColor: 'rgba(33,150,243,0.1)'
  },
  cardsContainer: {
    display: 'inline-flex',
    width: '100%',
    justifyContent: 'center',
    height: '180px'
  },
  carouselTopPlayerItems: {
    backgroundColor: 'rgba(33,150,243,0.1)'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  carouselHeading: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    textAlign: 'center',
  },
  carouselContainerThanks: {
    paddingBottom: theme.spacing(0.5),
  },
  youtubeMusicContainer: {
    paddingTop: theme.spacing(4),
    textAlign: 'center',
  },
  specialThanks: {
    paddingTop: theme.spacing(4),
  },
  ftydPlaylistHeading: {
    paddingTop: theme.spacing(4),
  },
  websiteHits: {
    textAlign: "center",
    margin: theme.spacing(1)
  },
  welcomeTypewriter: {
    height: '100%'
  },
  chivSteamBrowserText: {
    paddingTop: theme.spacing(4)
  }
}))

export default function Home() {
  const endpoint = process.env.GATSBY_ENDPOINT || (() => { new Error("Provide an endpoint in env vars") });
  const authorisation = process.env.GATSBY_AUTHORISATION || (() => { new Error("Provide a server IP in env vars") });
  const googleAnalytics = process.env.GATSBY_GA || (() => { new Error("Provide a server IP in env vars") });
  const [response, setResponse] = useState([]);
  const [viewCount, setViewCount] = useState(0);
  // const [youtubeReady, setYoutubeReady] = useState(false);

  const config = {
    method: 'get',
    url: `${endpoint}aggregatedstats/topPlayers`,
    headers: {
      'Authorization': `Basic ${authorisation}`,
    }
  };
  const configViewCount = {
    method: 'get',
    url: `${endpoint}aggregatedstats/pageCount/?page=/`,
    headers: {
      'Authorization': `Basic ${authorisation}`,
    }
  };
  const configViewCountUpdate = {
    method: 'put',
    url: `${endpoint}aggregatedstats/pageCount/?page=/`,
    headers: {
      'Authorization': `Basic ${authorisation}`,
    }
  };

  ReactGA.initialize(googleAnalytics);
  ReactGA.pageview('/');


  useEffect(() => {
    axios(configViewCountUpdate)
      .catch((error) => {
        console.log(error);
      })
      .then(
        axios(configViewCount)
          .then((viewCount) => {
            if (viewCount.status === 201 | 200) {
              setViewCount(viewCount.data.result.result[0].hits)
            }
          })
          .catch((error) => {
            console.log(error);
          })
      )
    axios(config)
      .then((response) => {
        if (response.status === 201 || 200) {
          setResponse(response.data.result.response);
        }
      })
      .catch((error) => {
        console.log(error);

      });
  }, [])

  const theme = useTheme();
  const notMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const chivSteamBrowser = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const classes = useStyles();

  console.log(viewCount)
  // console.log(response[0])
  // console.log(response[1])
  // console.log(response[2])

  const items = [
    {
      // name: "response[0][0]",
      name: response[0] ? response[0][0] : "No 1st player yet!",
      kills: response[0] ? response[0][1] : "",
      imageSrc: response[0] ? response[0][4] : "",
    },
    {
      // name: "response[1][0]",
      name: response[1] ? response[1][0] : "No 2nd player yet",
      kills: response[1] ? response[1][1] : "",
      imageSrc: response[1] ? response[1][4] : "",
    },
    {
      // name: "response[2][0]",
      name: response[2] ? response[2][0] : "No 3rd player yet",
      kills: response[2] ? response[2][1] : "",
      imageSrc: response[2] ? response[2][4] : "",
    }
  ]

  // const imageSrc1 = items[0].imageSrc
  // const imageSrc2 = items[1].imageSrc
  // const imageSrc3 = items[2].imageSrc

  // console.log('items ', items)

  const contentCreators = [
    { name: "Lord Wisel" },
    { name: "Llyweln Ap-Pudding" },
    { name: "| avi312singh" },
    { name: "OberTechno" },
  ]


  const opts = {
    height: notMobile ? '480' : '195',
    width: notMobile ? '800' : '320',
    playerVars: {
      autoplay: 1,
      listType: 'playlist',
      list: 'PLqBaHNBE-DBxLB8VfMaaAONaJJ3Jxf5bz',
      playlist: 'PLqBaHNBE-DBxLB8VfMaaAONaJJ3Jxf5bz',
      showinfo: 0,
      fs: 0,
      controls: 1,
      modestbranding: 0,
      color: 'white',
      iv_load_policy: 3,
    },
  };

  // const linkStyles = {
  //   textDecoration: "none",
  //   color: darkMode ? "white" : "black",
  // }

  return (
    <>
      <Seo />
      <NavDrawer>
        <TypeWriter className={classes.welcomeTypewriter} messages={
          ["Welcome", "Bienvenue", "Benvenuta", "добро пожаловать", "Bienvenidas", "欢迎", "Hoşgeldiniz", "Добре дошли", "어서 오세요", "Willkommen", "Witamy", "Vítejte", "Welkom", "Bine ati venit"]
        }></TypeWriter>
        {!chivSteamBrowser ?
        <Typography variant={notMobile ? "h4" : "h6"} component={notMobile ? "h4" : "h6"}>
          To the official website of the Fall to your Death server
        </Typography>
        :
        <Typography gutter variant={notMobile ? "h4" : "h6"} component={notMobile ? "h4" : "h6"}>
          To the official website of the Fall to your Death server
        </Typography>
        }
        {
          chivSteamBrowser &&
        <Typography className={classes.chivSteamBrowserText} variant={"body1"} component={"body1"}>
            Press <Typography variant="caption">Open website</Typography> and expand window for a much better experience
        </Typography>
        }
        {
          items !== [] ?
            <>
              <Typography style={{ 'text-align': 'center' }} variant={notMobile ? "h5" : "h6"} component={notMobile ? "h5" : "h6"} className={classes.carouselHeading}>
                Players of the Week
              </Typography>
              <Carousel
                className={classes.carouselContainer}
                interval={5200}
                stopAutoPlayOnHover={false}>
                {
                  items
                    .map((item, i) => {
                      const imageSrc = { item }
                      return (
                        <Paper className={classes.carouselTopPlayerItems}>
                          <Typography style={{ 'text-align': 'center' }} variant={notMobile ? "h3" : "h6"} component={notMobile ? "h3" : "h6"}>{item.name}</Typography>
                          {item.kills && imageSrc ? <>
                            <Typography style={{ 'text-align': 'center'  }} variant={notMobile ? "h5" : "body"} component={notMobile ? "h5" : "body"}color="primary">Kills</Typography>
                            <Typography style={{ 'text-align': 'center' }} variant={notMobile ? "h5" : "body"} component={notMobile ? "h5" : "body"} color="primary">{item.kills}</Typography>
                            <StaticImage
                              src="http://clipart-library.com/images_k/blue-flame-transparent-background/blue-flame-transparent-background-13.png"
                              alt="Player Avatar"
                              placeholder="blurred"
                              layout="constrained"
                               />
                          </> : ''}
                        </Paper>
                      )
                    })
                }
              </Carousel>
            </>
            :
            <br />
        }
        <Typography className={classes.ftydPlaylistHeading} gutterBottom style={{ 'text-align': 'center' }} variant={notMobile ? "h5" : "h6"} component={notMobile ? "h5" : "h6"}>
          FTYD Playlist
        </Typography>
        <YouTube
          className={'string'}
          containerClassName={classes.youtubeMusicContainer}
          opts={opts}
        // onReady={setYoutubeReady(true)}
        />
        <Typography className={classes.specialThanks} style={{ 'text-align': 'center' }} variant={notMobile ? "h5" : "h6"} component={notMobile ? "h5" : "h6"}>
          Special Thanks
        </Typography>

        <div className={classes.cardsContainer}>
          <>
            <Carousel
              className={classes.carouselContainerThanks}
              stopAutoPlayOnHover={false}
              interval={4000}
              navButtonsAlwaysInvisible={true}
              swipe={false}
              indicators={false}>
              {contentCreators.map((item, i) =>
                <Card className={classes.miniCardContainers}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Content Creator
                    </Typography>
                    <Typography variant={notMobile ? "h4" : "body"} component={notMobile ? "h3" : "body2"}>
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
              )
              }
            </Carousel>
          </>
        </div>
        <div className={classes.websiteHits}>
          <Typography variant="body2">
            Website hits: {viewCount === 0 ? 0 : viewCount}
          </Typography>
        </div>
      </NavDrawer>
    </>)
}
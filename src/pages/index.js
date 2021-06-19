import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Card, CardContent, Paper, Button, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import YouTube from 'react-youtube';
import ReactGA from 'react-ga';

import NavDrawer from '../components/NavDrawer/NavDrawer';
import Carousel from 'react-material-ui-carousel'
import Seo from "../components/Seo/Seo";
import useDarkThemeContext from "../components/DarkThemeContext/DarkThemeContext"

// import { Link } from "gatsby"

const useStyles = makeStyles((theme) => ({
  miniCardContainers: {
    maxWidth: 220,
    margin: theme.spacing(0.5),
    marginTop: theme.spacing(4),
  },
  cardsContainer: {
    display: 'inline-flex',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  carouselHeading: {
    paddingTop: theme.spacing(4),
    textAlign: 'center',
  },
  carouselContainer: {
    paddingTop: theme.spacing(4),
  },
  youtubeMusicContainer: {
    paddingTop: theme.spacing(4),
    textAlign: 'center',
  },
  specialThanks: {
    paddingTop: theme.spacing(4),
  }
}))

export default function Home() {
  const endpoint = process.env.GATSBY_ENDPOINT || (() => { new Error("Provide an endpoint in env vars") });
  const authorisation = process.env.GATSBY_AUTHORISATION || (() => { new Error("Provide a server IP in env vars") });
  const [response, setResponse] = useState([]);
  const config = {
    method: 'get',
    url: `${endpoint}aggregatedstats/topPlayers`,
    headers: {
      'Authorization': `Basic ${authorisation}`,
    }
  };

  ReactGA.initialize('G-9YJVK17ZBM');
  ReactGA.pageview('/');

  const { darkMode } = useDarkThemeContext()


  useEffect(() => {
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
  const classes = useStyles();

  console.log(response)
  // console.log(response[0])
  // console.log(response[1])
  // console.log(response[2])

  const items = [
    {
      // name: "response[0][0]",
      name: response[0] ? response[0][0] : "No 1st player yet!",
      kills: response[0] ? response[0][1] : "",
    },
    {
      // name: "response[1][0]",
      name: response[1] ? response[1][0] : "No 2nd player yet",
      kills: response[1] ? response[1][1] : "",
    },
    {
      // name: "response[2][0]",
      name: response[2] ? response[2][0] : "No 3rd player yet",
      kills: response[2] ? response[2][1] : "",
    }
  ]


  items.filter(el => el != null)
  console.log(items)

  const opts = {
    height: notMobile ? '390' : '195',
    width: notMobile ? '640' : '320',
    playerVars: {
      autoplay: 0,
      listType: 'playlist',
      list: 'PLqBaHNBE-DBxLB8VfMaaAONaJJ3Jxf5bz',
      playlist: 'PLqBaHNBE-DBxLB8VfMaaAONaJJ3Jxf5bz',
      showinfo: 0,
      fs: 0,
      controls: 1,
      modestbranding: 0,
      color: 'white'
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
        <Typography variant={notMobile ? "h2" : "h4"} component={notMobile ? "h3" : "h5"} gutterBottom>
          Welcome
        </Typography>
        <Typography variant={notMobile ? "h4" : "h6"} component={notMobile ? "h4" : "h6"}>
          To the official website of the fall to your death server
        </Typography>
        {
          items !== [] ?
            <>
              <Typography variant="h5" gutterBottom className={classes.carouselHeading}>
                Players of the Week
              </Typography>
              <Carousel
                className={classes.carouselContainer}
                interval={7000}>
                {
                  items
                    .map((item, i) =>
                      <Paper>
                        <h2>{item.name}</h2>
                        {item.kills ? <><Typography variant="body">Kills:</Typography> <p>{item.kills}</p></> : ''}

                        <Button className="CheckButton">
                          {/* <Link style={linkStyles} to={'player-info'}>Leaderboards</Link> */}
                        </Button>
                      </Paper>)
                }
              </Carousel>

              <Typography variant="h4" gutterBottom className={classes.carouselHeading}>
              </Typography>
            </>
            :
            <br />
        }
        <Typography gutterBottom style={{ 'text-align': 'center' }} variant={notMobile ? "h5" : "h6"} component={notMobile ? "h5" : "h6"}>
          FTYD Playlist
        </Typography>
        <YouTube
          className={'string'}
          containerClassName={classes.youtubeMusicContainer}
          opts={opts}
        />
        <Typography className={classes.specialThanks} style={{ 'text-align': 'center' }} variant={notMobile ? "h4" : "h6"} component={notMobile ? "h4" : "h6"}>
          Special Thanks
        </Typography>

        <div className={classes.cardsContainer}>

          <Card className={classes.miniCardContainers}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Content Creator
              </Typography>
              <Typography variant={notMobile ? "h4" : "body"} component={notMobile ? "h3" : "body2"}>
                Lord Wisel
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.miniCardContainers}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Content Creator
              </Typography>
              <Typography variant={notMobile ? "h4" : "body"} component={notMobile ? "h3" : "body2"}>
                Llyweln Ap-Pudding
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.miniCardContainers}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Content Creator
              </Typography>
              <Typography variant={notMobile ? "h4" : "body"} component={notMobile ? "h3" : "body2"}>
                | avi312singh
              </Typography>
            </CardContent>
          </Card>
        </div>

      </NavDrawer>
    </>)
}
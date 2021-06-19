import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Paper, Button, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import YouTube from 'react-youtube';

import NavDrawer from '../components/NavDrawer/NavDrawer';
import Carousel from 'react-material-ui-carousel'

import Seo from "../components/Seo/Seo";

const useStyles = makeStyles((theme) => ({
  carouselHeading: {
    textAlign: 'center',
  },
  carouselContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  youtubeMusicContainer : {
    textAlign: 'center',
  }
}))

export default function Home() {
  const endpoint = process.env.GATSBY_ENDPOINT || (() => { new Error("Provide an endpoint in env vars") });
  const authorisation = process.env.GATSBY_AUTHORISATION || (() => { new Error("Provide a server IP in env vars") });
  const [response, setResponse] = useState([]);
  const config = {
    method: 'get',
    url: `${endpoint}aggregatedstats/playerCount?duration=288`,
    headers: {
      'Authorization': `Basic ${authorisation}`,
    }
  };


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

  const items = [
    {
      name: <Typography variant="h4" gutterBottom className={classes.carouselHeading}>
        Player of the week
      </Typography>,
      description: "Probably the most random thing you have ever seen!"
    },
    // {
    //   name: "Random Name #2",
    //   description: "Hello World!"
    // }
  ]

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

  const Item = (props) =>
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">
        Check it out!
      </Button>
    </Paper>

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
        <Carousel
          className={classes.carouselContainer}
          interval={7000}>
          {
            items.map((item, i) => <Item key={i} item={item} />)
          }
        </Carousel>
        <Typography style={{'text-align' : 'center'}} variant={notMobile ? "h4" : "h6"} component={notMobile ? "h4" : "h6"}>
         Ftyd playlist
        </Typography>
        <YouTube
          className={'string'}
          containerClassName={classes.youtubeMusicContainer}
          opts={opts}
        />

      </NavDrawer>
    </>)
}
import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Paper, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import NavDrawer from '../components/NavDrawer/NavDrawer';
import Carousel from 'react-material-ui-carousel'

import Seo from "../components/Seo/Seo";

const useStyles = makeStyles((theme) => ({
  graphContainer: {
    paddingTop: theme.spacing(2),
  },
  durationDropdown: {
  },
}))

export default function Home() {
  const endpoint = process.env.GATSBY_ENDPOINT || (() => { new Error("Provide an endpoint in env vars") });
  const authorisation = process.env.GATSBY_AUTHORISATION || (() => { new Error("Provide a server IP in env vars") });
  const [response, setResponse] = useState([]);
  const [currentOption, setCurrentOption] = useState(288)
  const [value, setValue] = React.useState(0);

  const config = {
    method: 'get',
    url: `${endpoint}aggregatedstats/playerCount?duration=${currentOption}`,
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
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();

  const items = [
    {
      name: "Player of the week",
      description: "Probably the most random thing you have ever seen!"
    },
    {
      name: "Random Name #2",
      description: "Hello World!"
    }
  ]

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
      <Seo/>
      <NavDrawer>

        <Carousel
        interval={7000}>
          {
            items.map((item, i) => <Item key={i} item={item} />)
          }
        </Carousel>


      </NavDrawer>
    </>)
}
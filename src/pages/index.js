import React, { useEffect, useState } from "react"
import axios from 'axios'
import Dropdown from 'react-dropdown';
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line } from 'recharts'
import { Container, Tab, Tabs } from "@material-ui/core";
import NavDrawer from './components/NavDrawer/NavDrawer'
import KillsPieChart from './components/KillsPieChart/KillsPieChart'
import DurationPieChart from './components/DurationPieChart/DurationPieChart'
import { makeStyles } from '@material-ui/core/styles';
import 'react-dropdown/style.css';
import Seo from "./components/Seo/Seo";

const options = [
  { value: 288, label: 'Day' },
  { value: 2016, label: 'Week' },
  { value: 8760, label: 'Month' },
];

const useStyles = makeStyles((theme) => ({
  graphContainer: {
    paddingTop: theme.spacing(2),
  },
  durationDropdown: {
    paddingTop: theme.spacing(1)
  },
}))

export default function Home() {
  const endpoint = process.env.GATSBY_ENDPOINT || (() => { new Error("Provide an endpoint in env vars") });
  const authorisation = process.env.GATSBY_AUTHORISATION || (() => { new Error("Provide a server IP in env vars") });
  const [response, setResponse] = useState([]);
  const [currentOption, setCurrentOption] = useState(288)
  const [value, setValue] = React.useState(0);

  const [config, setConfig] = React.useState({
    method: 'get',
    url: `${endpoint}aggregatedstats/playerCount?duration=${currentOption}`,
    headers: {
      'Authorization': `Basic ${authorisation}`,
    }
  })

  useEffect(() => {
    console.log(config)
    axios(config)
      .then((response) => {
        if (response.status === 201 || 200) {
          setResponse(response.data.result.response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentOption, config])

  const defaultOption = options[0];

  const parseSelected = (event) => {
    const valueToParse = event.value;
    setCurrentOption(valueToParse);
    setConfig({
      method: 'get',
      url: `${endpoint}aggregatedstats/playerCount?duration=${valueToParse}`,
      headers: {
        'Authorization': `Basic ${authorisation}`,
      }
    })
  }

  const handleTabChange = (event, newValue) => {
    setCurrentOption(288);
    if (value !== newValue) {
      setValue(newValue);
    }
  };

  const classes = useStyles();

  return (
    <>
      <Seo/>
      <NavDrawer>
        {<Container className={classes.graphContainer}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Player Count" />
            <Tab label="Kill Count" />
            <Tab label="Hours Spent" />
          </Tabs>
          {value === 0 &&
            <>
              <Dropdown options={options} value={defaultOption} onChange={parseSelected} placeholder="Select an option" className={classes.durationDropdown} />
              <LineChart
                width={1000}
                height={400}
                data={response}
                margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
              >
                <Line type="monotone" dataKey="playerCount" stroke="black" />
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis dataKey="playerCount" />
                <Tooltip />
              </LineChart>
            </>}
          {value === 1 &&
            <KillsPieChart />
          }
          {
            value === 2 &&
            <DurationPieChart />
          }
        </Container>
        }
      </NavDrawer>
    </>)
}
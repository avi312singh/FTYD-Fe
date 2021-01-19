import React, { useEffect, useState } from "react"
import { Line } from 'react-chartjs-2';
import axios from 'axios'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Home() {

  const [response, setResponse] = useState([]);
  const [currentOption, setCurrentOption] = useState(288)

  useEffect(() => {
    axios.get(`http://localhost:666/aggregatedstats/playerCount?duration=${currentOption}`)
    .then(result => setResponse(result.data.response))
  }, [currentOption])

  const options = [
    { value: 288, label: 'Day' },
    { value: 2016, label: 'Week' },
    { value: 8760, label: 'Month' },
  ];
  const defaultOption = options[0];
  const times = response.map(element => element.time)
  const playerCounts = response.map(element => element.playerCount)

  const data = {
    labels: times,
    datasets: [
      {
        label: 'Player Count',
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: playerCounts
      }
    ]
  };


  function parseSelected(event) {
    const valueToParse = event.value;
    setCurrentOption(valueToParse);
    return;
  }

  return (
    <>
      <div>
        <h2>Fall to your death server</h2>
        <Dropdown options={options} value={defaultOption} onChange={parseSelected} placeholder="Select an option" />
        <Line data={data} />
      </div>
    </>)
}

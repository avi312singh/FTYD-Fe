import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Tooltip, Pie, PieChart, Cell } from 'recharts'

const KillsPieChart = () => {
    const [response, setResponse] = useState([]);
    const endpoint = process.env.GATSBY_ENDPOINT || (() => { new Error("Provide an endpoint in env vars") });
    const authorisation = process.env.GATSBY_AUTHORISATION || (() => { new Error("Provide a server IP in env vars") });

    const config = {
        method: 'get',
        url: `${endpoint}aggregatedStats/killCount?duration=999`,
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

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#42C1FF'];
    return (
        <PieChart width={800} height={400}>
            <Tooltip />
            <Pie
                data={response.filter(duration => duration.name !== "All")}
                dataKey="kills"
                cx={240}
                cy={200}
                innerRadius={100}
                outerRadius={130}
                fill="#8884d8"
                paddingAngle={5}
                label
                labelLine
                animationDuration={500}
            >
                {response.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Pie
                data={response}
                dataKey="kills"
                cx={620}
                cy={200}
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                label
                labelLine
            >
                {response.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    )
}

export default KillsPieChart;
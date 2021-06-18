import React, { useEffect, useState } from "react"
import axios from 'axios'
import NavDrawer from "../components/NavDrawer/NavDrawer"
import MUIDataTable from "mui-datatables";

import Seo from "../components/Seo/Seo";

export default function TopPlayers() {
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

    const columns = ["Name", "Weekly Kills", "Weekly Hours", "Kills Per Time Ratio"];
    const options = {
        filterType: 'checkbox',
        selectableRows: "none",
        pagination: false,
        filter: false,
        download: false,
        viewColumns: false
    };

    return (
        <NavDrawer>
            <>
                <Seo />
                <MUIDataTable
                    title={`Top Weekly Players (${response.length} Players)`}
                    data={response}
                    columns={columns}
                    options={options}
                />
            </>
        </NavDrawer>
    )
}
import React, { useEffect } from "react"
import { TextField, InputAdornment, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ReactGA from 'react-ga';
import axios from 'axios'

import NavDrawer from "../components/NavDrawer/NavDrawer"
import Seo from "../components/Seo/Seo";

const useStyles = makeStyles((theme) => ({
    donateContainer: {
        marginLeft: theme.spacing(7),
        width: '60%'
    },
    PayPalContainer: {
        marginTop: theme.spacing(2),
    },
    PayPalButton: {
        maxWidth: "100%"
    },
    amountInput: {
        minWidth: 'auto',
        maxWidth: '100%',
        width: '100%'
    },
    form: {
        maxWidth: '749px',
        minWidth: '200px'
    },
    donateMessage: {
        marginBottom: theme.spacing(3)
    }
}))


export default function Donate() {
    const classes = useStyles();
    const endpoint = process.env.GATSBY_ENDPOINT || (() => { new Error("Provide an endpoint in env vars") });
    const authorisation = process.env.GATSBY_AUTHORISATION || (() => { new Error("Provide a server IP in env vars") });
    const googleAnalytics = process.env.GATSBY_GA || (() => { new Error("Provide a server IP in env vars") });
    const [donationAmount, setDonationAmount] = React.useState("5.00");
    // const [orderID, setOrderID] = React.useState(false);
    const donationAmountRegex = /^[0-9]*\.{1}[0-9][0-9]$/g;
    const clientId = process.env.GATSBY_PAYPAL_CLIENTID;

    const configViewCount = {
        method: 'get',
        url: `${endpoint}aggregatedstats/pageCount/?page=donate`,
        headers: {
            'Authorization': `Basic ${authorisation}`,
        }
    };

    useEffect(() => {
        axios(configViewCount)
            .catch((error) => {
                console.log(error);
            });
    }, [])

    ReactGA.initialize(googleAnalytics);
    ReactGA.pageview('/donate');

    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: donationAmount,
                        },
                        description: "Fall to your death donation",
                        category: "DIGITAL_GOODS"
                    },
                ],
                application_context: {
                    shipping_preference: "NO_SHIPPING"
                }
            })
            // .then((orderID) => {
            //     setOrderID(orderID);
            //     return orderID;
            // });
    }
    return (
        <>
            <Seo />
            <NavDrawer customDrawerWidth={5}>
                <div className={classes.donateMessage}>
                    <Typography >
                        Please support the server and this site for future content and free hosting!
                    </Typography>
                </div>
                <Box className={classes.donateContainer}>
                    {
                        donationAmount.match(donationAmountRegex) && donationAmount >= 0.01 ?
                            <form className={classes.form} noValidate autoComplete="off">
                                <TextField defaultValue="5.00"
                                    className={classes.amountInput}
                                    id="outlined-basic"
                                    label="Donation Amount"
                                    variant="outlined"
                                    onChange={e => setDonationAmount(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">£</InputAdornment>,
                                    }} />
                            </form>
                            :
                            <form className={classes.form} noValidate autoComplete="off">
                                <TextField
                                    className={classes.amountInput}
                                    defaultValue="5.00"
                                    helperText="Please enter a valid donation amount of at least £0.01"
                                    id="outlined-basic"
                                    label="Donation Amount"
                                    variant="outlined"
                                    onChange={e => setDonationAmount(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">£</InputAdornment>,
                                    }} />
                            </form>
                    }
                    <div className={classes.PayPalContainer}>
                        <PayPalScriptProvider options={{ "client-id": clientId, currency: "GBP", "disable-funding": "sofort" }}>
                            {donationAmount.match(donationAmountRegex) && donationAmount >= 0.01 ?
                                <PayPalButtons className={classes.PayPalButton} forceReRender={[donationAmount]} createOrder={createOrder} />
                                :
                                <PayPalButtons className={classes.PayPalButton} disabled />}
                        </PayPalScriptProvider>
                    </div>
                </Box>
            </NavDrawer>

        </>)
}
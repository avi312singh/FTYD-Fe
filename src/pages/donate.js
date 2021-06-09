import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NavDrawer from "./components/NavDrawer/NavDrawer"
import Typography from '@material-ui/core/Typography';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import 'react-dropdown/style.css';
import Seo from "./components/Seo/Seo";

const useStyles = makeStyles((theme) => ({
    PayPalButton: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(5)
    },
    amountInput: {
        marginTop: theme.spacing(1),
    },
    donateMessage: {
        marginBottom: theme.spacing(3)
    }
}))

export default function Home() {
    const classes = useStyles();
    const [donationAmount, setDonationAmount] = React.useState("5.00");
    const [orderID, setOrderID] = React.useState(false);
    const donationAmountRegex = /^[0-9]*\.{1}[0-9][0-9]$/g;
    const clientId = process.env.GATSBY_PAYPAL_CLIENTID;

    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: donationAmount,
                        },
                    },
                ],
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    }
    return (
        <>
        <Seo/>
            <NavDrawer customDrawerWidth={5}>
                <div className={classes.donateMessage}>
                <Typography >
                    Please support the server and this site for future content and free hosting!
                    </Typography>
                </div>
                {
                    donationAmount.match(donationAmountRegex) && donationAmount >= 0.01 ?
                        <form className={classes.amountInput} noValidate autoComplete="off">
                            <TextField defaultValue="5.00"
                                id="outlined-basic"
                                label="Donation Amount"
                                variant="outlined"
                                style={{ "minWidth": "55%", "marginLeft": "40px" }}
                                onChange={e => setDonationAmount(e.target.value)} />
                        </form>
                        :
                        <form className={classes.amountInput} noValidate autoComplete="off">
                            <TextField defaultValue="5.00"
                                helperText="Please enter a valid donation amount of at least 0.01"
                                id="outlined-basic"
                                label="Donation Amount"
                                variant="outlined"
                                style={{ "minWidth": "55%", "marginLeft": "40px" }}
                                onChange={e => setDonationAmount(e.target.value)} />
                        </form>
                }
                <div className={classes.PayPalButton}>
                    <PayPalScriptProvider options={{ "client-id": clientId, currency: "GBP", "disable-funding": "sofort" }}>
                        {donationAmount.match(donationAmountRegex) && donationAmount >= 0.01 ?
                            <PayPalButtons forceReRender={[donationAmount]} createOrder={createOrder} />
                            :
                            <PayPalButtons disabled />}
                    </PayPalScriptProvider>
                </div>
            </NavDrawer>

        </>)
}
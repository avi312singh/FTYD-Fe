import React, { useEffect } from "react"
import { TextField, InputAdornment, Typography, Box } from "@mui/material"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useDarkThemeContext } from "../components/DarkThemeContext/DarkThemeContext"
import axios from "axios"

import NavDrawer from "../components/NavDrawer/NavDrawer"
import Seo from "../components/Seo/Seo"

export default function Donate() {
  const endpoint =
    process.env.GATSBY_ENDPOINT ||
    (() => {
      new Error("Provide an endpoint in env vars")
    })

  const [donationAmount, setDonationAmount] = React.useState("5.00")
  const donationAmountRegex = /^[0-9]*\.{1}[0-9][0-9]$/g
  const clientId = process.env.GATSBY_PAYPAL_CLIENTID

  const configViewCountUpdate = {
    method: "put",
    url: `${endpoint}aggregatedStats/pageCount/?page=donate`,
  }

  const { darkMode } = useDarkThemeContext()

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
    spacing: 8,
  })

  useEffect(() => {
    axios(configViewCountUpdate).catch(error => {
      console.log(error)
    })
  }, [])

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: donationAmount,
          },
          description: "Fall to your death donation",
          category: "DIGITAL_GOODS",
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    })
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Seo
          title="Donate to Fall to Your Death"
          description="Support the Fall to Your Death server and website by making a donation. Help us continue providing great content and free hosting."
          image="\static\images\ftyd.jpg"
          article={false}
        />
        <NavDrawer customDrawerWidth={5}>
          <Box
            sx={{
              mb: 3,
              mt: { xs: 6, sm: 10 },
              textAlign: { xs: "center", sm: "left" },
              ml: { xs: 0, sm: "240px" },
              px: { xs: 2, sm: 0 },
            }}
          >
            <Typography>
              Please support the server and this site for future content and
              free hosting!
            </Typography>
          </Box>
          <Box
            sx={{
              ml: { xs: 0, sm: 7 },
              marginLeft: { xs: 0, sm: "240px" },
              width: { xs: "90%", sm: "60%" },
              flexGrow: 1,
              padding: theme.spacing(3),
              mt: { xs: 4, sm: theme.spacing(3) },
              px: { xs: 2, sm: 0 },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            {donationAmount.match(donationAmountRegex) &&
            donationAmount >= 0.01 ? (
              <form
                noValidate
                autoComplete="off"
                style={{ width: "100%", maxWidth: "749px" }}
              >
                <TextField
                  defaultValue="5.00"
                  fullWidth
                  label="Donation Amount"
                  variant="outlined"
                  onChange={e => setDonationAmount(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">£</InputAdornment>
                    ),
                  }}
                />
              </form>
            ) : (
              <form
                noValidate
                autoComplete="off"
                style={{ width: "100%", maxWidth: "749px" }}
              >
                <TextField
                  fullWidth
                  defaultValue="5.00"
                  helperText="Please enter a valid donation amount of at least £0.01"
                  label="Donation Amount"
                  variant="outlined"
                  onChange={e => setDonationAmount(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">£</InputAdornment>
                    ),
                  }}
                />
              </form>
            )}
            <Box sx={{ mt: 2, width: "100%", maxWidth: "749px" }}>
              <PayPalScriptProvider
                options={{
                  "client-id": clientId,
                  currency: "GBP",
                  "disable-funding": "sofort",
                }}
              >
                {donationAmount.match(donationAmountRegex) &&
                donationAmount >= 0.01 ? (
                  <PayPalButtons
                    style={{ maxWidth: "100%" }}
                    forceReRender={[donationAmount]}
                    createOrder={createOrder}
                  />
                ) : (
                  <PayPalButtons style={{ maxWidth: "100%" }} disabled />
                )}
              </PayPalScriptProvider>
            </Box>
          </Box>
        </NavDrawer>
      </ThemeProvider>
    </>
  )
}

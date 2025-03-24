import * as React from "react"
import { Box, Typography, Button } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { Link } from "gatsby"

import NavDrawer from "../components/NavDrawer/NavDrawer"
import Seo from "../components/Seo/Seo"

export default function NotFoundPage() {
  const theme = useTheme()

  return (
    <>
      <Seo title="404: Not Found" />
      <NavDrawer>
        <Box
          sx={{
            paddingTop: 6,
            marginLeft: { sm: "240px" },
            width: { xs: "100%", sm: `calc(100% - 240px)` },
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            textAlign: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Typography variant="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Oops, this page doesn’t exist.
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
          >
            Go Back Home
          </Button>
        </Box>
      </NavDrawer>
    </>
  )
}

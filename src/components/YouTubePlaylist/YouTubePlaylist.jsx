import React, { Suspense } from "react"
import { CircularProgress, Typography, Box } from "@mui/material"
import YouTube from "react-youtube"

const YouTubePlaylist = ({ notMobile, opts }) => {
  return (
    <>
      <Typography
        sx={{ paddingTop: 4, textAlign: "center" }}
        gutterBottom
        variant={notMobile ? "h5" : "h6"}
      >
        FTYD Playlist
      </Typography>

      <Suspense fallback={<CircularProgress size="1.5rem" />}>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <YouTube
            className={"youtube-container"}
            opts={opts}
            containerClassName={"youtubeMusicContainer"}
          />
        </Box>
      </Suspense>
    </>
  )
}

export default YouTubePlaylist

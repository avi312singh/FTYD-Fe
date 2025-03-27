import React, { useEffect, useRef } from "react"
import { Box, IconButton } from "@mui/material"
import { Link } from "gatsby"

const LogoWithEffects = ({ darkMode }) => {
  const logoRef = useRef()
  const lastScroll = useRef(0)
  const scrollTimeout = useRef(null)
  const firstScrollHandled = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      const delta = currentScroll - lastScroll.current

      if (!firstScrollHandled.current) {
        lastScroll.current = currentScroll
        firstScrollHandled.current = true
        return
      }

      const direction = delta > 0 ? 1 : -1

      if (logoRef.current) {
        logoRef.current.style.transition = "transform 0.1s ease-out"
        logoRef.current.style.transform = `rotate(${direction * 14}deg)`
      }

      clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        if (logoRef.current) {
          logoRef.current.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
          logoRef.current.style.transform = "rotate(0deg)"
        }
      }, 150)

      lastScroll.current = currentScroll
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(scrollTimeout.current)
    }
  }, [])

  return (
    <Box sx={{ position: "relative", width: "fit-content" }}>
      <IconButton component={Link} to="/" sx={{ p: 0 }}>
        <img
          ref={logoRef}
          src={
            !darkMode
              ? "https://images.steamusercontent.com/ugc/16431529707519534/EECE279D61FE0C8ACDD06CE6656E3FE3761304E6/"
              : "https://images.steamusercontent.com/ugc/16431529707522218/03639E5FEB003A2E384BC4A17AA9DAB510F8A421/"
          }
          alt="FTYD Logo"
          style={{ height: "40px", borderRadius: "4px" }}
        />
      </IconButton>
    </Box>
  )
}

export default LogoWithEffects

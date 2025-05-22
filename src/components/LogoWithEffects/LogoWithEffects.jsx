import React, { useEffect, useRef } from "react"
import { Box, IconButton } from "@mui/material"
import { Link } from "gatsby"

import darkModeChivalry from "/static/images/favicon_dark.webp"
import lightModeChivalry from "/static/images/favicon_light.webp"

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
          // Wobble sequence (decreasing angles)
          const logo = logoRef.current
          const sequence = [8, -5, 3, -1.5, 0]
          let i = 0

          const wobble = () => {
            if (!logo) return
            logo.style.transition = "transform 0.15s ease-out"
            logo.style.transform = `rotate(${sequence[i]}deg)`
            i++
            if (i < sequence.length) {
              setTimeout(wobble, 100)
            }
          }

          wobble()
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
          src={darkMode ? darkModeChivalry : lightModeChivalry}
          alt="FTYD Logo"
          style={{ height: "40px", borderRadius: "4px" }}
        />
      </IconButton>
    </Box>
  )
}

export default LogoWithEffects

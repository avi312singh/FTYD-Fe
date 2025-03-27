import { useEffect } from "react"
import { useLocation } from "@reach/router"
import ReactGA from "react-ga4"

const GA_MEASUREMENT_ID = process.env.GATSBY_GA_MEASUREMENT_ID

let isGAInitialized = false

export default function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    if (!isGAInitialized && GA_MEASUREMENT_ID) {
      ReactGA.initialize(GA_MEASUREMENT_ID)
      isGAInitialized = true
    }

    if (GA_MEASUREMENT_ID) {
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
      })
    }
  }, [location])
}

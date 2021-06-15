/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  plugins: [`gatsby-plugin-material-ui`, `gatsby-plugin-react-helmet`],
  siteMetadata: {
    title: "Fall to Your Death",
    titleTemplate: "%s · The official server website",
    description:
      "The official website of the Fall to Your Death server",
    url: "https://falltoyourdeath.gatsbyjs.io/", // No trailing slash allowed!
    image: "/images/ftyd.jpg", // Path to your image you placed in the 'static' folder
  },
}

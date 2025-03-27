require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images/`,
      },
    },
    // Add other plugins as needed
  ],
  siteMetadata: {
    title: "Fall to Your Death",
    titleTemplate: "%s · The official server website",
    description: "The official website of the Fall to Your Death server",
    url: "https://falltoyourdeath.net", // No trailing slash allowed!
    image: "process.env.GATSBY_FTYD_IMAGE", // Path to your image you placed in the 'static' folder
  },
}

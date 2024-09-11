require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
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
    description:
      "The official website of the Fall to Your Death server",
    url: "https://falltoyourdeath.gatsbyjs.io/", // No trailing slash allowed!
    image: "/images/ftyd.jpg", // Path to your image you placed in the 'static' folder
  },
}

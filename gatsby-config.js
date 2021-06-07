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
  plugins: [`gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-plugin-paypal`,
      options: {
        clientId: process.env.GATSBY_PAYPAL_CLIENTID,
        currency: `GBP`,
        vault: true
      }
    }],
}

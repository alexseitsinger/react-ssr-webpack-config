/**
 * The config objects to use with Webpack.
 *
 * @name configs
 *
 * @property {object} client
 * @property {object} client.development
 * @property {object} client.production
 * @property {object} client.staging
 * @property {object} server
 * @property {object} server.development
 * @property {object} server.production
 * @property {object} server.staging
 *
 * @example
 * const configs = require("@alexseitsinger/react-ssr-webpack-config")
 *
 * module.exports = configs.client.development
 */
module.exports = {
  client: {
    development: require("./configs/client/development"),
    production: require("./configs/client/production"),
    staging: require("./configs/client/staging"),
  },
  server: {
    development: require("./configs/server/development"),
    production: require("./configs/server/production"),
    staging: require("./configs/server/staging"),
  }
}

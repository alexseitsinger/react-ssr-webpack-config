/**
 * The config objects to use for Webpack.
 *
 * @return {object}
 * A collection of objects that can be used for Webpack.
 *
 * @example
 * const webpackConfig = require("@alexseitsinger/react-ssr-webpack-config")
 *
 * module.exports = webpackConfig.client.development
 */
module.exports = {
  options: require("./config/options"),
  bases: {
    base: require("./config/base"),
    development: require("./config/development.base"),
    production: require("./config/production.base"),
    staging: require("./config/staging.base"),
  },
  client: {
    base: require("./config/client/base"),
    development: require("./config/client/development"),
    shared: require("./config/client/shared.base"),
    production: require("./config/client/production"),
    staging: require("./config/client/staging"),
  },
  server: {
    base: require("./config/server/base"),
    development: require("./config/server/development"),
    shared: require("./config/server/shared.base"),
    production: require("./config/server/production"),
    staging: require("./config/server/staging"),
  }
}

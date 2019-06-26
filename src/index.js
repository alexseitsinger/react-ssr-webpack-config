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
  options: require("./configs/options"),
  bases: {
    base: require("./configs/base"),
    development: require("./configs/development.base"),
    production: require("./configs/production.base"),
    staging: require("./configs/staging.base"),
  },
  client: {
    base: require("./configs/client/base"),
    shared: require("./configs/client/shared.base"),
    development: require("./configs/client/development"),
    production: require("./configs/client/production"),
    staging: require("./configs/client/staging"),
  },
  server: {
    base: require("./configs/server/base"),
    shared: require("./configs/server/shared.base"),
    development: require("./configs/server/development"),
    production: require("./configs/server/production"),
    staging: require("./configs/server/staging"),
  }
}

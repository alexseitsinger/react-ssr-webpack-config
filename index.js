/**
 * @description The config objects to use for Webpack.
 * @return {object} A collection of objects that can be used for Webpack.
 * @example
 * // webpack.config.development.js
 *
 * const webpackConfig = require("@alexseitsinger/react-ssr-webpack-config")
 *
 * module.exports = webpackConfig.client.development
 *
 * // or
 *
 * const webpackConfig = require("@alexseitsinger/react-ssr-webpack-config")
 * const merge = require("webpack-merge")
 *
 * module.exports = merge.smart(webpackConfig.client.development, {
 *   plugins: [
 *     // Add some more plugins here...
 *   ]
 * })
 */
module.exports = {
  options: require.resolve("./config/options"),
  bases: {
    base: require.resolve("./config/base"),
    development: require.resolve("./config/development.base"),
    production: require.resolve("./config/production.base"),
    staging: require.resolve("./config/staging.base"),
  },
  client: {
    base: require.resolve("./config/client/base"),
    development: require.resolve("./config/client/development"),
    shared: require.resolve("./config/client/shared.base"),
    production: require.resolve("./config/client/production"),
    staging: require.resolve("./config/client/staging"),
  },
  server: {
    base: require.resolve("./config/server/base"),
    development: require.resolve("./config/server/development"),
    shared: require.resolve("./config/server/shared.base"),
    production: require.resolve("./config/server/production"),
    staging: require.resolve("./config/server/staging"),
  }
}

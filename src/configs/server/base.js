const webpack = require("webpack")
const merge = require("webpack-merge")
const nodeExternals = require("webpack-node-externals")

const baseConfig = require("../base")

module.exports = merge.smart(baseConfig, {
  target: "node",
  devtool: false,
  entry: {
    server: "./src/server.js",
  },
  output: {
    libraryTarget: "commonjs2",
  },
  // If we use nodeExternals, any external CSS modules will not load using the
  // CSS loader we specify. So, disable this or explicitly exclude the external
  // node modulees in the site config.
  //externals: [nodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      AGENT_NAME: JSON.stringify("server"),
    }),
  ],
})

const webpack = require("webpack")
const merge = require("webpack-merge")
const BundleTracker = require("webpack-bundle-tracker")

const options = require("../options")
const developmentBaseConfig = require("../development.base")
const clientBaseConfig = require("./base")

const settings = options.getSettings({
  agent: "client",
  environment: "development",
})

module.exports = merge.smart(developmentBaseConfig, clientBaseConfig, {
  output: {
    path: settings.outputPath,
    publicPath: settings.publicPath,
    crossOriginLoading: "anonymous",
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                /**
                 * Use a more verbose name in development for CSS classes for easy
                 * debugging. They should match the same pattern used in
                 * server-side rendering classNames.
                 *
                 * (eg: Note the third '_' in the second set of underscores)
                 */
                localIdentName: "[name]__[local]___[hash:base64:5]",
                context: __dirname,
              },
            },
          },
        ],
      },
    ],
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleTracker({ filename: settings.webpackStats }),
  ],
  devServer: {
    host: settings.devServer.host,
    port: settings.devServer.port,
    historyApiFallback: true,
    // Serve staticfiles from django, not express. (default: /)
    publicPath: settings.publicPath,
    // Disable serving static content from webpack. (we use Django)
    contentBase: false,
    watchContentBase: false,
    serveIndex: false,
    hotOnly: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    inline: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
})

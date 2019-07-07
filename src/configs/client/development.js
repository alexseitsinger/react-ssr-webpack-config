const webpack = require("webpack")
const merge = require("webpack-merge")
const BundleTracker = require("webpack-bundle-tracker")

const options = require("../options")
const developmentBaseConfig = require("../development.base")
const clientBaseConfig = require("./base")

const generated = options.generate({
  agent: "client",
  environment: "development",
})

module.exports = merge.smart(developmentBaseConfig, clientBaseConfig, {
  output: {
    path: generated.outputPath,
    publicPath: generated.publicPath,
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
        include: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                context: __dirname,
                localIdentName: "[local]",
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                context: __dirname,
                localIdentName: "[name]__[local]___[hash:base64:5]",
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
    new BundleTracker({ filename: generated.webpackStats }),
  ],
  devServer: {
    host: generated.devServer.host,
    port: generated.devServer.port,
    historyApiFallback: true,
    // Serve staticfiles from django, not express. (default: /)
    publicPath: generated.publicPath,
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

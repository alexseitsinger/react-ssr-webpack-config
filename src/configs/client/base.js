const webpack = require("webpack")
const merge = require("webpack-merge")

const configBase = require("../base")

module.exports = merge.smart(configBase, {
  entry: {
    client: "./src/client.js",
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|ico)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[sha512:hash:base64:7].[ext]",
            },
          },
        ],
      },
      {
        test: /\.((ttf|eot|svg|woff(2)?)(\?v=\d+\.\d+\.\d+)?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[sha512:hash:base64:7].[ext]",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /\/node_modules\//,
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      AGENT_NAME: JSON.stringify("client"),
    }),
  ],
})

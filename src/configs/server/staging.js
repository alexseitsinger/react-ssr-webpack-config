const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")

const options = require("../options")
const stagingBaseConfig = require("../staging.base")
const sharedBaseConfig = require("./shared.base")

const generated = options.generate({
  agent: "server",
  environment: "staging",
})

module.exports = merge.smart(stagingBaseConfig, sharedBaseConfig, {
  output: {
    path: generated.outputPath,
    publicPath: generated.publicPath,
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
              emitFile: false,
              name: "images/[sha512:hash:base64:7].[ext]",
              publicPath: generated.clientPublicPath,
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
              emitFile: false,
              name: "fonts/[sha512:hash:base64:7].[ext]",
              publicPath: generated.clientPublicPath,
            },
          },
        ],
      },
    ],
  },
})

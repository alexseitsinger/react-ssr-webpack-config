const webpack = require("webpack")
const path = require("path")
const merge = require("webpack-merge")

const options = require("../options")
const productionBaseConfig = require("../production.base")
const sharedBaseConfig = require("./shared.base")

const generated = options.generate({
  agent: "server",
  environment: "production",
})

module.exports = merge.smart(productionBaseConfig, sharedBaseConfig, {
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

const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")

const options = require("../options")
const developmentBaseConfig = require("../development.base")
const serverBaseConfig = require("./base")

const generated = options.generate({
  agent: "server",
  environment: "development",
})

module.exports = merge.smart(developmentBaseConfig, serverBaseConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: {
                context: __dirname,
                localIdentName: "[local]",
              },
            },
          },
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
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
  output: {
    path: generated.outputPath,
    publicPath: generated.publicPath,
  },
})

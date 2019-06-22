const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")

const serverBaseConfig = require("./base")

module.exports = merge.smart(serverBaseConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ["css-loader"],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: true,
              minimize: true,
              context: __dirname,
              localIdentName: "[hash:base64:5]",
            },
          },
        ],
      },
    ],
  },
})

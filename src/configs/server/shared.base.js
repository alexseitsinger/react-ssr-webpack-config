const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")

const serverBaseConfig = require("./base")

module.exports = merge.smart(serverBaseConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              modules: {
                context: __dirname,
                localIdentName: "[hash:base64:5]",
              },
            },
          },
        ],
      },
    ],
  },
})

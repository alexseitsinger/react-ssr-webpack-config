const webpack = require("webpack")
const merge = require("webpack-merge")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const clientBaseConfig = require("./base")

module.exports = merge.smart(clientBaseConfig, {
  output: {
    filename: "[hash].js",
    chunkFilename: "[hash]-[id].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({ filename: "[chunkhash].css" }),
  ],
})

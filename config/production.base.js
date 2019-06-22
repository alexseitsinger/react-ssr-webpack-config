var webpack = require("webpack")

module.exports = {
  mode: "production",
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      ENVIRONMENT_NAME: JSON.stringify("production"),
    }),
  ],
}

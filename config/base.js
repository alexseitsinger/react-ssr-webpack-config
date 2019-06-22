const path = require("path")
const Dotenv = require("dotenv-webpack")

//const FRONTEND_DIR = path.dirname(__dirname)
// <project_root>/node_modules/@alexseitsinger/react-ssr-webpack-config/config
const PROJECT_ROOT = path.resolve("../../../../")

module.exports = {
  // Keep filenames precise, standardized, and short.
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  module: {
    rules: [
      /**
       * Use babel for for all javascript files we create.
       *
       * Dont use the compiler for already compiled modules found in the
       * node_modules folder.
       */
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // Resolve module names in the directories provided.
    modules: [
      path.resolve(PROJECT_ROOT, "src"),
      "node_modules",
    ],
    // Resolve modules using one of the following filename suffixes.
    extensions: [".js", ".jsx"],
  },
  plugins: [
    // Automatically load variable from .env file into the modules.
    new Dotenv(),
  ],
}

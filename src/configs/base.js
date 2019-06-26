const path = require("path")
const Dotenv = require("dotenv-webpack")

//const FRONTEND_DIR = path.dirname(__dirname)
// <project_root>/node_modules/@alexseitsinger/react-ssr-webpack-config/config
const PROJECT_ROOT = path.resolve(".")

module.exports = {
  // Keep filenames precise, standardized, and short.
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  module: {
    rules: [
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
  stats: {
    // fallback value for stats options when an option is not defined (has precedence over local webpack defaults)
    //all: undefined,
    // Add asset Information
    assets: false,
    // Sort assets by a field
    // You can reverse the sort with `!field`.
    // Some possible values: 'id' (default), 'name', 'size', 'chunks', 'failed', 'issuer'
    // For a complete list of fields see the bottom of the page
    assetsSort: "name",
    // Add build date and time information
    builtAt: false,
    // Add information about cached (not built) modules
    cached: false,
    // Show cached assets (setting this to `false` only shows emitted files)
    cachedAssets: false,
    // Add children information
    children: false,
    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: false,
    // Add namedChunkGroups information
    chunkGroups: false,
    // Add built modules information to chunk information
    chunkModules: false,
    // Add the origins of chunks and chunk merging info
    chunkOrigins: false,
    // Sort the chunks by a field
    // You can reverse the sort with `!field`. Default is `id`.
    // Some other possible values: 'name', 'size', 'chunks', 'failed', 'issuer'
    // For a complete list of fields see the bottom of the page
    chunksSort: "name",
    // Context directory for request shortening
    //context: "../src/",
    // `webpack --colors` equivalent
    colors: true,
    // Display the distance from the entry point for each module
    depth: false,
    // Display the entry points with the corresponding bundles
    entrypoints: false,
    // Add --env information
    env: false,
    // Add errors
    errors: true,
    // Add details to errors (like resolving log)
    errorDetails: true,
    // Exclude assets from being displayed in stats
    // This can be done with a String, a RegExp, a Function getting the assets name
    // and returning a boolean or an Array of the above.
    //excludeAssets: (assetName) => {},
    // Exclude modules from being displayed in stats
    // This can be done with a String, a RegExp, a Function getting the modules source
    // and returning a boolean or an Array of the above.
    //excludeModules: (moduleSource) => {},
    //exclude: (moduleSource) => {},
    // Add the hash of the compilation
    hash: false,
    // Set the maximum number of modules to be shown
    maxModules: 15,
    // Add built modules information
    modules: false,
    // Sort the modules by a field
    // You can reverse the sort with `!field`. Default is `id`.
    // Some other possible values: 'name', 'size', 'chunks', 'failed', 'issuer'
    // For a complete list of fields see the bottom of the page
    modulesSort: "name",
    // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
    moduleTrace: true,
    // Show outputPath
    outputPath: false,
    // Show performance hint when file size exceeds `performance.maxAssetSize`
    performance: false,
    // Show the exports of the modules
    providedExports: false,
    // Add public path information
    publicPath: false,
    // Add information about the reasons why modules are included
    reasons: false,
    // Add the source code of modules
    source: false,
    // Add timing information
    timings: false,
    // Show which exports of a module are used
    usedExports: false,
    // Add webpack version information
    version: false,
    // Add warnings
    warnings: true,
    // Filter warnings to be shown (since webpack 2.4.0),
    // can be a String, Regexp, a function getting the warning and returning a boolean
    // or an Array of a combination of the above. First match wins.
    //warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => true|false
  },
}

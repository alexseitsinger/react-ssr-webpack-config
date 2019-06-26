const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const WebpackBundleTracker = require("webpack-bundle-tracker")
const S3Plugin = require("webpack-s3-plugin")

const options = require("../options")
const stagingBaseConfig = require("../staging.base")
const sharedBaseConfig = require("./shared.base")

const settings = options.getSettings({
  agent: "client",
  environment: "staging",
})

module.exports = merge.smart(stagingBaseConfig, sharedBaseConfig, {
  output: {
    path: settings.outputPath,
    publicPath: settings.publicPath,
  },
  plugins: [
    new WebpackBundleTracker({ filename: settings.webpackStats }),
    new S3Plugin({
      s3Options: {
        accessKeyId: options.config.aws.access,
        secretAccessKey: options.config.aws.secret,
      },
      s3UploadOptions: {
        Bucket: settings.bucketName,
      },
    }),
  ],
})

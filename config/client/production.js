const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const BundleTracker = require("webpack-bundle-tracker")
const S3Plugin = require("webpack-s3-plugin")

const options = require("../options")
const productionBaseConfig = require("../production.base")
const sharedBaseConfig = require("./shared.base")

const settings = options.getSettings({
  agent: "client",
  environment: "production"
})

module.exports = merge.smart(productionBaseConfig, sharedBaseConfig, {
  output: {
    path: settings.outputPath,
    publicPath: settings.publicPath,
  },
  plugins: [
    new BundleTracker({ filename: settings.webpackStats }),
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

const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const WebpackBundleTracker = require("webpack-bundle-tracker")
const S3Plugin = require("webpack-s3-plugin")

const options = require("../options")
const stagingBaseConfig = require("../staging.base")
const sharedBaseConfig = require("./shared.base")

const generated = options.generate({
  agent: "client",
  environment: "staging",
})

module.exports = merge.smart(stagingBaseConfig, sharedBaseConfig, {
  output: {
    path: generated.outputPath,
    publicPath: generated.publicPath,
  },
  plugins: [
    new WebpackBundleTracker({ filename: generated.webpackStats }),
    new S3Plugin({
      s3Options: {
        accessKeyId: options.initial.aws.access,
        secretAccessKey: options.initial.aws.secret,
      },
      s3UploadOptions: {
        Bucket: generated.bucketName,
      },
    }),
  ],
})

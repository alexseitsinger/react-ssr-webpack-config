const path = require("path")

const initial = {
  names: {
    project: process.env.PROJECT_NAME,
    site: process.env.SITE_NAME,
    dist: "dist",
  },
  aws: {
    access: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
  },
}

function getSentryDsn(environmentName) {
  const uppercase = environmentName.toUpperCase()
  const varName = `SENTRY_DSN_${uppercase}_FRONTEND`
  return process.env[varName]
}

function getDevServerAddress(agentName) {
  const uppercase = agentName.toUpperCase()
  const hostVarName = `WEBPACK_DEV_SERVER_${uppercase}_HOST`
  const portVarName = `WEBPACK_DEV_SERVER_${uppercase}_PORT`
  return {
    host: process.env[hostVarName],
    port: process.env[portVarName],
  }
}

function getBucketName(agentName, environmentName) {
  const prefix = `${initial.names.project}-${initial.names.site}`
  const suffix = `${environmentName}-static`
  return `${prefix}-${suffix}`
}

function getDistDir(agentName, environmentName) {
  return `${initial.names.dist}/${agentName}/${environmentName}`
}

function getOutputPath(agentName, environmentName) {
  return path.resolve(getDistDir(agentName, environmentName))
}

function getPublicPath(agentName, environmentName) {
  switch (environmentName) {
    default: {
      return
    }
    case "development": {
      const dsa = getDevServerAddress(agentName)
      const prefix = `${dsa.host}:${dsa.port}`
      const suffix = getDistDir(agentName, environmentName)
      return `http://${prefix}/${suffix}/`
    }
    case ("production" || "staging"): {
      const awsUri = "s3.amazonaws.com"
      const bucketName = getBucketName(agentName, environmentName)
      return `https://${bucketName}.${awsUri}/${initial.names.dist}/`
    }
  }
}

function getWebpackStatsPath(agentName, environmentName) {
  const name = `webpack-stats.${agentName}.${environmentName}.json`
  return `./${name}`
}

function generate({ agent, environment }) {
  const sentryDsn = getSentryDsn(environment)
  const devServer = getDevServerAddress(agent)
  const bucketName = getBucketName(agent, environment)
  const outputPath = getOutputPath(agent, environment)
  const publicPath = getPublicPath(agent, environment)
  var clientPublicPath
  if (agent === "server") {
    clientPublicPath = getPublicPath("client", environment)
  }
  const webpackStats = getWebpackStatsPath(agent, environment)
  return {
    sentryDsn,
    devServer,
    bucketName,
    outputPath,
    publicPath,
    clientPublicPath,
    webpackStats,
  }
}

module.exports = {
  initial,
  generate,
}

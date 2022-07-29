const fs = require('fs')
const path = require('path')
const ENV_CONFIG = require('./env_config')
const { isExistedFile } = require('./utils')

function getEntryPoints() {
  const entryPointsConfigFilePath = path.resolve(ENV_CONFIG.src, ENV_CONFIG.entryPointsConfigFileName)
  let configFile = ENV_CONFIG.defaultEntryPoint

  if (isExistedFile(entryPointsConfigFilePath)) {
    configFile = JSON.parse(fs.readFileSync(path.resolve(ENV_CONFIG.src, ENV_CONFIG.entryPointsConfigFileName)))
  }

  const entryPoints = {}
  Object.keys(configFile).forEach(function (key, index) {
    if (ENV_CONFIG.isDevelopment() || key !== ENV_CONFIG.UI_ENTRYPOINT) {
      entryPoints[key] = path.resolve(ENV_CONFIG.entryPointsFolder, configFile[key])
    }
  })

  return entryPoints
}

module.exports = { getEntryPoints }

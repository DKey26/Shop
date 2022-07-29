const path = require('path')
const ENV_CONFIG = require('../env_config')

function getVideoLoader() {
  return {
    test: /\.(gif|mp4|avi)$/,
    loader: 'file-loader',
    include: path.resolve(ENV_CONFIG.src, ENV_CONFIG.videoFrom),
    options: {
      name: `${ENV_CONFIG.videoTo}/[name].[ext]`,
    },
  }
}

module.exports = { getVideoLoader }

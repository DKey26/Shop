const path = require('path')
const ENV_CONFIG = require('../env_config')

function getImageLoader() {
  return {
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'file-loader',
    include: path.resolve(ENV_CONFIG.src, ENV_CONFIG.imagesFrom),
    options: {
      name: `${ENV_CONFIG.imagesTo}/[name].[ext]`,
    },
  }
}

module.exports = { getImageLoader }

const path = require('path')
const ENV_CONFIG = require('../env_config')

function getIconLoader() {
  return {
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'file-loader',
    include: path.resolve(ENV_CONFIG.src, ENV_CONFIG.iconsFrom),
    options: {
      name: `${ENV_CONFIG.iconsTo}/[name].[ext]`,
    },
  }
}

module.exports = { getIconLoader }

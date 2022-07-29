const path = require('path')
const ENV_CONFIG = require('../env_config')

function getFontLoader() {
  return {
    test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader',
    include: [path.resolve(ENV_CONFIG.src, ENV_CONFIG.fontsFrom), path.resolve(ENV_CONFIG.src, 'fonts')],
    options: {
      name: `${ENV_CONFIG.fontsTo}/[name].[ext]`,
    },
  }
}

module.exports = { getFontLoader }

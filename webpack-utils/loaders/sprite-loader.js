const path = require('path')
const ENV_CONFIG = require('../env_config')

function getSpriteLoader() {
  return {
    test: /\.svg$/,
    include: path.resolve(ENV_CONFIG.src, 'assets/sprites'),
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          outputPath: './sprites/',
          publicPath: './sprites/',
        },
      },
      'svgo-loader',
    ],
  }
}

module.exports = { getSpriteLoader }

const { getPugLoader } = require('./pug-loader')
const { getScriptLoaders } = require('./script-loaders')
const { getFontLoader } = require('./font-loader')
const { getVideoLoader } = require('./video-loader')
const { getImageLoader } = require('./image-loader')
const { getIconLoader } = require('./icon-loader')
const { getSpriteLoader } = require('./sprite-loader')
const { getStyleLoaders } = require('./style-loaders')

function getLoaders() {
  return {
    rules: [
      getPugLoader(),
      ...getScriptLoaders(),
      getFontLoader(),
      getImageLoader(),
      getVideoLoader(),
      getIconLoader(),
      getSpriteLoader(),
      ...getStyleLoaders(),
    ],
  }
}

module.exports = { getLoaders }

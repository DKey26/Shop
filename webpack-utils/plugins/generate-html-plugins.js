const path = require('path')
const ENV_CONFIG = require('../env_config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function generateHtmlPlugin(filename, entryPoints) {
  const name = filename.replace('.pug', '')
  const chunks = [entryPoints[name] ? name : 'index']
  const defaultFileName = 'index'

  const pathTo = name !== defaultFileName ? path.join(name, `${defaultFileName}.html`) : `${defaultFileName}.html`

  return new HtmlWebpackPlugin({
    chunks: [...chunks],
    title: filename,
    filename: pathTo,
    template: path.join(ENV_CONFIG.pages, filename),
    inject: 'body',
  })
}

function generateHtmlPlugins(pageNames, entryPoints) {
  plugins = []
  pageNames.forEach((filename) => {
    if (ENV_CONFIG.isDevelopment() || filename !== ENV_CONFIG.UI_PAGENAME) {
      plugins.push(generateHtmlPlugin(filename, entryPoints))
    }
  })
  return plugins
}

module.exports = { generateHtmlPlugins }

const path = require('path')

const ENV_STATES = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
}

class Config {
  constructor() {
    const rootPath = path.join(__dirname, '../')

    this.postCSSConfig = path.join(rootPath, 'postcss.config.js')

    this.src = path.join(rootPath, 'src')
    this.dist = path.join(rootPath, 'build')
    this.pages = path.join(this.src, 'pages')

    this.UI_PAGENAME = 'ui-page.pug'
    this.UI_ENTRYPOINT = 'ui-page'

    this.cssTo = 'css'
    this.videoFrom = 'assets/animated'
    this.videoTo = 'animated'
    this.imagesFrom = 'assets/images'
    this.imagesTo = 'images'
    this.iconsFrom = 'assets/icons'
    this.iconsTo = 'icons'
    this.fontsFrom = 'assets/fonts'
    this.fontsTo = 'fonts'
    this.javaScriptTo = 'js/min'

    this.smartgridTo = path.join(this.src, '_base/scss')

    this.entryPointsFolder = path.join(this.src, 'entry-points')
    this.entryPointsConfigFileName = 'config.json'
    this.defaultEntryPoint = {
      index: 'index.js',
    }

    this.enviropmentState = ENV_STATES.DEVELOPMENT
  }

  isDevelopment() {
    return this.enviropmentState === ENV_STATES.DEVELOPMENT
  }

  isProduction() {
    return this.enviropmentState === ENV_STATES.PRODUCTION
  }
}

module.exports = new Config()

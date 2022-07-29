const smartgrid = require('smart-grid')
const smartgridSettings = require('./smartgrid')
const { exec } = require('child_process')

const ENV_CONFIG = require('./webpack-utils/env_config')

const { getLoaders } = require('./webpack-utils/loaders')
const { getPlugins } = require('./webpack-utils/plugins')
const { getEntryPoints } = require('./webpack-utils/entry-points')
const { getPageNames } = require('./webpack-utils/page-names')

function sassMigration() {
  const command = 'sass-migrator division'
  const relativePath = `./src${ENV_CONFIG.smartgridTo.replace(ENV_CONFIG.src, '').replace(/\\/g, '/')}`
  const path = `${relativePath}/smart-grid.scss`

  const errorHandler = (err, stdout, stderr) => {
    if (err) {
      console.log(err)
      return
    }
  }

  exec(`${command} ${path}`, errorHandler)
}

function buildConfig(mode) {
  smartgrid(ENV_CONFIG.smartgridTo, smartgridSettings)
  sassMigration()

  const pageNames = getPageNames(ENV_CONFIG.pages)
  const entryPoints = getEntryPoints(ENV_CONFIG.pages)

  const config = {
    mode,
    entry: entryPoints,
    output: {
      filename: `${ENV_CONFIG.javaScriptTo}/[name].js`,
      path: ENV_CONFIG.dist,
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /(node_modules|libs)/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },

    resolve: {
      alias: {
        '~': ENV_CONFIG.src,
      },
      extensions: ['.ts', '.js'],
    },

    plugins: getPlugins(pageNames, entryPoints),
    module: getLoaders(),
  }

  if (ENV_CONFIG.isDevelopment()) {
    config.devtool = 'inline-source-map'

    config.devServer = {
      contentBase: ENV_CONFIG.dist,
      writeToDisk: false,
      hot: true,
      open: true,
      port: 8080,
      overlay: {
        warnings: true,
        errors: true,
      },
    }
  }

  return config
}

module.exports = (env, argv) => {
  ENV_CONFIG.enviropmentState = argv.mode

  return buildConfig(argv.mode)
}

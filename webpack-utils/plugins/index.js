const path = require('path')
const ENV_CONFIG = require('../env_config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { generateHtmlPlugins } = require('./generate-html-plugins')

function getPlugins(pageNames, entryPoints) {
  const plugins = [
    new CleanWebpackPlugin(),

    ...generateHtmlPlugins(pageNames, entryPoints),

    new MiniCssExtractPlugin({
      filename: `${ENV_CONFIG.cssTo}/[name].css`,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(ENV_CONFIG.src, ENV_CONFIG.imagesFrom),
          to: ENV_CONFIG.imagesTo,
          noErrorOnMissing: true,
        },
        {
          from: path.join(ENV_CONFIG.src, ENV_CONFIG.videoFrom),
          to: ENV_CONFIG.videoTo,
          noErrorOnMissing: true,
        },
        {
          from: path.join(ENV_CONFIG.src, ENV_CONFIG.iconsFrom),
          to: ENV_CONFIG.iconsTo,
          noErrorOnMissing: true,
        },
        {
          from: path.join(ENV_CONFIG.src, ENV_CONFIG.fontsFrom),
          to: ENV_CONFIG.fontsTo,
          noErrorOnMissing: true,
        },
      ],
    }),

    new SpriteLoaderPlugin(),

    new ESLintPlugin(),
  ]

  return plugins
}

module.exports = { getPlugins }

const ENV_CONFIG = require('../env_config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

function getStyleLoaders() {
  return [
    {
      test: /\.scss$/i,
      use: [
        'style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
            esModule: false,
          },
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: ENV_CONFIG.isDevelopment(),
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: ENV_CONFIG.isDevelopment(),
            postcssOptions: {
              path: ENV_CONFIG.postCSSConfig,
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: ENV_CONFIG.isDevelopment(),
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: [
        'css-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: ENV_CONFIG.isDevelopment(),
            postcssOptions: {
              config: ENV_CONFIG.postCSSConfig,
            },
          },
        },
      ],
    },
  ]
}

module.exports = { getStyleLoaders }

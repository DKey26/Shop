function getScriptLoaders() {
  return [
    {
      test: /\.js$/,
      loader: 'babel-loader',
    },
    {
      test: /\.ts?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ]
}

module.exports = { getScriptLoaders }

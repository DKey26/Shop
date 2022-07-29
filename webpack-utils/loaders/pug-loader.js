function getPugLoader() {
  return {
    test: /\.pug$/,
    use: [
      {
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      },
      {
        loader: 'attribute-template-loader',
        options: {
          list: [
            {
              tag: 'import',
              template: `
                <svg class='$[class]'>
                  <use xlink:href='$[name]'></use>
                </svg>`,
            },
          ],
        },
      },
    ],
  }
}

module.exports = { getPugLoader }

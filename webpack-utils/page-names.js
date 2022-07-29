const fs = require('fs')

function getPageNames(folderName) {
  const fileNames = fs.readdirSync(folderName).filter((filename) => filename.endsWith('.pug'))
  return fileNames
}

module.exports = { getPageNames }

const fs = require('fs')
const path = require('path')

function isExistedFile(filePath) {
  const parsedPath = path.parse(filePath)
  const fileNames = fs.readdirSync(parsedPath.dir)
  const fileNameWithExt = parsedPath.base

  return fileNames.some((filename) => filename === fileNameWithExt)
}

module.exports = { isExistedFile }

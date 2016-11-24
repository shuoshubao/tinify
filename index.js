const fs = require('fs')
const tinify = require('tinify')
tinify.key = 'XXIRu48sw8x3SMA4cA0NixJgib573DPX'


let fileList = []

function walk(path) {
  var dirList = fs.readdirSync(path)
  dirList.forEach(function(item) {
    if(!['.DS_Store', 'node_modules'].includes(item)) {
      if (fs.statSync(path + '/' + item).isDirectory()) {
        walk(path + '/' + item)
      } else {
        fileList.push(path + '/' + item)
      }
    }
  })
}


// walk('src')
walk('ershoufang')
fileList = fileList.filter((v, i) => {
  return v.endsWith('png') || v.endsWith('jpg')
})

console.log(fileList)

fileList.forEach((v, i) => {
  const source = tinify.fromFile(v)
  source.toFile(v)
})


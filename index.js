const fs = require('fs')
const tinify = require('tinify')
tinify.key = 'KckuU929qtv_nPK_czL6HKfcAJO9FCKm'
const fileList = []

const getFileList = path => {
    var dirList = fs.readdirSync(path)
    dirList.forEach(v => {
        if(['node_modules'].includes(v)) {
            return
        }
        if (fs.statSync(path + '/' + v).isDirectory()) {
            getFileList(path + '/' + v)
        } else {
            fileList.push(path + '/' + v)
        }
    })
}

const path = process.argv[2]

if (!path) {
    console.log('必须传入入口地址')
    return
}

getFileList(path)

const targetFileList = fileList.filter(v => {
    return (v.endsWith('png') || v.endsWith('jpg')) && !v.includes('._')
})

if(targetFileList.length === 0) {
    console.log(`未发现 .png 或 .jpg 类型的文件`)
    return
}else {
    console.log(`开始: 共 ${targetFileList.length} 个文件`)
    console.time('耗时')
}



/**
 * 获取所有图片的大小
 */

console.log(targetFileList)
const targetFileListSize = []
targetFileList.forEach(v => {
  const stats = fs.statSync(v)
  targetFileListSize.push(stats.size)
})
Array.prototype.sum = function() {
  let sum = 0
  this.forEach(v => sum+=v)
  return sum
}
console.log(`共${targetFileList.length}张图片, ${Math.ceil(targetFileListSize.sum()/1024)} Kb`)

return


var iNow = 0;

targetFileList.forEach((v, i) => {
    const source = tinify.fromFile(v)
    source.toFile(v, err => {
        iNow++
        console.log(`进度: ${iNow}/${targetFileList.length} ${err ? '失败' : '成功'}: ${v}`)
    })
})

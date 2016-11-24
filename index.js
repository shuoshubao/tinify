const fs = require('fs')
const tinify = require('tinify')
tinify.key = 'XXIRu48sw8x3SMA4cA0NixJgib573DPX'


let fileList = []

function walk(path) {
    var dirList = fs.readdirSync(path)
    dirList.forEach(item => {
        if (!['.DS_Store', 'node_modules', 'spriteImg'].includes(item)) {
            if (fs.statSync(path + '/' + item).isDirectory()) {
                walk(path + '/' + item)
            } else {
                fileList.push(path + '/' + item)
            }
        }
    })
}

if (!process.argv[2]) {
    console.log('必须传入入口地址')
    return
}
console.time('获取图片列表耗时')
walk(process.argv[2])
console.timeEnd('获取图片列表耗时')
fileList = fileList.filter((v, i) => {
    return (v.endsWith('png') || v.endsWith('jpg')) && !v.includes('._')
})
if (fileList.length == 0) {
    console.log(process.argv[2] + '该目录下没有图片')
    return
}else if (fileList.length > 100) {
    console.log(process.argv[2] + '该目录下图片过多：' + fileList.length)
    return
}

fileList.forEach(v => {
    const source = tinify.fromFile(v)
    source.toFile(v, err => {
        if (err) {
            console.log(`${v}压缩失败`)
        } else {
            console.log(`${v}压缩成功`)
        }
    })
})

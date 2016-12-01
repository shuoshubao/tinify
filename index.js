const fs = require('fs')
const tinify = require('tinify')
tinify.key = 'XXIRu48sw8x3SMA4cA0NixJgib573DPX'
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

const progress = {
    all: targetFileList.length,
    success: 0,
    failure: 0,
    failureList: []
}

if(progress.all === 0) {
    console.log(`未发现 .png 或 .jpg 类型的文件`)
    return
}else {
    console.log(`开始: 共 ${progress.all} 个文件`)
    console.time('耗时')
}

targetFileList.forEach((v, i) => {
    const source = tinify.fromFile(v)
    source.toFile(v, err => {
        if (err) {
            progress.failure++
            progress.failureList.push(v)
        } else {
            progress.success++
        }
        console.log(`正在处理第 ${i}/${progress.all} 个文件, 成功 ${progress.success} 个, 失败 ${progress.failure} 个`)
        if(i === progress.all - 1) {
            console.log('结束')
            console.timeEnd('耗时')
            if(progress.failureList.length) {
                console.log(['处理失败的文件:'].concat(progress.failureList).join('\n'))
            }
        }
    })
})

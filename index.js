/*
 *@description 使用tinypng.com接口实现图片压缩
 *@param {Object} opts
 *@param {String} opts.key tinypng.com用户唯一识别码
 **@param {String} opts.inDir 源文件存储地址
 *@param {String} opts.outDir 压缩后的文件存储地址
 */
'use strict'

const tinify = require('tinify')
const path = require('path')
const klaw = require('klaw')

let setTinyKey = Symbol.for('private#setTinyKey')
let orginToCompress = []

class Tinier{
  constructor(opts){
    this.setConfig.call(null, opts)
  }
  [setTinyKey](){
    tinify.key = this.key
  }
  setConfig(opts){
    this.key = opts.key || 'dh-9FQbZX3vxYjfpJFX5Do3Oa86QJNBa'
    this.inDir = opts.inDir || path.join(process.cwd(), './images')
    this.outDir = opts.outDir || path.join(process.cwd(), './tinyout')
    return this
  }
  main(){
    return new Promise((resolve, reject) => {
      klaw(this.inDir).on('data', async item => {
        let fileName = path.parse(item.path).base
        if (fileName.match(/jpg|png|jpeg/ig)) {
          let outPath = path.join(this.outDir, fileName)
          await tinify.fromFile(item.path).toFile(outPath)
          orginToCompress.push([item.path, outPath])
        }
      })
      .on('end', () => resolve(orginToCompress))
      .on('error', (err, item) => reject(err))
    })
  }
}
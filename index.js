/*
 *@description 使用tinypng.com接口实现图片压缩
 *@param {Object} opts
 *@param {String} opts.key tinypng.com用户唯一识别码
 **@param {String} opts.inPath 源文件存储地址
 *@param {String} opts.outPath 压缩后的文件存储地址
 */
'use strict'

const tinify = require('tinify')
const path = require('path')
const klaw = require('klaw')

let setTinyKey = Symbol.for('private#setTinyKey')

class Tinier{
  constructor(opts){
    this.setConfig.call(null, opts)
  }
  [setTinyKey](){
    tinify.key = this.key
  }
  setConfig(opts){
    this.key = opts.key || 'dh-9FQbZX3vxYjfpJFX5Do3Oa86QJNBa'
    this.inPath = opts.inPath || path.join(process.cwd(), './images')
    this.outPath = opts.outPath || path.join(process.cwd(), './tinyout')
  }
}
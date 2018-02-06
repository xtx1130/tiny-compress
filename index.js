/*
 *@description 使用tinypng.com接口实现图片压缩
 *@author xtx1130@gmail.com
 *@param {Object} opts
 *@param {String} opts.key tinypng.com用户唯一识别码
 **@param {String} opts.inDir 源文件存储地址
 *@param {String} opts.outDir 压缩后的文件存储地址
 */
'use strict'

const tinify = require('tinify')
const path = require('path')
const klaw = require('klaw')
const mkdirp = require('mkdirp')
const del = require('del')
const fs = require('fs')

let setTinyKey = Symbol.for('private#setTinyKey')
let ifFileExist = Symbol.for('private#ifFileExist')
let createFolder = Symbol.for('private#createFolder')
let orginToCompress = []
let cacheFolder = Object.create(Object.prototype)

class Tinier {
  constructor (opts) {
    [this.key, this.inDir, this.outDir] = [void 0]
    opts = opts || Object.create(Object.prototype)
    this.setConfig(opts)
  }
  [setTinyKey] () {
    tinify.key = this.key
  }
  [ifFileExist] (dir) {
    let status = 0
    try {
      fs.accessSync(dir, fs.constants.F_OK)
      status = 1
    } catch (e) {

    }
    return status
  }
  [createFolder] (dir) {
    if (!this[ifFileExist](dir)) {
      mkdirp.sync(dir)
    }
  }
  setConfig (opts) {
    this.key = opts.key || 'dh-9FQbZX3vxYjfpJFX5Do3Oa86QJNBa'
    this.inDir = opts.inDir || path.join(process.cwd(), './images')
    this.outDir = opts.outDir || path.join(process.cwd(), './tinyout/')
    this[setTinyKey]()
    return this
  }
  async compress () {
    await del(this.outDir)
    this[createFolder](this.outDir)
    let res = await new Promise((resolve, reject) => {
      klaw(this.inDir).on('data', async item => {
        let fileName = path.parse(item.path).base
        let relativePath = item.path.replace(this.inDir, '').replace(fileName, '')
        if (relativePath && !cacheFolder[relativePath]) {
          this[createFolder](path.join(this.outDir, relativePath))
          cacheFolder[relativePath] = 1
        }
        if (fileName.match(/jpg|png|jpeg/ig)) {
          let outPath = path.join(this.outDir, relativePath, fileName)
          orginToCompress.push([item.path, outPath])
          await tinify.fromFile(item.path).toFile(outPath)
        }
      })
      .on('end', () => resolve(orginToCompress))
      .on('error', /* istanbul ignore next */(err, item) => reject(err))
    })
    return res
  }
}

exports = module.exports = Tinier

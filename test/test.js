'use strict'

const Tiny = require('./../')
const path = require('path')

let tiny = new Tiny()

describe('Start test pic compress', () => {
  it('Test base compress function', async () => {
    expect.assertions(1)
    let filePath = await tiny.compress()
    expect(filePath.length === 2).toBe(true)
  })
  it('Test setConfig function', async () => {
    expect.assertions(1)
    let filePath = await tiny.setConfig({
      key: 'dh-9FQbZX3vxYjfpJFX5Do3Oa86QJNBa',
      inDir: path.join(process.cwd(), './tinyout/'),
      outDir: path.join(process.cwd(), './tinyout/')
    }).compress()
    expect(filePath.length === 2).toBe(true)
  })
})
'use strict'

const Tiny = require('./../')

let tiny = new Tiny()

tiny.compress().then(res => console.log(res))
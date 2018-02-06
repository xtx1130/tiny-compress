## tiny-compress
> use [tinypng.com](http://tinypng.com) to compress picture

### Usage

```shell
$ npm install tiny-compress
```

```js
const Tiny = require('tiny-compress')
let tiny = new Tiny({
  key:'',//tinycss personal key,I have wrote a defalut key in this program
  inDir:'',//the pic dir needs ro be compress
  outDir:''//the pic output dir
}).compress()
```

### APIs

#### setConfig(opts)

use `setConfig()` can reset configs, `opts`:  
- key:'',//tinycss personal key,I have wrote a defalut key in this program
- inDir:'',//the pic dir needs ro be compress
- outDir:''//the pic output dir

#### compress()

use `compress()` to start compress, the `compress()` will return an Array such as:
```js
// compress return
[[picture in path, picture out path],[picture1 in path, picture1 out path]]
```

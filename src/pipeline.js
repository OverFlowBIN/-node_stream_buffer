// @ts-check

// const { log, error } = console

const fs = require('fs')
const stream = require('stream')
const zlib = require('zlib')
const util = require('util')

// util.promisify를 활용하기
async function gzip() {
  return util.promisify(stream.pipeline)(
    fs.createReadStream('local/big-file'),
    zlib.createGzip(),
    fs.createWriteStream('local/big-file.gz')
  )
}

async function gunzip() {
  return util.promisify(stream.pipeline)(
    fs.createReadStream('local/big-file.gz'),
    zlib.createGunzip(),
    fs.createWriteStream('local/big-file.unzipped')
  )
}

async function main() {
  await gzip()
  await gunzip()
}

main()

// stream.pipeline(
//   fs.createReadStream('local/big-file'),
//   zlib.createGzip(),
//   fs.createWriteStream('local/big-file.gz'),
//   (err) => {
//     if (err) {
//       error('Pipeline failed.', err)
//     } else {
//       log('Pipeline succesed')

//       stream.pipeline(
//         fs.createReadStream('local/big-file.gz'),
//         zlib.createGunzip(),
//         fs.createWriteStream('local/big-file.unzipped'),
//         (_err) => {
//           if (_err) {
//             error('Gunzip failed.', _err)
//           } else {
//             log('Gunzip succesed')
//           }
//         }
//       )
//     }
//   }
// )

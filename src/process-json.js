// @ts-check
const { log } = console
const fs = require('fs')

/**
 * @param {number} highWaterMark
 */
function processJson(highWaterMark) {
  const rs = fs.createReadStream('local/jsons', {
    encoding: 'utf-8',
    highWaterMark,
  })

  let totalSum = 0

  let accumulatedJsonStr = ''

  rs.on('data', (chunk) => {
    // log('Event: chunk', chunk)

    if (typeof chunk !== 'string') return

    accumulatedJsonStr += chunk

    const lastNewLineIdx = accumulatedJsonStr.lastIndexOf('\n')

    const jsonLinesStr = accumulatedJsonStr.substring(0, lastNewLineIdx)
    accumulatedJsonStr = accumulatedJsonStr.substring(lastNewLineIdx)

    totalSum += jsonLinesStr
      .split('\n')
      .map((jsonLine) => {
        try {
          return JSON.parse(jsonLine)
        } catch {
          return undefined
        }
      })
      .filter((json) => json)
      .map((json) => json.data)
      .reduce((pre, cur) => pre + cur, 0)
  })

  rs.on('end', () => {
    log('Event: end')
    log(`totalSum (hightWaterMark: ${highWaterMark}`, totalSum)
  })
}

for (let watermark = 1; watermark < 50; watermark += 1) {
  processJson(watermark)
}

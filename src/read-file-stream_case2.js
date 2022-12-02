// @ts-check

// case2. 파일 내 내용이 aaaaaaaaaaaabbbbbbbbbaaaaabbbbbaaaabb.....aaaabbbbb
// 위와 같은 파일에서, a의 연속 구간의 개수와, b의 연속구간의 개수를 세는 프로그램.

// 동작방법

const fs = require('fs')

const rs = fs.createReadStream('local/big-file', {
  encoding: 'utf-8',
  highWaterMark: 65536 * 2, // 65536이 default 값이다.
  // 기본값을 늘리면 data가 가질수 있는 데이터 양이 늘어난다.
  // 따라서, highWaterMark option을 통해 chunk당 data의 양을 조절 할 수 있다.
})

/** @type {Object.<string, number>} */
const numBlocksPerChar = {
  a: 0,
  b: 0,
}

/** @type {string | undefined} */
let prevChar
let chunkCount = 0

// 데이터를 가지고 올때 마다 실행됨
rs.on('data', (data) => {
  chunkCount += 1
  if (typeof data !== 'string') return

  for (let i = 0; i < data.length; i += 1) {
    if (data[i] !== prevChar) {
      const newChar = data[i]

      // eslint-disable-next-line no-continue
      if (!newChar) continue

      prevChar = data[i]
      numBlocksPerChar[newChar] += 1
    }
  }
})

// 데이터를 다 가지고 오면 실행됨
rs.on('end', () => {
  console.log('Event: end')
  console.log('blockCount', numBlocksPerChar)
  console.log('chunkCount', chunkCount) // 7049의 chunkCount를 확인 할 수 있는데
  // data의 일정량이차면 데이터를 보내는데 이것을 반복한 것이다.
})

// top -o PID => 터미널에 치면 간단한 메모리 사용량을 확인할 수 있다.
// du -h local => 파일 내부 용량 확인 가능

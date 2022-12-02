// @ts-check

// 스트림으로 큰 파일 처리하기

// case1. 파일 내 모든 내용이 a 만 있는경우

// const fs = require('fs')

// const ws = fs.createWriteStream('local/big-file')

// const NUM_MBYTES = 500

// for (let i = 0; i < NUM_MBYTES; i += 1) {
//   ws.write('a'.repeat(1024 * 1024))
// }

// case2. 파일 내 내용이 aaaaaaaaaaaabbbbbbbbbaaaaabbbbbaaaabb.....aaaabbbbb
// 위와 같은 파일에서, a의 연속 구간의 개수와, b의 연속구간의 개수를 세는 프로그램.

const fs = require('fs')

const ws = fs.createWriteStream('local/big-file')

const NUM_BLOCKS = 500
// terminal에 du -h local하면 파일용량 크기를 알 수 있다.

/** @type {Object.<string, number>} */
const numBlocksPerChar = {
  a: 0,
  b: 0,
}

for (let i = 0; i < NUM_BLOCKS; i += 1) {
  const blockLength = Math.floor(800 + Math.random() * 200)
  const char = i % 2 === 0 ? 'a' : 'b'
  ws.write(char.repeat(1024 * blockLength))

  numBlocksPerChar[char] += 1
}

console.log(numBlocksPerChar)

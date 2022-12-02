// @ts-check

const fs = require('fs')

const { log } = console

const data = fs.readFileSync('local/big-file', 'utf-8')

/** @type {Object.<string, number>} */
const numBlocksPerChar = {
  a: 0,
  b: 0,
}

/** @type {string | undefined} */
let prevChar

for (let i = 0; i < data.length; i += 1) {
  if (data[i] !== prevChar) {
    const newChar = data[i]

    // eslint-disable-next-line no-continue
    if (!newChar) continue

    prevChar = data[i]
    numBlocksPerChar[newChar] += 1
  }
}

log('blockCount', numBlocksPerChar)

// top -o PID => 터미널에 치면 간단한 메모리 사용량을 확인할 수 있다.
// du -h local => 파일 내부 용량 확인 가능

// 현재 buffer 사용시 메모리 사용량은 800MB 정도 나왔고, stream 사용시에는 메모리 사용량이 20MB 정도 나온것을 확인 할 수 있다.
// buffer => 처리방식은 해당 파일을 통째로 RAM으로 올려 읽으며 처리하기때문에 처리끝날때까지 buffer를 놓을 수 없지만
// stream => 큰 파일을 작은 chunk단위로 쪼개서 처리하기 떄문에 순간 RAM에서 처리하는 데이터 크니는 chunk크기 이다.
// 결론적으로 큰 파일을 처리할 떄 또는 network 파일 전송시 stream을 사용하므로 메모리 관리를 할 수 있다.

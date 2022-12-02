// @ts-check

// case1. 파일 내 모든 내용이 a 만 있는경우

const fs = require('fs')

const rs = fs.createReadStream('local/big-file', { encoding: 'utf-8' })

let chunkCount = 0

// 데이터를 가지고 올때 마다 실행됨
rs.on('data', (data) => {
  chunkCount += 1
  console.log('Event: data', data[0])
})

// 데이터를 다 가지고 오면 실행됨
rs.on('end', () => {
  console.log('Event: end')
  console.log('chunkCount', chunkCount) // 500MB 짜리 파일을 8000번의 chunk르 나뉘어진 것을 알 수 있다.
})

// top -o PID => 터미널에 치면 간단한 메모리 사용량을 확인할 수 있다.

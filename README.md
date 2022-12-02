Node.js_Stream

1. Stream이란?

- node에서 가장 중요한 데이터 타입 중 하나
- stream이 가능한 source(file, network input)로 부터 핸들러에게 해당 data를 여러개의 chunks로 나누워 입출력하는 형태의 구현방식이다.
  ￼

2. Stream 사용 이유

- 큰 데이터(영상파일 등)를 처리해야 하거나, 비동기적으로만 얻을 수 있는 데이터(network input)를 처리해야 할 때 유용하다.
  - 예를 들어 큰 용량의 파일을 압축할때 압축 시작시 해당 용량의 전부를 RAM에서 핸들링 되어야 하는데 그렇게 되면 RAM사용량이 너무 커진다.
  - network input같은 경우 TCP socket처럼 나뉘어진 데이터를 받게 되는데 이럴때 자연적으로 비동기적 방식으로 진행된다.

3. Stream의 일반적인 구현 형태
   ￼

- data, error, end 등의 이벤트 핸들러를 달아 처리한다.
- 특별히 지정하지 않으면 data는 buffer가 된다.
- 인코딩을 지정하면 data를 string으로 받을 수 있다.

4. Stream의 종류
1. Readable

- 스트림으로부터 읽을 수 있다.
- fs.createReadStream
- process.stdin
- 서버 입장의 HTTP 요청
- 클라이언트 입장의 HTTP 응답

2. Writable

- 스트림에 출력할 수 있다.
- fs.createWriteStream
- process.stdin
- 클라이언트 입장의 HTTP 요청
- 서버 입장의 HTTP 응답

3. Deplex

- 이 스트립에 입력을 받을 수도 있고, 출력을 보낼 수도 있습니다.(양방향)
- TCP sockets
- zlib streams
- crypto streams

4. Transform

- 입력받은 스트림을 변환해 새로운 스트림으로 만든다.
- zlib streams
- crypto streams

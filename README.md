# expressStudy
Express Study with Node.js

---

## Chap 1

### 수업 소개

Node.js로 서버 구현이 다소 매끄럽지 않음.

이 때문에 등장한 Web Framework가 Express

편리하기 때문에 어려워도 배워야한다.

---

## Chap 2

### 실습 준비

pm2 사용

`npm install` 모듈 사용

---

## Chap 3

### Hello Word 1

`npm install express --save` express 설치

### Hello Word 2

``` js
const express = require('express') //모듈을 로드
const app = express() //express 호출허여, app 객체에 담음
const port = 3000

//get 메소드는 라우트, 라우팅이라고 함.
app.get('/', (req, res) => { //app get 첫번째 경로, 두번째 콜백
  res.send('Hello World!')
})

app.listen(port, () => { //listen 메소드가 실행될 때 웹서버가 시작이되며 인자로 받은 port 값으로 웹서버를 만듦.
  console.log(`Example app listening at http://localhost:${port}`)
})

```

---

## Chap 4

### 홈페이지 구현

각 if-else 문으로 구성된 구문을 route 형식으로 바꿔주기

---

## Chap 5

### 상세페이지 구현 1 - Route Parameter

최근 URL 트렌드는 쿼리스트링을 쓰지 않고 **시맨틱 URL**을 사용하는 것

시멘틱 URL이란? : 기존 url 은 http://localhost:3000/topic?id=0 이런 방식이였다.
하지만 이를 http://localhost:3000/topic/0 처럼 다듬는 것.

``` js
app.get('/page/:pageId', (request, response) => { //app get 첫번째 경로, 두번째 콜백

    response.send(request.params); //request.params를 넘겨줌으로써 params 값을 확인
});
```

### 상세페이지 구현 1

URL PATH 방식으로 변경.

시맨틱 URL로 변경 후 template,js도 수정해줘야함.

---

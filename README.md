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

## Chap 6

### 페이지 생성 구현

get 방식일 때 : `app.get('path', () => {});`

post 방식 일 때 : `app.post('path', () => {});`

---

## Chap 7

### 페이지 수정 구현

동일

---

## Chap 8

### 페이지 삭제 구현

동일

Express : 라우트 기능이 대부분이다.

어떻게 라우트 하는지. Path 별로 어떻게 응답하는가? Get 방식 Post 방식으로 접근했을 때 어떻게 구분해서 응답하는가?

Web Framework을 다룰 때 제일 먼저 살펴봐야할 것들.

---

## Chap 9

### 미들웨어의 사용 - body parser

Express에서 라우트와 양대산맥으로 중요한 것이 미들웨어

Third-party Middleware - 남들이 만든 미들웨어(Express가 만든 것이 아닌)
- Body Parser

`npm install body-parser --save`

body : 웹 브라우저에서 요청한 정보의 본체를 body라고 함. 그 본체를 설명하는 것이 header

parser : 분석

바디 파서 사용시 선언 필수 
``` js
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
```

``` js
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
      //response.writeHead(302, { Location: `/?id=${title}` });
      //response.end();
      response.redirect(`page/${title}`);
    })
  });
```
위 코드를 body-parser를 사용하면

``` js
  var post = request.body;
  var title = post.title;
  var description = post.description;
  fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
    //response.writeHead(302, { Location: `/?id=${title}` });
    //response.end();
    response.redirect(`page/${title}`);
  });
```
이렇게 줄 일 수 있다.

### 미들웨어의 사용 - Compression

데이터가 큰 편이라면? 돈도 많이 들고 시간도 많이 든다.

이것을 암축을 통해서 해결할 수 있다.

`npm install compression`

`app.use(compression());` 미들웨어를 사용하기 위한 약속


## Chap 10

### 미들웨어 만들기

Express에서 미들웨어라고 하는 것은

``` js
var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)
```

myLogger 같은 형식을 가지고 있는 함수를 미들웨어라고 함.

**readdir 부분 미들웨어 정의하기**

``` js
app.use((request, response, next) => {
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next(); //next 변수에는 그 다음에 호출되어야 할 미들웨어가 담겨있음.
  });
})
```
request.list를 통해서 readdir을 대체

create_process / update_process / delete_process 에서 글 목록을 읽어올 필요가 있을까?

불필요한 비효율이 발생하고 있다는 것.

``` js
app.get('*', (request, response, next) => {
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next(); //next 변수에는 그 다음에 호출되어야 할 미들웨어가 담겨있음.
  });
})
```

인자로 `*`은 모든 요청이라는 뜻임.

get 방식에 대한 요청에만 파일 목록을 가져오는 코드가 되는 것.

그래서 post 방식을 사용하는 create_process / update_process / delete_process에서는 request로 list를 받지 않는다.

우리가 알게 된 사실 : `app.get()`에서 사실 두번째 인자로 사용되었던 콜백은 사실 미들웨어였다.

---
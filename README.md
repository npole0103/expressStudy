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

---

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

## Chap 11

### 미들웨어의 실행 순서

app이라는 변수는 app 이라는 객체가 담겨 있는데 여기에 `use, get, post` 같은 방식으로 미들 웨어를 등록할 수 있음.

그렇게 등록된 미들웨어는 어플리케이션 미들웨어라고 한다.

Third Party Middleware : `bodyParser, compression()`

``` js

var app = express()

app.use((req, res, next) => {
  console.log('Time : ', Date.now(0));
  next()
});

```

미들웨어의 핵심 : res, req 객체를 받아서 변형할 수 있다. next 호출을 통해서 그 다음 미들웨어를 실행할 지 말지 고민

**특정 경로**

``` js
app.use('/user/:id', (req, res, next) => {
  console.log('Time : ', Date.now(0));
  next()
});

```

**미들 웨어 여러 개 붙이기 가능**

`next()` 호출 시 그 다음 인자 미들웨어로 넘어감

``` js
app.use('/user/:id', (req, res, next) => {
  console.log('Time : ', Date.now(0));
  next()
}, (req, res, next) => {
  console.log('Time : ', Date.now(0));
  next()
});

```

미들 웨어 실행 흐름을 if문과 `next()`로 제어할 수 있다.

---

## Chap 12

### 정적인 파일의 서비스

정적인 파일 : js, css, 이미지 파일 등을 웹 브라우저로 다운하는 경우.

public 폴더 만들고 그 안에 images 폴더 만든 뒤 이미지 추가를 했다면

``` js
//static file, 퍼블릭 디렉토리에서 스태틱 파일을 찾겠다.
app.use(express.static('public'));
```
위 코드를 추가 해주고, `127.0.0.1:3000/images/GY.jpg`로 접속해주면 이미지 조회 가능

html 코드 내에서 사용하기  
`<img src="/images/GY.jpg" style="width:300px; display:block; margin-top:10px;">`

---

## Chap 13

### 에러 처리

```js
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
```

미들웨어는 순차적으로 실행이 되기 때문에, 본 코드는 맨 끝에 선언해주어야 한다.


**에러 핸들링 미들웨어**

```js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```
인자값이 4개 들어간 위 함수는 에러를 핸들링하는 미들웨어로 Express에서 정의.

``` js
if(err)
  next(err);
```

`next()`에 인자로 err를 넘기면, 위 코드를 실행하면 다음 어떤 미들웨어가 와있던 간에 인자가 4개짜리인 에러 핸들링 미들웨어가 호출된다.

---

## Chap 14
### 라우터 주소 체계 변경

express.Router

코드상 `pageId` 위로 다른 라우터를 다 올려야한다.

### 라우터 - 파일로 분리

1. routes/topic.js 생성
2. /topic으로 시작하는 라우터 코드 전부 이동
3. `var topicRouter = require('./routes/topic')`

`app.use('/topic', topicRouter);` : /topic으로 시작하는 주소들에게 topicRouter라는 이름의 미들웨어를 적용하겠다.

router를 지정하면 path에서 `/topic`을 따로 쓸 필요가 없다.

```js
main.js의 코드
const express = require('express'); //모듈을 로드
const app = express(); //express 호출허여, app 객체에 담음

topic.js의 코드
var express = require('express');
var router = express.Router();
```
서로 대응하는 코드이다.

### 라우터 - 파일로 분리 Index

같은 작업인데 Welcome 페이지 분리

``` js
var express = require('express')
var router = express.Router();

var template = require('../lib/template.js');

//get 메소드는 라우트, 라우팅이라고 함.
router.get('/', (request, response) => { //app get 첫번째 경로, 두번째 콜백
    var title = 'Welcome';
    var description = 'Hello, Node.js';
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
        <img src="/images/GY.jpg" style="width:300px; display:block; margin-top:10px;">
        `,
      `<a href="/topic/create">create</a>`
    );
  
    //response.writeHead(200);
    //response.end(html);
  
    response.send(html);
  });
  module.exports = router;
```

이것은 라우터를 기능별로 분리해서 정리정돈하는 테크닉. `main.js`를 깔끔하게 해준다.

---

## Chap 15

### 보안

1. 최신 버전의 express를 사용하라
2. https 를 사용하라
3. use helmet : 보안과 관련해서 일어날 수 있는 여러 가지 단골손님 같은 보안 이슈들을 해결. `npm install --save helmet`  - 우리의 어플리케이션을 안전하게 보호.

``` js
var helmet = require('helmet');
app.use(helmet());

```
4. Use cookies securely : 쿠기를 안전하게 사용하라
5. Dependency를 안전하게 관리하라. 디펜던시는 우리가 사용하고 있는 여러 가지 모듈들을 말함. `npm i nsp -g` nsp는 보안을 체크해주는 모듈을 global 하게 사용.

---

## Chap 16

### express generator

`npm install express-generator -g`

express를 이용해서 프로젝트를 진행하고 싶다면?

`express myapp` : myapp 폴더가 생성되면서 기본적인 스켈레톤들이 구성됨.

`cd myapp` : myapp 이동

`npm install` : 필요한 모듈 다운로드

`npm start` : app.js 시작

위 셋팅을 통해 빠르게 프로젝트를 시작할 수 있음.

---

## Chap 17

### 수업을 마치며

Templete engine : pug - 조금 적은 코드를 써서 보다 많은 html 코드를 생성 가능

Database : 데이터베이스

Middleware : 미들웨어의 사용법에 익숙해질 수록 Express 고급 사용자.

---

## PM2 사용
### Node.js의 패키지 매니저와 PM2
Package Mannager : 패키지를 관리해주는 프로그램.

NPM : Node Package Manager

PM2 : `npm install pm2 -g`

PM2 실행하는 법 : `pm2 start 0000.js`

PM2 Monit : `pm2 monit`

PM2 Error : `pm2 log`

PM2 LIST : `pm2 list`

PM2 STOP : `pm2 start 'LIST 목록 name'`

PM2 실행중 코드 수정 감시 모드 : `pm2 start main.js --watch`
(만약 문제가 있어서 실행이 안된다면 pm2 log로 확인하자)

---
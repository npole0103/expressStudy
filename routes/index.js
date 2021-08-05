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
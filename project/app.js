// node_modules 에 있는 express 관련 파일을 가져온다.
var express = require('express')

// express 는 함수이므로, 반환값을 변수에 저장한다.
var app = express()

// 3000 포트로 서버 오픈
app.listen(3000, function() {
    console.log("start! express server on port 3000")
})

// 이제 터미널에 node app.js 를 입력해보자.

// request 와 response 라는 인자를 줘서 콜백 함수를 만든다.
// localhost:3000 브라우저에 res.sendFile() 내부의 파일이 띄워진다.

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/view/index.html")
})

// localhost:3000/main 브라우저에 res.sendFile() 내부의 파일이 띄워진다.
app.get('/index', function(req,res) {
    res.sendFile(__dirname + "/public/view/index.html")
})

app.get('/introducation', function(req,res) {
    res.sendFile(__dirname + "/public/view/introducation.html")
})


// public 디렉토리를 static으로 기억한다.
// public 내부의 파일들을 localhost:3000/파일명 으로 브라우저에서 불러올 수 있다.
app.use(express.static('public'))
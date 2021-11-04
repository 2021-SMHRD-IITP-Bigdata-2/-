// 모듈 start
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs')
const cors = require('cors');
// Google Auth start
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '328822197094-khiejtot9evtjn0tmd24b3ppo14io05e.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);
// Google Auth end
// 모듈 end
// mysql 가져오기
const db = require('./routes/connection.js');



// 포트 5000번 설정
const PORT = process.env.PORT || 3000;

// Middleware
// ejs 사용
app.set('view engine', 'ejs');
// css 및 js static 파일 가져오는 경로 설정 코드
app.use(express.static('public'));
app.use(express.json());
// cookieParser는 사용자가 인증되었는지 확인하고 특정 경로에 엑세스 할 수 있는지 여부를 결정하기 위해 쿠키 사용
app.use(cookieParser());
// 로그인 회원가입 라우터 api 경로로 들어갈 수 있음
const router = require("./routes/router.js");
app.use('/api', router);

// <--                                 구글 로그인 start                                  -->
// login.ejs 렌더링
app.get('/login', (req, res) => {
    res.render('login')
    console.log('login');
});
app.post('/login', (req, res) => {
    let token = req.body.token;
    console.log(token);

    async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    console.log(payload);
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}
verify()
    .then(() => {
    res.cookie('session-token', token);
    res.send('success');
    }).catch(console.error);
});
app.get('/index', (req, res) => {
    let user = req.user;
    res.render('index', {user});
});
// app.get('/protectedroute', (req, res) => {
//     res.render('protectedroute');
// });
function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
    }
    verify()
        .then(()=>{
            req.user = user;
            next();
        })
        .catch(err=>{
            res.redirect('/login')
        })
}
// <--                                 구글 로그인 end                                 -->

// app.get('/protectedroute', (req, res) => {
//     res.render('protectedroute');
// });

// index.ejs 렌더링해서 화면 보여줌
// app.get('/', (req, res) => {
//     res.render('index');
//     console.log('index');
// });

app.get('/drink', (req, res) => {
    res.render('drink');
});

// app.get('/protectedroute', (req, res) => {
//     res.render('protectedroute');
// });

app.get('/community', (req, res) => {
    res.render('community');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

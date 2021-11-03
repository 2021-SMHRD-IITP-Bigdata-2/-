const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
// Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '328822197094-khiejtot9evtjn0tmd24b3ppo14io05e.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);
const mysql = require("mysql");
const dotenv = require('dotenv');

// .env 파일 사용
dotenv.config({ path: './.env'})

// 포트 5000번 설정
const PORT = process.env.PORT || 5000;

// .env 파일에 깃허브 푸쉬할때 보안때문에 설정해놓음
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// 연결했을때 에러뜨면 콘솔에 띄워야 에러가 확인됨
db.connect( (error) => {
    if(error){
        console.log(error)
    } else{
        console.log("MYSQL Connected.....")
    }
});

// Middleware
// ejs 사용
app.set('view engine', 'ejs');
// css 및 js static 파일 가져오는 경로 설정 코드
app.use(express.static('public'));
app.use(express.json());
// cookieParser는 사용자가 인증되었는지 확인하고 특정 경로에 엑세스 할 수 있는지 여부를 결정하기 위해 쿠키 사용
app.use(cookieParser());

// index.ejs 렌더링해서 화면 보여줌
app.get('/', (req, res) => {
    res.render('index');
    console.log('index');
});

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

// 공통부분 레이아웃 가져오기
app.use(expressLayouts);

app.set('layout','layout');
app.set('layout extractScripts', true);



app.get('/protectedroute', (req, res) => {
    res.render('protectedroute');
});

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

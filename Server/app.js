const express = require("express");
const server = express();
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser')


server.use(cors());

// server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(bodyParser.urlencoded({extended: true}));

// server.post('/test',(req,res)=>{
//     sqlInsert = 'INSERT INTO users SET ?'
//     db.query(sqlInsert,1,(err,result)=>{
//         console.log(result)
//         // res.json(result)
//     })
// });


//회원가입
server.post("/join", (req, res) => {

    console.log(req.body)
    const sqlInsert =
        "INSERT INTO users ( user_id, user_pwd, user_name, user_nick, user_phone, user_national, user_img ) VALUES (? ,? ,?, ?, ?, ?, ?)";
    db.query(sqlInsert,[req.body.user_id, req.body.user_pwd, req.body.user_name, req.body.user_nick, req.body.user_phone, req.body.user_national, req.body.user_img] ,(err, result) => {
        if (err) console.log(err);
        res.json(result);

        // console.log(result);
    });

});


// // get 방식
// server.get("/join123", (req, res) => {
//     // console.log(req.body)
//     const sqlSelect =
//         "SELECT * FROM testtable";
//     db.query(sqlSelect ,(err, result) => {
//         if (err) console.log(err);
//         console.log(result)
//         res.json(result);
//     });
// });




// const app = express();
server.use(express.static('public'));

// server.use('/static', express.static('./public'));
dotenv.config({ path: './.env'})

// mysql 연결
// .env에 보안관련된거 싹다 넣고 git에 올리면 됨
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// 현재 디렉토리 엑세스 (콘솔에 띄워보면 경로뜸)
// public 폴더에 js와 css 공용으로 사용할 수 있음
// const publicDirectory = path.join(__dirname, './public');
// app.use(express.static('public'));
// app.use(express.static('files'));



// 연결했을때 에러뜨면 콘솔에 띄워야 에러가 확인됨
db.connect( (error) => {
    if(error){
        console.log(error)
    } else{
        console.log("MYSQL Connected.....")
    }
});




// server.get("/login", (req, res) => {
//
//     res.sendFile(__dirname + "/public/login.html")
// });

// server.get("/register", (req, res) => {
//
//     res.sendFile(__dirname + "/public/join.html")
// });


// Define Routes
// server.use('/', require('./routes/pages'));




server.listen(3000, (err) => {
    if (err) return console.log(err);
    console.log("The server is listening on port 3000")
});















// const express = require("express");
// const path = require('path');
// const mysql = require("mysql");
// const dotenv = require('dotenv');
// const hbs = require('express-handlebars');

// dotenv.config({ path: './.env'})
//
// const app = express();

// mysql 연결
// .env에 보안관련된거 싹다 넣고 git에 올리면 됨
// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// });

// 현재 디렉토리 엑세스 (콘솔에 띄워보면 경로뜸)
// public 폴더에 js와 css 공용으로 사용할 수 있음
// const publicDirectory = path.join(__dirname, './public');
// app.use(express.static)
// console.log(__dirname);

// 핸들바
// app.engine( 'hbs', hbs( {
//     extname: 'hbs',
//     defaultLayout: 'main',
//     layoutsDir: __dirname + '/views/layouts/',
//     partialsDir: __dirname + '/views/partials/'
// } ) );
//
// app.set('view engine', 'hbs');

// // 연결했을때 에러뜨면 콘솔에 띄워야 에러가 확인됨
// db.connect( (error) => {
//     if(error){
//         console.log(error)
//     } else{
//         console.log("MYSQL Connected.....")
//     }
// });


// html get방식으로 가져오기
// app.get("/", (req, res) => {
//     // res.send("<h1>Home page</h1>")
//     res.render("index")
// });
// app.get("/test", (req, res) => {
//     // res.send("<h1>Home page</h1>")
//     res.send("index")
// });
// app.listen(5000, () => {
//     console.log("server connected")
// });


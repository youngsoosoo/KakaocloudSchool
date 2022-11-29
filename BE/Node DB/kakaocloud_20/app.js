const express = require('express');
const morgan = require('morgan');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

//express web application server를 9000번 포트로 생성
const app = express();
app.set('port', process.env.PORT || 9000);

//로그를 화면에 출력
app.use(morgan('dev'));

//form이 아닌 형태의 POST 방식의 파라미터를 읽기 위한 설정
let bodyParser = require('body-parser')
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
})); 

//파일 다운로드를 구현하기 위한 모듈
let util = require('util')
let mime = require('mime')

//파일 업로드를 위한 디렉토리를 없으면 생성
try {
    fs.readdirSync('img');
} catch (error) {
    console.error('img 폴더가 없어 img 폴더를 생성합니다.');
    fs.mkdirSync('img');
}

//파일 업로드 설정
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            //업로드할 디렉토리 설정
            done(null, 'img/');
        },
        filename(req, file, done) {
            //업로드 될 때의 파일 이름 설정
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
});

//템플릿 엔진(서버의 데이터를 html에 출력하기 위한 모듈) 설정
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

//Mongo DB 사용을 위한 모듈 가져오기
let MongoClient = require('mongodb').MongoClient;
//접속할 데이터베이스 URL 설정
let databaseUrl = 'mongodb://localhost:27017/';

//node 데이터베이스의 item 컬렉션에 존재하는 모든 데이터를 리턴
app.get('/item/all', (req, res) => {
    //데이터 베이스 연결
    MongoClient.connect(databaseUrl, {useNewUrlParser:true}, (error, database) => {
        if(error){
            console.log(error);
            res.json({"result":false, "message":"이유"});
        }else{
            //데이터베이스 가져오기
            let db = database.db('node');
            //item 컬렉션의 모든 데이터 가져오기
            db.collection('item').find().sort({itemid:-1}).toArray((error, items) => {
                if(error){
                    console.log(error);
                    res.json({"result":false, "message":"이유"});
                }else{
                    res.json({"result":true, "list":items, "count":items.length});
                }
            });
        }
    })
});

//node 데이터베이스의 item 컬렉션에 데이터를 페이지 단위로 가져오기

//데이터베이스에서 페이지 단위로 데이터를 가져올 때는
//건너뛸 개수와 가져올 데이터 개수가 필요

//클라이언트에서 넘겨주는 데이터: 페이지 번호와 데이터 개수
app.get('/item/paging', (req, res) => {
    //클라이언트의 데이터 받아오기
    let pageno = req.query.pageno;//페이지 번호
    let count = req.query.count; //한 번에 가져올 데이터 개수

    //건너뛸 개수 계산
    if(pageno == undefined){
        pageno = 1;
    }
    if(count != undefined){
        count = 2;
    }

    //웹에서는 클라이언트가 전송하는 데이터는 기본적으로 무조건 문자열입니다.
    //계산을 할 때는 숫자로 변형을 해서 계산을 해야 합니다.
    let start = (parseInt(pageno) - 1) * parseInt(count);

    //데이터 베이스 연결
    MongoClient.connect(databaseUrl, {useNewUrlParser:true}, (error, database) => {
        if(error){
            console.log(error);
            res.json({"result":false, "message":"이유"});
        }else{
            //데이터베이스 가져오기
            let db = database.db('node');
            //item 컬렉션의 모든 데이터 가져오기
            db.collection('item').find().sort({itemid:-1}).skip(start).limit(count)
            .toArray((error, items) => {
                if(error){
                    console.log(error);
                    res.json({"result":false, "message":"이유"});
                }else{
                    res.json({"result":true, "list":items, "count":items.length});
                }
            });
        }
    })
});

//상세보기
//기본키 하나의 데이터를 필요로 하는 경우가 많고
//결과는 하나의 데이터를 리턴하는 경우가 많고
//그 이외의 주위에 3-10여 개의 데이터를 같이 리턴하는 경우도 많음
app.get('/item/:itemid', (req, res) => {
    //클라이언트의 데이터 받아오기
    //url에 포함된 데이터 받기
    let itemid = req.params.itemid;

    //데이터 베이스 연결
    MongoClient.connect(databaseUrl, {useNewUrlParser:true}, (error, database) => {
        if(error){
            console.log(error);
            res.json({"result":false, "message":"이유"});
        }else{
            //데이터베이스 가져오기
            let db = database.db('node');
            //item 컬렉션의 모든 데이터 가져오기
            db.collection('item').findOne({'itemid':Number(itemid)}, (error, item) => {
                if(error) {
                    console.log(error);
                    res.json({"result":false, "message":"이유"});
                }else {
                    res.json({"result":true, "item":item});
                }
            });
        }
    })
});

//데이터 삽입 구현
//itemname, description, price, pictureurl 받기
app.post('/item', upload.single('pictureurl'), (req, res) => {
    //파라미터 읽어오기
    const itemname = req.body.itemname;
    const description = req.body.description;
    const price = req.body.price;
    let pictureurl;
    //업로드한 파일이 있으면 파일의 이름을 설정하고
    //없으면 디폴트 값 설정
    if(req.file){
        pictureurl = req.file.filename;
    }else{
        pictureurl = 'default.jpg';
    }

    MongoClient.connect(databaseUrl, {useNewUrlParser:true}, (error, database) => {
        if(error){
            console.log(error);
            res.json({"result":false});
        }else{
            let db = database.db('node');
            //가장 큰 itemid를 찾아오기
            db.collection("item").find({}, {projection:{_id:0, itemid:1}})
                .sort({itemid:-1}).limit(1).toArray((error, result) => {
                    let itemid = 1;
                    if(result[0] != null){
                        itemid = result[0].itemid + 1;
                    }
                    db.collection('item').insertOne({
                        "itemid":itemid,
                        "itemname":itemname,
                        "description":description,
                        "price":price,
                        "pictureurl":pictureurl
                    }, (error, result) => {
                        if(error){res.json({"result":false})}
                        else{res.json({"result":true})}
                    })
            });
        }
    });
});

//에러 처리를 위한 부분
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message)
});

//서버 구동
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const dotenv = require('dotenv');

//설정 파일의 내용 가져오기
dotenv.config();

//서버 설정
const app = express();
app.set('port', process.env.PORT || 9000);

//로그를 매일 기록하기 위한 설정
let FileStreamRotator = require('file-stream-rotator');
let fs = require('fs');

//로그를 기록할 디렉토리 경로 생성
let logDirectory = path.join(__dirname, 'log');

//디렉토리가 없으면 생성
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//로그 파일 옵션을 설정
let accessLogStream = FileStreamRotator.getStream({
    date_format:'YYYYMMDD',
    filename:path.join(logDirectory, 'access-%DATE%.log'),
    frequency:'daliy',
    verbose:false
});
//로그 기록 설정
app.use(morgan('combined', {stream:accessLogStream}));

//압축해서 전송하는 옵션 설정
app.use(compression());

//POST 방식의 파라미터 읽을 수 있도록 설정
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

//세션을 데이터베이스에 저장하는 작업

//데이터베이스 접속 정보
let options = {
    host:process.env.HOST,
    port:process.env.MYSQLPORT,
    user:process.env.MYSQLUSER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
};
//세션을 저장하기 위한 MySQL 데이터베이스 저장소 생성
const MariaDBStore = require('express-mysql-session')(session);
//세션 설정
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:true,
    store:new MariaDBStore(options)
}));

//파일 업로드 설정
const upload = multer({
    storage:multer.diskStorage({
        destination(req, file, done){
            done(null, 'public/img');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) +
                Date.now() + ext);
        }
    }),
    limits:{fileSize: 10*1024*1024}
});

//정적 파일의 경로를 설정
app.use('/', express.static('public'));

//파일 다운로드를 위한 모듈
let util = require('util');
let mime = require('mime');

//데이터베이스 연결
let connection = mysql.createConnection(options);
connection.connect((error) => {
    if(error){
        console.log(error);
        throw error;
    }
});

//sequelize를 이용한 데이터베이스 연결
//require를 할 때 디렉토리의 이름을 기재하면
//디렉토리 안의 index.js의 내용을 import
const  {sequelize} = require('./models');
const  {Good} = require('./models');

sequelize.sync({force:false}).then(()=>{
    console.log("데이터베이스 연결 성공");
}).catch((err) => {
    console.log("데이터베이스 연결 실패");
})

//기본 요청을 처리
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//데이터 전체 가져오기 처리
app.get('/item/all', async (req, res) => {
    //템플릿 엔진: res.render(파일 경로, 데이터)
    //템플릿 엔진에 넘겨주는 데이터는 프로그래밍 언어의 데이터
    
    //JSON 출력: res.json(데이터)
    //json 문자열의 형태로 데이터를 제공
    //Front End 에서 데이터를 수신해서 출력
    
    //2개 이상의 데이터를 조회할 때는 정렬은 필수
    /*connection.query("select * from goods order by itemid desc", 
        (err, results, fields)=>{
            if(err){
                //에러가 발생한 경우
                //에러가 발생했다고 데이터를 전송하지 않으면 안됨
                res.json({'result':false})

            }else{
                //정상 응답을 한 경우
                res.json({'result':true, 'list':results});
            }
    });*/

    //전체 데이터 가져오기
    try{
        let list = await Good.findAll();
        res.json({"result":true, "list":list});
    }catch(error){
        console.log(error);
        res.json({"result":true});
    }
});

//데이터 일부분 가져오기
//URL은 /item/list 
//파라미터는 pageno 1개 인데 없으면 1로 설정
app.get('/item/list', async(req, res) => {
    //파라미터 읽어오기
    let pageno = req.query.pageno;
    if(pageno == undefined){
        pageno = 1;
    }
    console.log(pageno);
    //브라우저에서 테스트 - 콘솔 확인
    //localhost:9000/item/list
    //localhost:9000/item/list?pageno=3

    //item 테이블에서 itemid 를 가지고 내림차순 정렬해서 
    //페이지 단위로 데이터 가져오기
    //select * from item order by itemid desc limit 시작번호, 5
    //시작번호=(pageno-1)*5

    //파라미터는 무조건 문자열입니다.
    //파라미터를 가지고 산술연산을 할 때는 숫자로 변환을 수행
    
    //성공 과 실패 여부를 저장
    let result = true;
    //성공했을 때 데이터를 저장
    let list;
    //데이터 목록 가져오기
    /*connection.query(
        "select * from goods order by itemid desc limit ?, 5", 
        [(parseInt(pageno)-1)*5], (err, results, fields) => {
            if(err){
                console.log(err);
                result = false;
            }else{
                list = results;
                //console.log(list);
            }
            
            //goods 테이블의 전체 데이터 개수를 가져오기
            let cnt = 0;
            connection.query("select count(*) cnt from goods",
                [], (err, results, fields)=>{
                if(err){
                    //에러가 발생했을 때
                    console.log(err);
                    result = false;
                }else{
                    //정상적으로 구문이 실행되었을 때
                    //하나의 행만 리턴되므로 0 번째 데이터를 읽어내면 됩니다.
                    cnt = results[0].cnt;
                }

                //응답 생성해서 전송
                if(result === false){
                    res.json({"result":false});
                }else{
                    res.json({"result":true, "list":list, "count":cnt});
                }
        });
    });*/

    try{
        //테이블의 데이터 개수 가져오기
        let cnt = await Good.count();
        //페이지 단위로 데이터 목록 가져오기
        let list = await Good.findAll({
            offset:(parseInt(pageno)-1)*5,
            limit:5
        })
        res.json({"result":true, "count":cnt, "list":list});
        
    }catch(error){
        console.log(error);
        res.json({"result":false});
    }
});

//상세보기 처리를 위한 코드
app.get('/item/detail/:itemid', async (req, res) => {
    //파라미터 읽기
    let itemid = req.params.itemid;
    //itemid를 이용해서 1개의 데이터를 찾아오는 SQL을 실행
    /*connection.query("select * from goods where itemid=?",
     [itemid], (err, results, fields) => {
        if(err){
            console.log(err);
            res.json({"result":false});
        }else{
            console.log(results);
            res.json({"result":true, "item":results[0]});
        }
    });*/
    try{
        let item = await Good.findOne({
            where:{
                itemid:itemid
            }
        });
        res.json({"result":true, "item":item});
    }catch(error){
        console.log(error);
        res.json({"result":false});
    }
});

//이미지 다운로드 처리
app.get('/img/:pictureurl', (req, res) => {
    let pictureurl = req.params.pictureurl;
    //이미지 파일의 절대경로를 생성
    let file = 
    "C:\Users\Administrator\Documents\node\mariadb\public\img" 
        + "/" + pictureurl; 
    console.log(__dirname);
    //파일 이름을 가지고 타입을 생성
    let mimetype = mime.lookup(pictureurl);
    res.setHeader('Content-disposition', 
        'attachment; filename=' + pictureurl);
    res.setHeader('Content-type', mimetype);
    //파일의 내용을 읽어서 res에 전송
    let filestream = fs.createReadStream(file);
    filestream.pipe(res);
});

//현재 날짜를 문자열로 리턴하는 함수
//요즈음 등장하는 자바스크립트 라이브러리들의 샘플 예제는 
//특별한 경우가 아니면 function 을 사용하지 않습니다.
const getDate = () => {
    let date = new Date();
    let year = date.getFullYear();
    //월은 +1을 해야 우리가 사용하는 월이 됩니다.
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    return year + "-" + month + "-" + day;
}

//날짜 와 시간을 리턴하는 함수
const getTime = () => {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    hour >= 10 ? hour : '0' + hour;
    minute >= 10 ? minute : '0' + minute;
    second >= 10 ? second : '0' + second;

    return getDate() + " " 
        + hour + ":" + minute + ":" + second;
}

//데이터 삽입을 처리해주는 함수
app.post('/item/insert', upload.single('pictureurl'), 
    async (req, res) => {
    //파라미터 읽어오기
    const itemname = req.body.itemname;
    const description = req.body.description;
    const price = req.body.price;

    //파일 이름 - 업로드하는 파일이 없으면 default.png
    let pictureurl;
    if(req.file){
        pictureurl = req.file.filename
    }else{
        pictureurl = 'default.jpg';
    }
    /*
    //가장 큰 itemid 찾기
    connection.query("select max(itemid) maxid from goods",
    [], (err, results, fields) => {
        let itemid;
        //최대값이 있으면 + 1 하고 없으면 1로 설정
        if(results.length > 0 ){
            itemid = results[0].maxid + 1;
        }else{
            itemid = 1;
        }

        //데이터 삽입
        connection.query("insert into goods(" + 
            "itemid, itemname, price, description," 
            + "pictureurl, updatedate) values(?, ?, ?, ?, ?, ?)",
            [itemid, itemname, price, description, pictureurl,
            getDate()], (err, results, fields) => {
            if(err){
                console.log(err);
                res.json({"result":false});
            }else{
                //현재 날짜 및 시간을 update.txt에 기록
                const writeStream = fs.createWriteStream('./update.txt');
                writeStream.write(getTime());
                writeStream.end();

                res.json({"result":true});
            }
        })
    });
    */

    //가장 큰 itemId를 이용해서 itemid 생성
    let itemid = 1;
    try{
        let x = await Good.max('itemid');
        itemid = x + 1;
    }catch(err) {
        console.log(err);
    }

    //데이터 삽입
    Good.create({
        itemid:itemid,
        itemname:itemname,
        price:price,
        description:description,
        pictureurl:pictureurl,
        updatedate:getDate()
    });

    //현재 날짜 및 시간을 update.txt에 기록
    const writeStream = fs.createWriteStream('./update.txt');
    writeStream.write(getTime());
    writeStream.end();

    res.json({"result":true});
});

//데이터를 삭제하는 함수
app.post('/item/delete', async(req, res) => {
    //post 방식으로 전송된 데이터 읽기
    let itemid = req.body.itemid;

    //itemid를 받아서 goods 테이블에서 삭제하기
    /*connection.query("delete from goods where itemid=?",
     [itemid], (err, results, fields)=>{
        if(err){
            console.log(err);
            res.json({"result":false});
        }else{
            //현재 날짜 및 시간을 update.txt에 기록
            const writeStream = fs.createWriteStream(
                './update.txt');
            writeStream.write(getTime());
            writeStream.end();

            res.json({"result":true});
        }
    });*/

    try{
        await Good.destroy({
            where:{
                itemid:itemid
            }
        })
        res.json({"result":true})
    }catch(error){
        console.log(error);
        res.json({"result":false});
    }

});

//수정을 get으로 요청했을 때 - 수정 화면으로 이동
app.get('/item/update', (req, res) => {
    //public 디렉토리의 update.html을 읽어내서 리턴
    fs.readFile('./public/update.html', (err, data)=>{
        res.end(data);
    });
});

app.post('/item/update', upload.single('pictureurl'), async(req, res) => {
    //파라미터 가져오기
    const itemid = req.body.itemid;
    const itemname = req.body.itemname;
    const price = req.body.price;
    const description = req.body.description;
    //예전 파일 이름
    const oldpictureurl = req.body.oldpictureurl;

    //수정할 파일 이름 만들기
    let pictureurl;
    //새로 선택한 파일이 있다면
    if(req.file){
        pictureurl = req.file.filename;
    }else{
        pictureurl = oldpictureurl;
    }

    /*connection.query("update goods set itemname=?, price=?, description=?, pictureurl=?, updatedate=? where itemid=?", 
    [itemname, price, description, pictureurl, getDate(), itemid], 
    (error, results, fields) => {
        if(error){
            //에러가 발생한 경우
            console.log(error);
            res.json({"result":false});
        }else{
            //성공했을 때 처리
            const writeStream = fs.createWriteStream("./update.txt");
            writeStream.write(getTime());
            writeStream.end();
            res.json({"result": true});
        }
        
    });*/

    try{
        await Good.update({
            itemid:itemid,
            price:price,
            description:description,
            pictureurl:pictureurl,
            updatedate:getDate()
        }, {where:{itemid:itemid}})
        res.json({"result":true});
    }catch(error){
        console.log(error);
        res.json({"result":false});
    }
});

app.get('/item/updatedate', (req, res) => {
    fs.readFile('./update.txt', (error, data)=> {
        res.json({'result':data.toString()});
    })
});

//에러 발생시 처리
app.use((err, req, res, next)=>{
    console.log(err);
    res.status(500).send(err.message);
});

//서버 구동
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
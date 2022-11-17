//노드에서는 다른 모듈을 가져올 때 require를 사용
const express = require('express');

//웹 서버를 생성할 수 있는 인스턴스를 생성
const app = express();

//포트 설정(1024번까지는 예약된 포트)
//80번은 http의 기본 포트, 443은 https의 기본 포트
app.set('port', 4000);

//요청을 처리하는 함수 외부에 만든 변수는
//모든 사용자가 공유합니다.
let num = 1;
//세션을 사용하기 위한 모듈 가져오기
const session = require('express-session');
//세션을 사용하기 위한 미들웨어 설정
//secret은 세션은 클라이언트에 키를 만들어서 매핑을 합니다.
//이 때 key의 값을 알아보기 어렵게 하기 위해서 연산을 수행할
//값을 주게되는데 이 값이 secret 입니다.
app.use(session({
    secret: "keyboard cat",
    resave:false,
    saveUninitialized:true
}))

//사용자의 요청 처리
app.get("/session", (req, res) => {
    //세션에 num의 값이 없으면 1로 초기화하고 있으면 1 증가
    if(!req.session.num){
        req.session.num = 1;
    }else {
        req.session.num += 1;
    }
    //내용을 화면에 출력
    res.send("num : " + num + "<br/>" + "session의 num : " + req.session.num);
    num += 1;
})

//서버를 실행시켜서 사용자의 요청을 처리
app.listen(app.get('port'), () => {
    console.log("서버 대기 중");
});
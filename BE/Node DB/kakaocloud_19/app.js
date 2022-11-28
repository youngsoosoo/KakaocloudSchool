const express = require('express');
const path = require('path');



const app = express();
app.set('port', process.env.PORT || 3000);

//sequelize 연결
const {sequelize} = require('./models');
sequelize.sync({force:false}).then(()=>{
    console.log("데이터 베이스 연결 성공");
}).catch((error)=>{
    console.log(error);
});

const User = require('./models/users');
const Comment = require('./models/comments');

app.get('/', async(req, res) => {
    const user = User.create({
        name:'군',
        age:27
    });
    console.log(user);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
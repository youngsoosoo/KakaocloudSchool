//모듈 import
const Sequelize = require('sequelize');
//모델 가져오기
const Good = require('./good')
//환경 설정
const env = process.env.NODE_ENV || 'development';
//환경 설정 내용 가져오기
const config = require('../config/config.json')[env];
//내보낼 객체 생성
const db = {};
//ORM 설정
const sequelize = new Sequelize(config.database, config.username, config.password, config);
// 
db.sequelize = sequelize;

db.Sequelize = Sequelize;
db.Good = Good;
Good.init(sequelize);

module.exports=db;
//모듈 import
const Sequelize = require('sequelize');

const User = require('./users');
const Comment = require('./comments');
//환경 설정
const env = process.env.NODE_ENV || 'development';
//환경 설정 내용 가져오기
const config = require('../config/config.json')[env];
//내보낼 객체 생성
const db = {};
//ORM 설정
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports=db;
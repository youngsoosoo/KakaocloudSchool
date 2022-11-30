const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

//모델들 가져오기
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//모델들 가져오기
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;

//초기화 작업
User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

//관계 설정
User.associate(db);
Post.associate(db);
Hashtag.associate(db);

module.exports = db;

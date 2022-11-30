const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    //테이블에 대한 설정
    static init(sequelize) {
        return super.init({
            //컬럼에 대한 설정
            content: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
        }, {
            //테이블에 대한 설정
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',      
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }
    //관계에 대한 설정
    static associate(db) {
        //User와의 관계는 1:N
        db.Post.belongsTo(db.User);
        //Hashtag와는 N:M
        //다대다 관계는 테이블이 생성되는데 through가 테이블이름
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });    
    }
};
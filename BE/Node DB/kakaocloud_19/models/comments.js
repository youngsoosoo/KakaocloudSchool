const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        //테이블에 대한 설정
        return super.init({
            //컬럼에 대한 설정
            comment:{
                type:Sequelize.STRING(100),
                allowNull:false
            }
        }, {
            //테이블에 대한 설정
            sequelize,
            timestamps: true,
            tableName: 'comments',
            modelName: 'Comment',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }

    static associate(db){
        //왜래키에 대한 설정
        db.Comment.belongsTo(db.User, {foreignKey:'commenter', targetKey:'id'});
    }
}
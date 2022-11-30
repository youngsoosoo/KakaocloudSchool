const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    //테이블에 대한 설정
    static init(sequelize) {
        return super.init({
            //컬럼에 대한 설정
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(40),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(128),
                allowNull: true,
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
        }, {
            //테이블에 대한 설정
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'snsuser',      
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
    //관계에 대한 설정
    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow'
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow'
        });
    }
};
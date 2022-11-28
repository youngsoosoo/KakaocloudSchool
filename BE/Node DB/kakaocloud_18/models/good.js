const Sequelize = require('sequelize');

module.exports = class Good extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            itemid: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                unique: true,
            },
            itemname: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            price: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true
            },
            description: {
                type: Sequelize.STRING(200),
                allowNull: true
            },
            pictureurl: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            pictureurl: {
                type: Sequelize.STRING(20),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            tableName: 'goods',
            modelName: 'Good',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
}
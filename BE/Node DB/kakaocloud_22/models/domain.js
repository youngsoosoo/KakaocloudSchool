const Sequelize = require("sequelize");

module.exports = class Domain extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        host: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        clientSecret: {
          type: Sequelize.STRING(36),
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM("free", "premium"),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Domain",
        tableName: "domains",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
  static associate(db) {
    //User와 Domain은 1:N
    //User의 기본키가 Domain에 외래키로 추가됨.
    db.Domain.belongsTo(db.User);
  }
};

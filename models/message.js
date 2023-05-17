'use strict';

module.exports = function(sequelize, DataTypes) {
  const Message = sequelize.define('Message', {
    to: DataTypes.INTEGER,
    text: DataTypes.STRING,
    read: DataTypes.BOOLEAN
  }, { tableName: "Messages2" });

  Message.associate = function (models) {
    Message.belongsTo(models.User, {foreignKey: { name: "from" } });
  }
};
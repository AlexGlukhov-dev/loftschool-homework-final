'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    senderId: DataTypes.STRING,
    recipientId: DataTypes.STRING,
    roomId: DataTypes.STRING,
    text: DataTypes.STRING,
  }, {});
  chat.associate = function(models) {
    // associations can be defined here
  };
  return chat;
};
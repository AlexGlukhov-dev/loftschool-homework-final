'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    userName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    surName: DataTypes.STRING,
    image: DataTypes.STRING,
    password: DataTypes.STRING,
    permission: DataTypes.JSONB,
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
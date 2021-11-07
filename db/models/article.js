'use strict';
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    user: DataTypes.JSON,
  }, {});
  article.associate = function(models) {
    // associations can be defined here
  };
  return article;
};
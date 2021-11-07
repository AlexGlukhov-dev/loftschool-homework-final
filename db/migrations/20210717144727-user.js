'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      surName: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      permission: {
        type: Sequelize.JSONB,
        allowNull: false,
        value: {
          chat: {
            C: Sequelize.BOOLEAN,
            R: Sequelize.BOOLEAN,
            U: Sequelize.BOOLEAN,
            D: Sequelize.BOOLEAN
          },
          news: {
            C: Sequelize.BOOLEAN,
            R: Sequelize.BOOLEAN,
            U: Sequelize.BOOLEAN,
            D: Sequelize.BOOLEAN
          },
          settings: {
            C: Sequelize.BOOLEAN,
            R: Sequelize.BOOLEAN,
            U: Sequelize.BOOLEAN,
            D: Sequelize.BOOLEAN
          }
        }
      },  
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      machine: {
        type: Sequelize.STRING
      },
      command: {
        type: Sequelize.STRING
      },
      p1: {
        type: Sequelize.INTEGER
      },
      p2: {
        type: Sequelize.INTEGER
      },
      p3: {
        type: Sequelize.INTEGER
      },
      p4: {
        type: Sequelize.INTEGER
      },
      p5: {
        type: Sequelize.INTEGER
      },
      p6: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Transactions');
  }
};
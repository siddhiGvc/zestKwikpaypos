'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('TransactionHistory', {
      id: {
        allowNull: false,
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
        type: Sequelize.STRING
      },
      p2: {
        type: Sequelize.STRING
      },
      p3: {
        type: Sequelize.STRING
      },
      p4: {
        type: Sequelize.STRING
      },
      p5: {
        type: Sequelize.STRING
      },
      p6: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      p7: {
        type: Sequelize.STRING
      },
      p8: {
        type: Sequelize.STRING
      },
      p9: {
        type: Sequelize.STRING
      },
      p10: {
        type: Sequelize.STRING
      },
      p11: {
        type: Sequelize.STRING
      },
      p12: {
        type: Sequelize.STRING
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('TransactionHistory');
  }
};
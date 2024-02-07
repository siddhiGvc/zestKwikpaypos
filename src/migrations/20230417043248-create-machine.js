'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Machines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serial: {
        type: Sequelize.STRING
      },
      uid: {
        type: Sequelize.STRING
      },
      zone: {
        type: Sequelize.STRING
      },
      ward: {
        type: Sequelize.STRING
      },
      beat: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.STRING
      },
      lon: {
        type: Sequelize.STRING
      },
      data1: {
        type: Sequelize.STRING
      },
      data2: {
        type: Sequelize.STRING
      },
      data3: {
        type: Sequelize.STRING
      },
      data4: {
        type: Sequelize.STRING
      },
      data5: {
        type: Sequelize.INTEGER
      },
      data6: {
        type: Sequelize.INTEGER
      },
      data7: {
        type: Sequelize.INTEGER
      },
      data8: {
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
    return queryInterface.dropTable('Machines');
  }
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('AddressData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      objectId: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      num_seat: {
        type: Sequelize.INTEGER
      },
      owner: {
        type: Sequelize.STRING
      },
      agency: {
        type: Sequelize.STRING
      },
      electric: {
        type: Sequelize.STRING
      },
      seat_male: {
        type: Sequelize.INTEGER
      },
      seat_female: {
        type: Sequelize.INTEGER
      },
      lat: {
        type: Sequelize.STRING
      },
      lon: {
        type: Sequelize.STRING
      },
      mapped_serial: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('AddressData');
  }
};
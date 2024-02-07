'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MachineData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      machineId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      heater_A_On: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      heater_A_Temp: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      heater_B_On: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      heater_B_Temp: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      doorCurrent: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      doorLife: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      qtyCurrent: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      qtyLife: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      burnCycleCurrent: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      burnCycleLife: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      cashCurrent: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      cashLife: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      lastOnTime: {
        allowNull: true,
        type: Sequelize.DATE
      },
      lastHeartbeatTime: {
        allowNull: true,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      last_status: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status_type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      spiral_a_status: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      spiral_b_status: {
        allowNull: false,
        defaultValue: 0,
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
    return queryInterface.dropTable('MachineData');
  }
};
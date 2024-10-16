'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UnilineMachineData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SNoutput: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      G1: {
      
        defaultValue: null,
        type: Sequelize.STRING
      },
      G2: {
      
        defaultValue: null,
        type: Sequelize.STRING
      },
      G3: {
      
        defaultValue: null,
        type: Sequelize.STRING
      },
      I: {
      
        defaultValue: null,
        type: Sequelize.STRING
      },
      GF: {
      
        defaultValue: null,
        type: Sequelize.STRING
      },
      Q: {
      
        defaultValue: null,
        type: Sequelize.STRING
      },
      Q1: {
      
        defaultValue: null,
        type: Sequelize.STRING
      },
      T: {
      
        defaultValue: null,
        type: Sequelize.STRING
      },
      TL: {
      
        defaultValue: null,
        type: Sequelize.STRING
      },
      S: {
      
        defaultValue: null,
        type: Sequelize.STRING
      },
      ST: {
      
        defaultValue: null,
        type: Sequelize.STRING
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
      device_status: {
        allowNull: true,
        type: Sequelize.STRING
      },
      inverter_status: {
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
    return queryInterface.dropTable('UnilineMachineData');
  }
};


module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('TrafficLightDevices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Junction: {
      
        type: Sequelize.STRING,
      },
      zone:{
        type: Sequelize.STRING,
      },
      ward:{
        type: Sequelize.STRING,
      },
      beat:{
        type: Sequelize.STRING,
      }, 
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('TrafficLightDevices'),
  };
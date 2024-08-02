

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('TrafficLightColors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Junction: {
      
        type: Sequelize.STRING,
      },
      R1:{
        type: Sequelize.STRING,
      },
      R2:{
        type: Sequelize.STRING,
      },
      R3:{
        type: Sequelize.STRING,
      },
      R4:{
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('TrafficLightColors'),
  };
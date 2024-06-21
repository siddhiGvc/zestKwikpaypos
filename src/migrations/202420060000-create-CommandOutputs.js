

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('CommandOutputs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      command: {
      
        type: Sequelize.STRING,
      },
      output:{
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('CommandOutputs'),
  };
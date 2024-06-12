

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('TestMode', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      testMode: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('TestMode'),
  };
  
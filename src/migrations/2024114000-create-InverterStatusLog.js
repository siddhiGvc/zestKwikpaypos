module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('InverterStatusLog', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        status: {
          type: Sequelize.STRING(10), // Defines a VARCHAR with a length of 10
          allowNull: false,
        },
        timestamp: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Sets the default value to CURRENT_TIMESTAMP
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('InverterStatusLog');
    },
  };
  
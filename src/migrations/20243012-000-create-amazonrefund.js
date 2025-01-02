module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('amazonRefunds', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        refundId: {
          type: Sequelize.STRING, // Defines a VARCHAR with a length of 10
          allowNull: false,
        },
        refundStatus: {
          type: Sequelize.STRING,
          allowNull: false,
          
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
      return queryInterface.dropTable('amazonRefunds');
    },
  };

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('UnilineHourlyReport', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      deviceTotal: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      deviceOnline: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      inverterTotal: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      inverterOnline: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      BatteryShutDown: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      BatteryLow: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      qtySales: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },


      onTime: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      ward: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      zone: {
        allowNull: false,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('UnilineHourlyReport'),
  };
  

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('hourlyReport', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      machinesTotal: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      machineOnline: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      machineEmpty: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      machineLowStock: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      qtySales: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      cashSales: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },


      burningSales: {
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('hourlyReport'),
  };
  
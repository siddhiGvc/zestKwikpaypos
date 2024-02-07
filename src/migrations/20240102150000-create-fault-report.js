

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('faultReport', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      machineID: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      loginLat: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING
      },
      loginLong: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING
      },
      faultReported: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING
      },
      actionTaken: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING
      },
      faultStatus: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('faultReport'),
  };


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('lockLogs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    machineID: {
        allowNull: false,
        type: Sequelize.STRING
      },
  
    currentLat: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.STRING
    },
    currentLong: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.STRING
    },
    doorStatus: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('lockLogs'),
};



module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('UnilineLoginLogs', {
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
    loginLat: {
      allowNull: true,
      defaultValue: 0,
      type: Sequelize.STRING
    },
    loginLong: {
      allowNull: true,
      defaultValue: 0,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    LoggedInTill: {
        allowNull: true,
        type: Sequelize.DATE,
      },

    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('UnilineLoginLogs'),
};

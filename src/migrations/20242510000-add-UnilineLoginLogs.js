module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('UnilineLoginLogs', 'Remark', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),

      queryInterface.addColumn('UnilineLoginLogs', 'deviceModel', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),

    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('UnilineLoginLogs', 'Remark'),
      queryInterface.removeColumn('UnilineLoginLogs', 'deviceModel'),
    ]),
  };
  
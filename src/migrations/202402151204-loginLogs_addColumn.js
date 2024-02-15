module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('loginLogs', 'Remark', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),

      queryInterface.addColumn('loginLogs', 'MachineNumber', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),

    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('LoginLogs', 'Remark'),
      queryInterface.removeColumn('LoginLogs', 'MachineNumber'),
    ]),
  };
  
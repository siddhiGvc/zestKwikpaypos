module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('loginLogs', 'deviceModel', {
        type: Sequelize.STRING,
        defaultValue: null
      }),

   

    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('loginLogs', 'deviceModel'),
   
    ]),
  };
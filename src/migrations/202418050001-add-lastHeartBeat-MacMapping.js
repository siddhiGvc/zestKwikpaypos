module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('MacMapping', 'lastHeartBeatTime', {
        type: Sequelize.DATE,
        defaultValue: null,
      }),
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('MacMapping', 'lastHeartBeatTime'),
      
      
    ]),
  };
  
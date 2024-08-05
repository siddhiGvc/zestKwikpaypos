module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('InverterStaus', 'lastHeartBeatTime', {
        type: Sequelize.DATE,
        defaultValue: null,
      }),
   
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('InverterStaus', 'lastHeartBeatTime'),
  
      
      
    ]),
  };
  
module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('TrafficLightColors', 'lastHeartBeatTime', {
        type: Sequelize.DATE,
        defaultValue: null,
      }),
   
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('TrafficLightColors', 'lastHeartBeatTime'),
  
      
      
    ]),
  };
  
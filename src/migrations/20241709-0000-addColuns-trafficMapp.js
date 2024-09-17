module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('TrafficMacMapping', 'H1message', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'H2message', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'H3message', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'H4message', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'FLASHmessage', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'OFFmessage', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'NEXTmessage', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'AUTOmessage', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'Qmessage', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'C1message', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'C2message', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'C3message', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'C4message', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'C5message', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'C6message', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'C7message', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('TrafficMacMapping', 'C0message', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('TrafficMacMapping', 'H1message'),
      queryInterface.removeColumn('TrafficMacMapping', 'H2message'),
      queryInterface.removeColumn('TrafficMacMapping', 'H3message'),
      queryInterface.removeColumn('TrafficMacMapping', 'H4message'),
      queryInterface.removeColumn('TrafficMacMapping', 'FLASHmessage'),
      queryInterface.removeColumn('TrafficMacMapping', 'OFFmessage'),
      queryInterface.removeColumn('TrafficMacMapping', 'NEXTmessage'),
      queryInterface.removeColumn('TrafficMacMapping', 'AUTOmessage'),
      queryInterface.removeColumn('TrafficMacMapping', 'Qmessage'),
      queryInterface.removeColumn('TrafficMacMapping', 'C1message'),
      queryInterface.removeColumn('TrafficMacMapping', 'C2message'),
      queryInterface.removeColumn('TrafficMacMapping', 'C3message'),
      queryInterface.removeColumn('TrafficMacMapping', 'C4message'),
      queryInterface.removeColumn('TrafficMacMapping', 'C5message'),
      queryInterface.removeColumn('TrafficMacMapping', 'C6message'),
      queryInterface.removeColumn('TrafficMacMapping', 'C7message'),
      queryInterface.removeColumn('TrafficMacMapping', 'C0message'),
    
   
      
    ]),
  };
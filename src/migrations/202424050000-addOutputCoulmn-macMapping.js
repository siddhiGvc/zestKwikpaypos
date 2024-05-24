module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('MacMapping', 'HBToutput', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'SIPoutput', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'SSIDoutput', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'PWDoutput', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'SSID1output', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'PWD1output', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
 
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('MacMapping', 'HBToutput'),
      queryInterface.removeColumn('MacMapping', 'SIPoutput'),
      queryInterface.removeColumn('MacMapping', 'SSIDoutput'),
      queryInterface.removeColumn('MacMapping', 'PWDoutput'),
      queryInterface.removeColumn('MacMapping', 'SSID1output'),
      queryInterface.removeColumn('MacMapping', 'PWD1output'),
   
      
    ]),
  };
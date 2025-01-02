module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('MacMapping', 'QRoutput', {
        type: Sequelize.TEXT,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'QRmessage', {
        type: Sequelize.TEXT,
        defaultValue: null,
      }),
    
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
   
      queryInterface.removeColumn('MacMapping', 'QRoutput'),
      queryInterface.removeColumn('MacMapping', 'QRmessage'),
   
      
    ]),
  };
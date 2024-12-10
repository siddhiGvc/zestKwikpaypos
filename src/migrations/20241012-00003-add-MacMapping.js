module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('MacMapping', 'VSoutput', {
        type: Sequelize.TEXT,
        defaultValue: null,
      }),
    
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
   
      queryInterface.removeColumn('MacMapping', 'VSoutput'),
   
      
    ]),
  };
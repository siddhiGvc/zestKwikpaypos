module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('MacMapping', 'RPoutput', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
  
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('MacMapping', 'RPoutput'),
    
      
      
    ]),
  };
  
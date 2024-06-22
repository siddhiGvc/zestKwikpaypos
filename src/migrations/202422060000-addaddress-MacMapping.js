module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      
      
      queryInterface.addColumn('MacMapping', 'ward', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'beat', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'address', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
 
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
    
      queryInterface.removeColumn('MacMapping', 'ward'),
      queryInterface.removeColumn('MacMapping', 'beat'),
      queryInterface.removeColumn('MacMapping', 'address'),
   
      
    ]),
  };
  
module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
   
      queryInterface.addColumn('UnilineMacMapping', 'adress', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('UnilineMacMapping', 'lat', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('UnilineMacMapping', 'lon', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
   
     
     
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
    
    
      queryInterface.removeColumn('UnilineMacMapping', 'adress'),
      queryInterface.removeColumn('UnilineMacMapping', 'lat'),
      queryInterface.removeColumn('UnilineMacMapping', 'lon'),
    
   
      
    ]),
  };
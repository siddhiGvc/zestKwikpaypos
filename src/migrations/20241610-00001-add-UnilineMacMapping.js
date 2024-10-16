module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
   
      queryInterface.addColumn('UnilineMacMapping', 'Beat', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
   
     
     
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
    
    
      queryInterface.removeColumn('UnilineMacMapping', 'Beat'),
    
   
      
    ]),
  };
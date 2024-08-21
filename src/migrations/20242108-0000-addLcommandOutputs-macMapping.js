module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('MacMapping', 'Loutput', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'LEmessage', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
 
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('MacMapping', 'Loutput'),
      queryInterface.removeColumn('MacMapping', 'Lmessage'),
   
      
    ]),
  };
  
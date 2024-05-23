module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('MacMapping', 'FotaURLoutput', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'URLoutput', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'Coutput', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'Soutput', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
 
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('MacMapping', 'FotaURLoutput'),
      queryInterface.removeColumn('MacMapping', 'URLoutput'),
      queryInterface.removeColumn('MacMapping', 'Coutput'),
      queryInterface.removeColumn('MacMapping', 'Soutput'),
   
      
    ]),
  };
  
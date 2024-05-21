module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('MacMapping', 'FotaMessage', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'RstMessage', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'Voutput', {
        type: Sequelize.STRING,
        defaultValue: null,
      })
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('MacMapping', 'FotaMessage'),
      queryInterface.removeColumn('MacMapping', 'RstMessage'),
      queryInterface.removeColumn('MacMapping', 'Voutput'),
      
      
    ]),
  };
  
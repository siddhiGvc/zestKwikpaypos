module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('MacMapping', 'INHinput', {
        type: Sequelize.INTEGER,
        defaultValue: null,
      }),
      queryInterface.addColumn('MacMapping', 'INHoutput', {
        type: Sequelize.INTEGER,
        defaultValue: null,
      })
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('MacMapping', 'INHinput'),
      queryInterface.removeColumn('MacMapping', 'INHoutput'),
      
      
    ]),
  };
  
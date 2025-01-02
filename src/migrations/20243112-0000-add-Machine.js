

module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('Machines', 'data11', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
    
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('Machines', 'data11'),
     
    ]),
  };
  
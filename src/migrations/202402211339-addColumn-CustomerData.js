module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('CustomerData', 'MachineType', {
        type: Sequelize.STRING,
        defaultValue: null,
      })

    
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('CustomerData', 'MachineType'),
     
    ]),
  };
  
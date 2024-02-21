module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('CustomerInfo', 'MachineType', {
        type: Sequelize.STRING,
        defaultValue: null,
      })

    
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('CustomerInfo', 'MachineType'),
     
    ]),
  };
  
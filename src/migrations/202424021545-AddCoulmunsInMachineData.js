module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('MachineData', 'Load', {
        type: Sequelize.INTEGER,
        defaultValue: null,
      }),

      queryInterface.addColumn('MachineData', 'RunningTime', {
        type: Sequelize.INTEGER,
        defaultValue: null,
      }),

      queryInterface.addColumn('MachineData', 'RunningTimeError', {
        type: Sequelize.INTEGER,
        defaultValue: null,
      }),

    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('MachineData', 'clientName'),
      queryInterface.removeColumn('MachineData', 'superAdmin'),
    ]),
  };
  
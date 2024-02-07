

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('MachineData', 'sim_number', {
      type: Sequelize.STRING,
      defaultValue: null,
    }),
    queryInterface.addColumn('MachineData', 'rssi', {
      type: Sequelize.STRING,
      defaultValue: null,
    }),
    queryInterface.addColumn('MachineData', 'reset_ts', {
      type: Sequelize.STRING,
      defaultValue: null,
    }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('MachineData', 'sim_number'),
    queryInterface.removeColumn('MachineData', 'rssi'),
    queryInterface.removeColumn('MachineData', 'reset_ts'),
  ]),
};

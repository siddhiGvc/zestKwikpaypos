

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('MachineData', 'burn_status', {
      type: Sequelize.INTEGER,
      defaultValue: null,
    }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('MachineData', 'burn_status'),
  ]),
};



module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Machines', 'data9', {
      type: Sequelize.DATE,
      defaultValue: null,
    }),
    queryInterface.addColumn('Machines', 'data10', {
      type: Sequelize.DATE,
      defaultValue: null,
    }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Machines', 'data9'),
    queryInterface.removeColumn('Machines', 'data10'),
  ]),
};

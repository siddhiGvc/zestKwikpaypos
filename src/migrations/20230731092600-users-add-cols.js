

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('Users', 'city', {
      type: Sequelize.STRING,
      defaultValue: null,
    }),
    queryInterface.addColumn('Users', 'zone', {
      type: Sequelize.STRING,
      defaultValue: null,
    }),
    queryInterface.addColumn('Users', 'ward', {
      type: Sequelize.STRING,
      defaultValue: null,
    }),
    queryInterface.addColumn('Users', 'beat', {
      type: Sequelize.STRING,
      defaultValue: null,
    }),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('Users', 'city'),
    queryInterface.removeColumn('Users', 'zone'),
    queryInterface.removeColumn('Users', 'ward'),
    queryInterface.removeColumn('Users', 'beat'),
  ]),
};

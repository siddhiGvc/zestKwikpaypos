module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('Users', 'clientName', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),

      queryInterface.addColumn('Users', 'superAdmin', {
        type: Sequelize.BOOLEAN,
        defaultValue: null,
      }),

    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('Users', 'clientName'),
      queryInterface.removeColumn('Users', 'superAdmin'),
    ]),
  };
  
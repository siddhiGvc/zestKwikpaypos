

module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
        queryInterface.changeColumn('Transactions', 'p1', {
          type: Sequelize.STRING,
          defaultValue: null,
        }),
        queryInterface.changeColumn('Transactions', 'p2', {
          type: Sequelize.STRING,
          defaultValue: null,
        }),
        queryInterface.changeColumn('Transactions', 'p3', {
          type: Sequelize.STRING,
          defaultValue: null,
        }),
        queryInterface.changeColumn('Transactions', 'p4', {
          type: Sequelize.STRING,
          defaultValue: null,
        }),
        queryInterface.changeColumn('Transactions', 'p5', {
          type: Sequelize.STRING,
          defaultValue: null,
        }),
        queryInterface.changeColumn('Transactions', 'p6', {
          type: Sequelize.STRING,
          defaultValue: null,
        }),
        queryInterface.addColumn('Transactions', 'p7', {
          type: Sequelize.STRING,
          defaultValue: null,
        }),
        queryInterface.addColumn('Transactions', 'p8', {
          type: Sequelize.STRING,
          defaultValue: null,
        }),
        queryInterface.addColumn('Transactions', 'p9', {
          type: Sequelize.STRING,
          defaultValue: null,
        }),
        queryInterface.addColumn('Transactions', 'p10', {
          type: Sequelize.STRING,
          defaultValue: null,
        }),
        queryInterface.addColumn('Transactions', 'p11', {
          type: Sequelize.STRING,
          defaultValue: null,
        }),
        queryInterface.addColumn('Transactions', 'p12', {
          type: Sequelize.STRING,
          defaultValue: null,
        }),
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
        queryInterface.changeColumn('Transactions', 'p1', {
          type: Sequelize.INTEGER,
          defaultValue: null,
        }),
        queryInterface.changeColumn('Transactions', 'p2', {
          type: Sequelize.INTEGER,
          defaultValue: null,
        }),
        queryInterface.changeColumn('Transactions', 'p3', {
          type: Sequelize.INTEGER,
          defaultValue: null,
        }),
        queryInterface.changeColumn('Transactions', 'p4', {
          type: Sequelize.INTEGER,
          defaultValue: null,
        }),
        queryInterface.changeColumn('Transactions', 'p5', {
          type: Sequelize.INTEGER,
          defaultValue: null,
        }),
        queryInterface.changeColumn('Transactions', 'p6', {
          type: Sequelize.INTEGER,
          defaultValue: null,
        }),
        queryInterface.removeColumn('Transactions', 'p7'),
        queryInterface.removeColumn('Transactions', 'p8'),
        queryInterface.removeColumn('Transactions', 'p9'),
        queryInterface.removeColumn('Transactions', 'p10'),
        queryInterface.removeColumn('Transactions', 'p11'),
        queryInterface.removeColumn('Transactions', 'p12'),
    ]),
  };
  
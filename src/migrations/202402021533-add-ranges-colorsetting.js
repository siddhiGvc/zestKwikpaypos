module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('colorSettings', 'Range1', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('colorSettings', 'Range2', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('colorSettings', 'Range3', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('colorSettings', 'Range4', {
        type: Sequelize.STRING,
        defaultValue: null,
      })
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('colorSettings', 'Range1'),
      queryInterface.removeColumn('colorSettings', 'Range2'),
      queryInterface.removeColumn('colorSettings', 'Range3'),
      queryInterface.removeColumn('colorSettings', 'Range4'),
      
    ]),
  };
  
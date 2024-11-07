module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('Users', 'WaterSerialNumber', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('Users', 'UniqueCode', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('Users', 'WaterSerialNumber'),
      queryInterface.removeColumn('Users', 'UniqueCode'),
      
    ]),
  };
  
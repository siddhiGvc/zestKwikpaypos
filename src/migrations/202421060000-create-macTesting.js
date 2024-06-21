

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Testing', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      device_number: {
       
        type: Sequelize.INTEGER,
      },
      command:{
        type: Sequelize.STRING,
      },
      expected_output:{
        type: Sequelize.STRING,
      },
      actual_outtput:{
        type: Sequelize.STRING,
      },
      result:{
        type: Sequelize.STRING,
      },
      time_gap:{
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Testing'),
  };
  
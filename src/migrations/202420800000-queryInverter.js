

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('InverterStaus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Junction: {
      
        type: Sequelize.STRING,
      },
      ACV:{
        type: Sequelize.STRING,
      },
      ACI:{
        type: Sequelize.STRING,
      },
      DCV:{
        type: Sequelize.STRING,
      },
      DCI:{
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('InverterStaus'),
  };
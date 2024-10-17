

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('UnilineCustomerData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      CustomerName: {
     
        defaultValue: null,
        type: Sequelize.STRING,
      },
      CInfo1: {
     
        defaultValue: null,
        type: Sequelize.STRING,
      },
      CInfo2: {
     
        defaultValue: null,
        type: Sequelize.STRING,
      },
      CInfo3: {
     
        defaultValue: null,
        type: Sequelize.STRING,
      },
      CInfo4: {
     
        defaultValue: null,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('UnilineCustomerData'),
  };
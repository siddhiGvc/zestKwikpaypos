

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('UnilineCustomerInfo', {
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
      City: {
     
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('UnilineCustomerInfo'),
  };


module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('totalInventory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserName: {
     
        defaultValue: null,
        type: Sequelize.STRING,
      },
      TotalQty: {
     
        defaultValue: null,
        type: Sequelize.INTEGER,
      },
      TotalCash: {
       
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('totalInventory'),
  };
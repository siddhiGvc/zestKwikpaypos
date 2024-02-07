

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('InventoryTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      From: {
     
        defaultValue: null,
        type: Sequelize.STRING,
      },
      To: {
     
        defaultValue: null,
        type: Sequelize.STRING,
      },
      QtyDelivered: {
       
        defaultValue: null,
        type: Sequelize.STRING,
      },
      CashReceived: {
       
        defaultValue: null,
        type: Sequelize.STRING,
      },
      Remark: {
       
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('InventoryTransactions'),
  };
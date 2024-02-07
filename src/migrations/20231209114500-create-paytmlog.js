

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('PaytmPayments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mid: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      amt: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      custID: {
        type: Sequelize.STRING,
      },
      orderID: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      mobNumber: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      txnID: {
        type: Sequelize.STRING,
        defaultValue: false,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('PaytmPayments'),
  };
  
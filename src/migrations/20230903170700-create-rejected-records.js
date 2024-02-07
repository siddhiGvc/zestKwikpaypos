

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('RejectedRecords', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    machineId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    qtyOld: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    qtyNew: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    cashOld: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    cashNew: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('RejectedRecords'),
};



module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('DailySummary', {
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
    logDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    doorCurrent: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    doorLife: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    qtyCurrent: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    qtyLife: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    burnCycleCurrent: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    burnCycleLife: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    cashCurrent: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    cashLife: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    onMinutes: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('DailySummary'),
};

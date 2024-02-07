

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('SSNReport', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    machineID: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    newMachineID: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    dailyCount:{
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: false,
    },
    totalCount:{
      allowNull: false,
      type: Sequelize.INTEGER,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('SSNReport'),
};
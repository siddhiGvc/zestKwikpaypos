
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('simulatedvendinglogs', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userName: {
      allowNull: false,
      type: Sequelize.STRING
    },
    simulatedQty: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    simulatedCycles: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    Zones: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING
    },
    Wards: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING
    },
    Beats: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('simulatedvendinglogs'),
};



module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('colorSettings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Primary: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING,
      },
      Secondary: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING,
      },
      Tertiary: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING,
      },
      Faulty: {
        allowNull: false,
        defaultValue: 0,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('colorSettings'),
  };
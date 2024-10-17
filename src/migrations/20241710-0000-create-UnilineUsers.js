

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('UnilineUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      City: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      Zone: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      Ward: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      Beat: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      clientName: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      superAdmin: {
        type: Sequelize.STRING,
        defaultValue: null,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('UnilineUsers'),
  };
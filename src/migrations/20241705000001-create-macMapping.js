

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('MacMapping', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UID: {
        
        type: Sequelize.STRING,
      },

      MacID: {
        
        type: Sequelize.STRING,
      },
      Location: {
        
        type: Sequelize.STRING,
      },
      City: {
        
        type: Sequelize.STRING,
      },
      SocketNumber: {
        
        type: Sequelize.STRING,
      },
    
      V1: {
        type: Sequelize.STRING,
      },
      V2: {
        type: Sequelize.STRING,
      },
      V3: {
        type: Sequelize.STRING,
      },
      V4: {
        type: Sequelize.STRING,
      },
      V5: {
        type: Sequelize.STRING,
      },
      V6: {
        type: Sequelize.STRING,
      },
      V7: {
        type: Sequelize.STRING,
      },
      C1: {
        type: Sequelize.STRING,
      },
      C2: {
        type: Sequelize.STRING,
      },
      C3: {
        type: Sequelize.STRING,
      },
      C4: {
        type: Sequelize.STRING,
      },
      C5: {
        type: Sequelize.STRING,
      },
      C6: {
        type: Sequelize.STRING,
      },
      C7: {
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('MacMapping'),
  };
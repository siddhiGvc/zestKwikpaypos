

module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('amazonRefunds', 'amazonRefundId', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
    
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('amazonRefunds', 'amazonRefundId'),
     
    ]),
  };
  


module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
       
      queryInterface.addColumn('amazonRefunds', 'merchantId', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('amazonRefunds', 'storeId', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('amazonRefunds', 'amount', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      
      queryInterface.addColumn('amazonRefunds', 'refundType', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      
    
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
     
      queryInterface.removeColumn('amazonRefunds', 'merchantId'),
      queryInterface.removeColumn('amazonRefunds', 'storeId'),
      queryInterface.removeColumn('amazonRefunds', 'amount'),
      queryInterface.removeColumn('amazonRefunds', 'refundType'),
     
    ]),
  };
  
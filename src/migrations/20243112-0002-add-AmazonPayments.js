

module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('AmazonPayments', 'txnType', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
      queryInterface.addColumn('AmazonPayments', 'deviceId', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
    
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('AmazonPayments', 'txnType'),
      queryInterface.removeColumn('AmazonPayments', 'deviceId'),
     
    ]),
  };
  
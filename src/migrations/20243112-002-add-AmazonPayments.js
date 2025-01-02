

module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('AmazonPayments', 'txnStatus', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
    
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('AmazonPayments', 'txnStatus'),
     
    ]),
  };
  
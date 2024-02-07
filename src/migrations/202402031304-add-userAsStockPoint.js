module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('Users', 'userAsStockPoint', {
        type: Sequelize.BOOLEAN,
        defaultValue: null,
      })

    

    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('Users', 'userAsStockPoint'),
     
    ]),
  };
module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
      queryInterface.addColumn('MacMapping', 'SSIDmessage', {
        type: Sequelize.STRING,
        defaultValue: null,
      }),
   
      
    ]),
  
    down: (queryInterface, Sequelize) => Promise.all([
      queryInterface.removeColumn('MacMapping', 'SSIDmessage'),
   
      
    ]),
  };
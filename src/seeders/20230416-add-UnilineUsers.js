

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'UnilineUsers',
    [
      {
        name: 'Admin',
        email: 'info@alphadigitall.com',
        password: "6ae88e182487d827a8e450feb106ba27", //Passw0rd@123
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'UnilineUser',
        email: 'user@gmail.com',
        password: "f925916e2754e5e03f75dd58a5733251", //Test@123
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('UnilineUsers', null, {}),
};

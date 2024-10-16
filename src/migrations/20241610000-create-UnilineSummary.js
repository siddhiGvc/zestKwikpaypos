const view_name = 'Uniline_summary';
const query_str = `
SELECT 
  d.*, 
  CASE 
    WHEN TIME_TO_SEC(TIMEDIFF(UTC_TIMESTAMP(), d.lastHeartBeatTime)) / 60 < 1 THEN 'Online' 
    ELSE 'Offline' 
  END AS device_status
FROM UnilineMacMapping d
`;

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.sequelize.query(`CREATE VIEW ${view_name} AS ${query_str}`),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.sequelize.query(`DROP VIEW ${view_name}`),
  ]),
};



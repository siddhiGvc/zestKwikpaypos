const view_name = 'Uniline_summary';
const query_str = `
SELECT 
  d.*, 
  CASE 
    WHEN TIME_TO_SEC(TIMEDIFF(UTC_TIMESTAMP(), d.lastHeartBeatTime)) / 60 < 1 THEN 'Online' 
    ELSE 'Offline' 
  END AS device_status,
  CASE 
    WHEN SUBSTRING(SUBSTRING_INDEX(d.G2, ',', 1), 7, 1) = '0' THEN 'Online' 
    ELSE 'Offline' 
  END AS inverter_status,
  CASE 
    WHEN SUBSTRING(SUBSTRING_INDEX(d.G2, ',', 1), 5, 1) = '1' THEN 'Low' 
    WHEN SUBSTRING(SUBSTRING_INDEX(d.G2, ',', 1), 4, 1) = '1' THEN 'Shut Down'
    ELSE 'Okay' 
  END AS battery_status
FROM UnilineMacMapping d
`;

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    // Drop the view if it already exists
    queryInterface.sequelize.query(`DROP VIEW IF EXISTS ${view_name}`),
    // Create the updated view
    queryInterface.sequelize.query(`CREATE VIEW ${view_name} AS ${query_str}`),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    // Drop the view on rollback
    queryInterface.sequelize.query(`DROP VIEW IF EXISTS ${view_name}`),
  ]),
};


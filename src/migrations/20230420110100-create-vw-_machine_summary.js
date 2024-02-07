const view_name = 'vw_machine_summary';
const query_str = `
select a.*, b.serial, b.uid, b.zone, b.ward, b.beat, b.address, b.lat, b.lon,
  CASE WHEN TIME_TO_SEC(TIMEDIFF(UTC_TIMESTAMP(), a.lastHeartbeatTime)) / 60 < 5 THEN 'Online' ELSE 'Offline' END 'machine_status'
from MachineData a
  join Machines b on a.machineId = b.id
where a.status = 1
`

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.sequelize.query(`CREATE VIEW ${view_name} AS ${query_str}`),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.sequelize.query(`DROP VIEW ${view_name}`),
  ]),
};

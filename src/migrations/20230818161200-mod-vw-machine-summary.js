const view_name = 'vw_machine_summary';
const query_str_old = `
select a.*, b.serial, b.uid, b.zone, b.ward, b.beat, b.address, b.lat, b.lon,
  CASE WHEN TIME_TO_SEC(TIMEDIFF(UTC_TIMESTAMP(), a.lastHeartbeatTime)) / 60 < 5 THEN 'Online' ELSE 'Offline' END 'machine_status'
from MachineData a
  join Machines b on a.machineId = b.id
where a.status = 1
`
const query_str_new = `
select a.id, a.machineId, a.heater_A_On, a.heater_A_Temp, a.heater_B_On, a.heater_B_Temp, a.doorCurrent, a.doorLife, a.qtyCurrent, 
	a.qtyLife, a.burnCycleCurrent, a.burnCycleLife, 
    case when a.cashCurrent > (a.qtyCurrent * 10) + 50 or a.cashCurrent < (a.qtyCurrent * 10) - 50 then a.qtyCurrent * 10 else a.cashCurrent end 'cashCurrent',
    case when a.cashLife > (a.qtylife * 10) + 50 or a.cashLife < (a.qtylife * 10) - 50 then a.qtylife * 10 else a.cashLife end 'cashLife',
    a.lastOnTime, a.lastHeartbeatTime, a.status, 
    a.last_status, a.status_type, a.spiral_a_status, a.spiral_b_status, a.createdAt, a.updatedAt, a.burn_status, a.sim_number, 
    a.rssi, a.reset_ts, b.serial, b.uid, b.zone, b.ward, b.beat, b.address, b.lat, b.lon,
  CASE WHEN TIME_TO_SEC(TIMEDIFF(UTC_TIMESTAMP(), a.lastHeartbeatTime)) / 60 < 5 THEN 'Online' ELSE 'Offline' END 'machine_status'
from MachineData a
  join Machines b on a.machineId = b.id
where a.status = 1
`

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.sequelize.query(`ALTER VIEW ${view_name} AS ${query_str_new}`),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.sequelize.query(`ALTER VIEW ${view_name} AS ${query_str_old}`),
  ]),
};

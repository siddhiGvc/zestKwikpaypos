import { sequelize, MachineData, Machine, Transaction, DailySummary , hourlyReport} from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';
//import hourlyReport from '../../models/hourlyReport';
const { Op } = require("sequelize");
const moment = require('moment');

export const get = async (req, res) => {
  try {
    const obj = await Machine.findAll();
    return successResponse(req, res, obj);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getData = async (req, res) => {
  try {
    var replObjG = {};
    if (req.query.city) replObjG['city'] = req.query.city.split(',');
    if (req.query.zone) replObjG['zone'] = req.query.zone.split(',');
    if (req.query.ward) replObjG['ward'] = req.query.ward.split(',');
    if (req.query.beat) replObjG['beat'] = req.query.beat.split(',');

    if (!req.user.isAdmin && replObjG['city'] && req.user.city)
      replObjG['city'] = replObjG['city'].filter(q => req.user.city.split(',').indexOf(q) >= 0);
    else if (!req.user.isAdmin && !replObjG['city'] && req.user.city)
      replObjG['city'] = req.user.city.split(',');
    if (!req.user.isAdmin && replObjG['zone'] && req.user.zone)
      replObjG['zone'] = replObjG['zone'].filter(q => req.user.zone.split(',').indexOf(q) >= 0);
    else if (!req.user.isAdmin && !replObjG['zone'] && req.user.zone)
      replObjG['zone'] = req.user.zone.split(',');
    if (!req.user.isAdmin && replObjG['ward'] && req.user.ward)
      replObjG['ward'] = replObjG['ward'].filter(q => req.user.ward.split(',').indexOf(q) >= 0);
    else if (!req.user.isAdmin && !replObjG['ward'] && req.user.ward)
      replObjG['ward'] = req.user.ward.split(',');
    if (!req.user.isAdmin && replObjG['beat'] && req.user.beat)
      replObjG['beat'] = replObjG['beat'].filter(q => req.user.beat.split(',').indexOf(q) >= 0);
    else if (!req.user.isAdmin && !replObjG['beat'] && req.user.beat)
      replObjG['beat'] = req.user.beat.split(',');

    var replObj = { machine_status: req.query.status.split(',') };
    if (req.query.stock_status) replObj['stock_status'] = req.query.stock_status.split(',');
    if (req.query.burn_status) replObj['burn_status'] = req.query.burn_status.split(',');
    const [objAll, _metadata] = await sequelize.query(`
      select a.* from vw_machine_summary a
      left join Machines b on a.machineId = b.id
      where 1 = 1
      ${replObjG.city ? ` and b.data1 in (:city)` : ''}
      ${replObjG.zone ? ` and b.zone in (:zone)` : ''}
      ${replObjG.ward ? ` and b.ward in (:ward)` : ''}
      ${replObjG.beat ? ` and b.beat in (:beat)` : ''}
    `, { replacements: replObjG });
    const [obj, metadata] = await sequelize.query(`
      select a.* from vw_machine_summary a
      left join Machines b on a.machineId = b.id
      where a.machine_status in (:machine_status)
      ${replObj.stock_status ? ` and COALESCE(a.spiral_a_status, 0) in (:stock_status)` : ''}
      ${replObj.burn_status ? ` and COALESCE(a.burn_status, 0) in (:burn_status)` : ''}
      ${replObjG.city ? ` and b.data1 in (:city)` : ''}
      ${replObjG.zone ? ` and b.zone in (:zone)` : ''}
      ${replObjG.ward ? ` and b.ward in (:ward)` : ''}
      ${replObjG.beat ? ` and b.beat in (:beat)` : ''}
  `, { replacements: Object.assign(replObj, replObjG) });
    return successResponse(req, res, { data: obj, dataAll: objAll });
  } catch (error) {
    console.log(error)
    return errorResponse(req, res, error.message);
  }
};

export const lastBurningStart = async (req, res) => {
  try {
    var machineId = req.query.machineId;
    const [obj, metadata] = await sequelize.query(`
      select * from Transactions 
      where command = 'BST' 
      and machine = :machineId
      order by createdAt desc
      limit 1;
  `, {
      replacements: {
        machineId: machineId
      },
    });
    if (!obj.length) throw "Unable to find entry";
    return successResponse(req, res, obj[0]);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getZones = async (req, res) => {
  try {
    const [obj, metadata] = await sequelize.query(`
      select distinct zone from Machines where data1 in (:city) order by zone;
    `, {
      replacements: {
        city: req.query.city.split(',')
      },
    });
    var respObj = obj.map(q => q.zone);
    if (!req.user.isAdmin && req.user.zone)
      respObj = respObj.filter(q => req.user.zone.split(',').indexOf(q) >= 0)
    return successResponse(req, res, respObj);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getWards = async (req, res) => {
  try {
    const [obj, metadata] = await sequelize.query(`
      select distinct ward from Machines where data1 in (:city) and zone in (:zone) order by ward;
    `, {
      replacements: {
        city: req.query.city.split(','),
        zone: req.query.zone.split(','),
      },
    });
    var respObj = obj.map(q => q.ward);
    if (!req.user.isAdmin && req.user.ward)
      respObj = respObj.filter(q => req.user.ward.split(',').indexOf(q) >= 0)
    return successResponse(req, res, respObj);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getBeats = async (req, res) => {
  try {
    const [obj, metadata] = await sequelize.query(`
      select distinct beat from Machines where data1 in (:city) and zone in (:zone) and ward in (:ward) order by beat;
    `, {
      replacements: {
        city: req.query.city.split(','),
        zone: req.query.zone.split(','),
        ward: req.query.ward.split(','),
      },
    });
    return successResponse(req, res, obj.map(q => q.beat));
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getMachines = async (req, res) => {
  try {
    const [obj, metadata] = await sequelize.query(`
      select distinct uid,serial from Machines where data1 in (:city) and zone in (:zone) and ward in (:ward) and beat in (:beat) order by uid;
    `, {
      replacements: {
        city: req.query.city.split(','),
        zone: req.query.zone.split(','),
        ward: req.query.ward.split(','),
        beat: req.query.beat.split(','),
      },
    });
    return successResponse(req, res, obj.map(q => { return { label: q.uid + ' (' + q.serial + ')', value: q.serial } }));
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

// export const report = async (req, res) => {
//   try {
//     if (!req.body.startDate) return errorResponse(req, res, "Start Date is required");
//     if (!req.body.endDate) return errorResponse(req, res, "End Date is required");
//     var filterObj = { where: {} };
//     if (req.body.city) filterObj.where.data1 = { [Op.in]: req.body.city.split(',') };
//     const cityCount = (await Machine.findAll(filterObj)).length;
//     if (req.body.zone) filterObj.where.zone = { [Op.in]: req.body.zone.split(',') };
//     const zoneCount = (await Machine.findAll(filterObj)).length;
//     if (req.body.ward) filterObj.where.ward = { [Op.in]: req.body.ward.split(',') };
//     const wardCount = (await Machine.findAll(filterObj)).length;
//     if (req.body.beat) filterObj.where.beat = { [Op.in]: req.body.beat.split(',') };
//     const beatCount = (await Machine.findAll(filterObj)).length;
//     if (req.body.serial) filterObj.where.serial = { [Op.in]: req.body.serial.split(',') };
//     const serialCount = (await Machine.findAll(filterObj)).length;
//     var machines = await Machine.findAll(filterObj);
//     var transactions = await Transaction.findAll({
//       where: {
//         command: 'SUM',
//         machine: { [Op.in]: machines.map(q => q.serial) },
//         createdAt: { [Op.between]: [req.body.startDate, moment(req.body.endDate).add(1, 'day')] }
//       }
//     });
//     machines = JSON.parse(JSON.stringify(machines));
//     transactions = JSON.parse(JSON.stringify(transactions));
//     machines.forEach(m => {
//       m.summary = {};
//       for (var dt = moment(req.body.startDate); dt <= moment(req.body.endDate); dt.add(1, 'day')) {
//         var trns = transactions.filter(q => q.machine == m.serial && moment(q.createdAt).format('DD-MMM-YYYY') == moment(dt).format('DD-MMM-YYYY'));
//         var count = trns.map(q => moment(q.createdAt).format('DD-MMM-YYYY HH:mm')).filter(onlyUnique).length;
//         m.summary[dt.format('DD-MMM-YYYY')] = {
//           cash: (!trns.length ? 0 : trns.map(q => q.p3).reduce((a, b) => a > b ? a : b)) ?? 0,
//           vend: (!trns.length ? 0 : trns.map(q => q.p4).reduce((a, b) => a > b ? a : b)) ?? 0,
//           burn: (!trns.length ? 0 : trns.map(q => q.p5).reduce((a, b) => a > b ? a : b)) ?? 0,
//           door: (!trns.length ? 0 : trns.map(q => q.p6).reduce((a, b) => a > b ? a : b)) ?? 0,
//           onTime: count
//         }
//       }
//     })
//     return successResponse(req, res, { success: true, counts: { city: cityCount, zone: zoneCount, ward: wardCount, beat: beatCount, machines: serialCount }, machines: machines });
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// }


export const report = async (req, res) => {
  try {
  
    if (!req.body.startDate) return errorResponse(req, res, "Start Date is required");
    if (!req.body.endDate) return errorResponse(req, res, "End Date is required");
    var filterObj = { where: {} };
    if (req.body.city) filterObj.where.data1 = { [Op.in]: req.body.city.split(',') };
    const cityCount = (await Machine.findAll(filterObj)).length;
    if (req.body.zone) filterObj.where.zone = { [Op.in]: req.body.zone.split(',') };
    const zoneCount = (await Machine.findAll(filterObj)).length;
    if (req.body.ward) filterObj.where.ward = { [Op.in]: req.body.ward.split(',') };
    const wardCount = (await Machine.findAll(filterObj)).length;
    if (req.body.beat) filterObj.where.beat = { [Op.in]: req.body.beat.split(',') };
    const beatCount = (await Machine.findAll(filterObj)).length;
    if (req.body.serial) filterObj.where.serial = { [Op.in]: req.body.serial.split(',') };
    const serialCount = (await Machine.findAll(filterObj)).length;
    var machines = await Machine.findAll(filterObj);
    var summaries = await DailySummary.findAll({
      where: {
        machineId: { [Op.in]: machines.map(q => q.id) },
        logDate: { [Op.between]: [req.body.startDate, moment(req.body.endDate).add(1, 'day')] }
      }
    });
    // console.log(summaries);
    machines = JSON.parse(JSON.stringify(machines));
    summaries = JSON.parse(JSON.stringify(summaries));
    machines.forEach(m => {
      m.summary = {};
      for (var dt = moment(req.body.startDate); dt <= moment(req.body.endDate); dt.add(1, 'day')) {
        var smr = summaries.filter(q => q.machineId == m.id && moment(q.logDate).format('DD-MMM-YYYY') == moment(dt).format('DD-MMM-YYYY'))[0];
        var zero = (smr?.onMinutes ?? 0) == 0;
        m.summary[dt.format('DD-MMM-YYYY')] = {
          cash: zero ? 0 : ((smr?.cashCurrent ?? 0) < 0 ? 0 : (smr?.cashCurrent ?? 0)),
          vend: zero ? 0 : ((smr?.qtyCurrent ?? 0) < 0 ? 0 : (smr?.qtyCurrent ?? 0)),
          burn: zero ? 0 : ((smr?.burnCycleCurrent ?? 0) < 0 ? 0 : (smr?.burnCycleCurrent ?? 0)),
          door: zero ? 0 : ((smr?.doorCurrent ?? 0) < 0 ? 0 : (smr?.doorCurrent ?? 0)),
          onTime: smr?.onMinutes ?? 0,
        }
      }
    })
    // console.log(cityCount);
    res.status(200).json({data:{ success: true, counts: { city: cityCount, zone: zoneCount, ward: wardCount, beat: beatCount, machines: serialCount }, machines: machines }});
  } catch (error) {
    console.log(error);

    return errorResponse(req, res, error.message);
  }
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}


export const updateHourlyTable = async () => {
  try{
  console.log("Table Updation in Progress");

  // get all wards
  const [AllWardNames] = await sequelize.query(`
  select distinct Machines.ward ,  count (*)
  from Machines  
  inner join MachineData  
  on Machines.serial = MachineData.id
  where Machines.data1 = "Mumbai"
  group by Machines.ward;
  `);
  // console.log ("*************ALL WARD NAMES+Total Machines");
  //console.log(AllWardNames);

const [CountOnLine] = await sequelize.query(`
select distinct a.ward, count(machine_status) from vw_machine_summary a
left join Machines b on a.machineId = b.id
where a.machine_status ="Online" group by ward;      
`);

const [XYZ] = await sequelize.query(`
select a.ward, a.machineId from vw_machine_summary a
left join Machines b on a.machineId = b.id
where a.machine_status ="Online" and a.ward = "I" ;      
`);

// console.log ("*************ALL WARD NAMES + Online Count");
//  console.log(CountOnLine);   
//  console.log (XYZ);

  // get total of cash,qty, burning cycles for each ward
  const [objAll] = await sequelize.query(`
  select sum(a.qtyCurrent+a.qtyLife),
  sum(a.cashCurrent+cashLife),
  sum(a.burnCycleCurrent+burnCycleLife),
  b.ward,count(*) from vw_machine_summary a
  left join Machines b on a.machineId = b.id
  where b.data1="Mumbai" group by b.ward`);

  // console.log(objAll);

  for (const index in AllWardNames)
  {
  //  console.log(index.ward);
    const [EmptyStock] = await sequelize.query(`
    select count (*) 
    from vw_machine_summary a
    inner join Machines b on a.machineId = b.id
    where b.data1 = "Mumbai" and a.ward ='${AllWardNames[index].ward}'
    and a.spiral_a_status = 0;
    `);

    // console.log(EmptyStock);

    const [LowStock] = await sequelize.query(`
    select count (*)  
    from vw_machine_summary a
    inner join Machines b on a.machineId = b.id
    where b.data1 = "Mumbai" and a.ward ='${AllWardNames[index].ward}'
    and a.spiral_a_status = '1';
    `);

    const [ZoneForWard] = await sequelize.query(`
    select zone,ward  from Machines 
    where data1 = "Mumbai" 
    and ward = '${AllWardNames[index].ward}'
    limit 1 ;
    `);

  //  console.log(ZoneForWard);

    // console.log(LowStock);   

    //    where Machines.data1 = "Mumbai" and Machines.ward ='${AllWardNames[index].ward}'
    // create one record of each ward and console.log
    // and then write

    
  const DataWardSummary = {
    ward: AllWardNames[index].ward,
    machinesTotal : parseInt(AllWardNames[index]['count (*)']),
    machineOnline : parseInt(CountOnLine[index]['count(machine_status)']),
    qtySales : parseInt(objAll[index]['sum(a.qtyCurrent+a.qtyLife)']),
    cashSales : parseInt(objAll[index]['sum(a.cashCurrent+cashLife)']),
    burningSales : parseInt(objAll[index]['sum(a.burnCycleCurrent+burnCycleLife)']),  
    machineLowStock : parseInt(LowStock[0]['count (*)']),
    machineEmpty : parseInt(EmptyStock[0]['count (*)']),
    zone : ZoneForWard[0].zone
  };

  
  const hourlyReportLog = await hourlyReport.create({
    ward:DataWardSummary.ward,
    machinesTotal : DataWardSummary.machinesTotal,
    machineOnline : DataWardSummary.machineOnline,
    qtySales : DataWardSummary.qtySales,
    cashSales : DataWardSummary.cashSales,
    burningSales : DataWardSummary.burningSales,
    machineLowStock : DataWardSummary.machineLowStock,
    machineEmpty : DataWardSummary.machineEmpty,
    onTime:0,
    zone :DataWardSummary.zone
  });



//   console.log (DataWardSummary);
  }  
}
catch(err)
{
  console.log("hourly report update error");
  console.log(err);
}

}


export const CalcDailySummary = async () => {
  var dt = moment().format('YYYY-MM-DD');
  var now = moment();
  var machineDatas = await MachineData.findAll({ where: { status: 1 } });
  var machines = await Machine.findAll({ where: { id: { [Op.in]: machineDatas.map(q => q.machineId) } } });
  
    
  var transactions = await Transaction.findAll({
    where: {
      command: 'SUM',
      machine: { [Op.in]: machines.map(q => q.serial) },
      createdAt: { [Op.between]: [now.add(-24, 'hour'), moment(dt).add(1, 'day')] }
    }
  });
  console.log(machineDatas.length);
  console.log(machines.length);
  console.log(transactions.length);

  
  machines = JSON.parse(JSON.stringify(machines));
  machineDatas = JSON.parse(JSON.stringify(machineDatas));
  transactions = JSON.parse(JSON.stringify(transactions));
  var list = []
  for (var i = 0; i < machineDatas.length; i++) {
    try {
      var m = machineDatas[i];
      var mc = machines.filter(q => q.id == m.machineId)[0]
      if (!mc) { console.log(m.id + ' not found'); continue; }
      var trns = transactions.filter(q => q.machine == mc.serial && moment(q.createdAt) > now.add(-24, 'hour'));
      if (!trns || !trns.length) { console.log(m.id + ' does not have any transactions'); }
      var count = 0;
      try {
        count = trns.map(q => moment(q.createdAt).format('DD-MMM-YYYY HH:mm')).filter(onlyUnique).length;
      } catch (ex) {
        console.log(m.id + ' count issue');
      }

      // Fix for amount mismatch from machine
      if (m.cashCurrent > ((m.qtyCurrent * 10) + 50) || m.cashCurrent < ((m.qtyCurrent * 10) - 50))
        m.cashCurrent = m.qtyCurrent * 10;
      if (m.cashLife > ((m.qtyLife * 10) + 50) || m.cashLife < ((m.qtyLife * 10) - 50))
        m.cashLife = m.qtyLife * 10;
      // Fix end

      var obj = {
        machineId: m.machineId,
        logDate: dt,
        doorCurrent: m.doorCurrent + m.doorLife,
        doorLife: m.doorCurrent + m.doorLife,
        qtyCurrent: m.qtyCurrent + m.qtyLife,
        qtyLife: m.qtyCurrent + m.qtyLife,
        burnCycleCurrent: m.burnCycleCurrent + m.burnCycleLife,
        burnCycleLife: m.burnCycleCurrent + m.burnCycleLife,
        cashCurrent: m.cashCurrent + m.cashLife,
        cashLife: m.cashCurrent + m.cashLife,
        onMinutes: count,
      };
      var objOld = await DailySummary.findOne({
        where: { machineId: m.machineId },
        order: [['logDate', 'DESC']]
      });

      if (objOld) {
        obj.doorCurrent -= objOld.doorLife;
        obj.burnCycleCurrent -= objOld.burnCycleLife;
        obj.qtyCurrent -= objOld.qtyLife;
        obj.cashCurrent -= objOld.cashLife;
      }

      list.push(obj);
      await DailySummary.create(obj);
    }
    catch (ex) {
      console.log('Exception in Daily Summary:\n');
      console.log(ex);
    }
  }
  return list;
}

export const ArchiveTransactions = async () => {
  try {
    await sequelize.query(`
      insert into TransactionHistory 
      select * from Transactions 
      where createdAt < adddate(date(NOW()), INTERVAL -7 DAY)
    `);
    await sequelize.query(`delete from Transactions where createdAt < adddate(date(NOW()), INTERVAL -7 DAY)`)
  } catch (ex) {
    console.log('An error occurred while archiving transactions')
  }
}


// export const CalcDaySummary = async (dt) => {
//   var machineDatas = await MachineData.findAll({ where: { status: 1 } });
//   var machines = await Machine.findAll({ where: { id: { [Op.in]: machineDatas.map(q => q.machineId) } } });
//   var transactions = await Transaction.findAll({
//     where: {
//       command: 'SUM',
//       machine: { [Op.in]: machines.map(q => q.serial) },
//       createdAt: { [Op.between]: [moment(dt), moment(dt).add(1, 'day')] }
//     }
//   });
//   machines = JSON.parse(JSON.stringify(machines));
//   machineDatas = JSON.parse(JSON.stringify(machineDatas));
//   transactions = JSON.parse(JSON.stringify(transactions));
//   var list = []
//   for (var i = 0; i < machineDatas.length; i++) {
//     var m = machineDatas[i];
//     var mc = machines.filter(q => q.id == m.machineId)[0]
//     if (!mc) { console.log(m.id + ' not found'); continue; }
//     var trns = transactions.filter(q => q.machine == mc.serial && moment(q.createdAt).format('DD-MMM-YYYY') == moment(dt).format('DD-MMM-YYYY'));
//     var count = trns.map(q => moment(q.createdAt).format('DD-MMM-YYYY HH:mm')).filter(onlyUnique).length;
//     var lastTrans = trns.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)[0];
//     var obj = {
//       machineId: m.machineId,
//       logDate: dt,
//       doorCurrent: lastTrans?.p6 ?? 0,
//       doorLife: lastTrans?.p6 ?? 0,
//       qtyCurrent: lastTrans?.p4 ?? 0,
//       qtyLife: lastTrans?.p4 ?? 0,
//       burnCycleCurrent: lastTrans?.p5 ?? 0,
//       burnCycleLife: lastTrans?.p5 ?? 0,
//       cashCurrent: lastTrans?.p3 ?? 0,
//       cashLife: lastTrans?.p3 ?? 0,
//       onMinutes: count,
//     };
//     var objOld = await DailySummary.findOne({
//       where: { machineId: m.machineId },
//       order: [['logDate', 'DESC']]
//     });

//     if (objOld) {
//       if (obj.doorLife == 0 && objOld.doorLife > 0) { obj.doorCurrent = objOld.doorLife; obj.doorLife = objOld.doorLife; }
//       if (obj.burnCycleLife == 0 && objOld.burnCycleLife > 0) { obj.burnCycleCurrent = objOld.burnCycleLife; obj.burnCycleLife = objOld.burnCycleLife; }
//       if (obj.qtyLife == 0 && objOld.qtyLife > 0) { obj.qtyCurrent = objOld.qtyLife; obj.qtyLife = objOld.qtyLife; }
//       if (obj.cashLife == 0 && objOld.cashLife > 0) { obj.cashCurrent = objOld.cashLife; obj.cashLife = objOld.cashLife; }
//       if(obj.doorLife < objOld.doorLife) obj.doorLife = obj.doorLife + objOld.doorLife;
//       if(obj.burnCycleLife < objOld.burnCycleLife) obj.burnCycleLife = obj.burnCycleLife + objOld.burnCycleLife;
//       if(obj.qtyLife < objOld.qtyLife) obj.qtyLife = obj.qtyLife + objOld.qtyLife;
//       if(obj.cashLife < objOld.cashLife) obj.cashLife = obj.cashLife + objOld.cashLife;
//       obj.doorCurrent -= objOld.doorLife;
//       obj.burnCycleCurrent -= objOld.burnCycleLife;
//       obj.qtyCurrent -= objOld.qtyLife;
//       obj.cashCurrent -= objOld.cashLife;
//     }
//     list.push(obj);
//     await DailySummary.create(obj);
//   }
//   return list;
// }


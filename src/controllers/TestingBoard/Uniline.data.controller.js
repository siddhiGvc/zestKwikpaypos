import { where } from "sequelize";

const {sequelize,UnilineMacMapping,TestMode,SerialPort,UnilineHourlyReport} =require("../../models")
import { successResponse, errorResponse, uniqueId } from '../../helpers';
var events = require('../../helpers/events')

export const getAllMacAddress=async(req,res)=>{
    try{
    
       
        const obj = await UnilineMacMapping.findAll();
         res.status(200).json({data:obj})

    }
    catch(err){
        console.log(err);
        res.status(505).json({status:505})

    }

}

export const getData = async (req, res) => {
    try {
      // console.log(req.query)
      var replObjG = {};
      if (req.query.city) replObjG['City'] = req.query.city.split(',');
      if (req.query.zone) replObjG['Zone'] = req.query.zone.split(',');
      if (req.query.ward) replObjG['Ward'] = req.query.ward.split(',');
      if (req.query.beat) replObjG['Beat'] = req.query.beat.split(',');
      if (req.query.status) replObjG['device_status'] = req.query.status.split(',');
      if (req.query.inverterStatus) replObjG['inverter_status'] = req.query.inverterStatus.split(',');
      if (req.query.batteryStatus) replObjG['battery_status'] = req.query.batteryStatus.split(',');
    
      const replacements = {};
  
  if (req.query.city) {
    replacements.city = req.query.city.split(',');
  }
  
  if (req.query.zone) {
    replacements.zone = req.query.zone.split(',');
  }
  
  if (req.query.ward) {
    replacements.ward = req.query.ward.split(',');
  }

  if (req.query.beat) {
    replacements.beat = req.query.beat.split(',');
  }
  
  if (req.query.status) {
    replacements.device_status = req.query.status.split(',');
  }
  
  if (req.query.inverterStatus) {
    replacements.inverter_status = req.query.inverterStatus.split(',');
  }

  if (req.query.batteryStatus) {
    replacements.battery_status = req.query.batteryStatus.split(',');
  }
  
  const [objAll, _metadata] = await sequelize.query(`
    SELECT a.*, b.* 
    FROM UnilineMacMapping a
    LEFT JOIN Uniline_summary b ON a.SNoutput = b.SNoutput
    WHERE 1=1
    ${req.query.city ? ` AND a.City IN (:city)` : ''}
    ${req.query.zone ? ` AND a.Zone IN (:zone)` : ''}
    ${req.query.ward ? ` AND a.Ward IN (:ward)` : ''}
     ${req.query.beat ? ` AND a.Beat IN (:beat)` : ''}
  `, { replacements });
  
  const [obj, metadata] = await sequelize.query(`
    SELECT a.*, b.*
    FROM UnilineMacMapping a
    LEFT JOIN Uniline_summary b ON a.SNoutput = b.SNoutput
    WHERE 1=1
    ${replObjG.City ? ` AND b.City IN (:city)` : ''}
    ${replObjG.Zone ? ` AND b.Zone IN (:zone)` : ''}
    ${replObjG.Ward ? ` AND b.Ward IN (:ward)` : ''}
    ${req.query.beat ? ` AND b.Beat IN (:beat)` : ''}
    ${req.query.status ? ` AND b.device_status IN (:device_status)` : ''}
    ${req.query.inverterStatus ? ` AND b.inverter_status IN (:inverter_status)` : ''}
    ${req.query.batteryStatus ? ` AND b.battery_status IN (:battery_status)` : ''}
  
   
  `, { replacements });
      // console.log(obj,objAll)
      return successResponse(req, res, { data: obj || [], dataAll: objAll || [] });
    } catch (error) {
      console.log(error)
      return errorResponse(req, res, error.message);
    }
  };
  
  
  
   export const getCities = async (req, res) => {
      try {
        const [obj, metadata] = await sequelize.query(`
          select distinct City from UnilineMacMapping order by City;
        `
        );
        var respObj = obj.map(q => q.City);
      //   if (!req.user.isAdmin && req.user.City)
      //     respObj = respObj.filter(q => req.user.City.split(',').indexOf(q) >= 0)
        return successResponse(req, res, respObj);
      } catch (error) {
        // console.log(error)
        return errorResponse(req, res, error.message);
      }
    };

   export  const getZones = async (req, res) => {
      try {
  
        const [obj, metadata] = await sequelize.query(`
          select distinct Zone from UnilineMacMapping where City in (:city) order by Zone;
        `, {
          replacements: {
            city: req.query.city.split(','),
         
          },
        });
        var respObj = obj.map(q => q.Zone);
      //   if (!req.user.isAdmin && req.user.ward)
      //     respObj = respObj.filter(q => req.user.ward.split(',').indexOf(q) >= 0)
        return successResponse(req, res, respObj);
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
    };
  
    export const getWards = async (req, res) => {
      try {
     

        const [obj, metadata] = await sequelize.query(`
          select distinct Ward from UnilineMacMapping where City in (:city) and Zone in (:zone) order by Ward;
        `, {
          replacements: {
            city: req.query.city.split(','),
            zone:req.query.zone.split(','),
        
          
          },
        });
  
        return successResponse(req, res, obj.map(q => q.Ward));
      } catch (error) {
        // console.log(error)
        return errorResponse(req, res, error.message);
      }
    };
  
   export const getBeats = async (req, res) => {
      try {
        // console.log(req.query.city)
        // console.log(req.query.location);
        const [obj, metadata] = await sequelize.query(`
          select distinct Beat from UnilineMacMapping where City in (:city) and Zone in (:zone) and Ward in (:ward) order by Beat;
        `, {
          replacements: {
            city: req.query.city.split(','),
            zone:req.query.zone.split(','),
            ward:req.query.ward.split(','),
         
          
          },
        });
  
        return successResponse(req, res, obj.map(q => q.Beat));
      } catch (error) {
        // console.log(error)
        return errorResponse(req, res, error.message);
      }
    };


    export const updateHourlyTable = async () => {
      try{
      console.log("Table Updation in Progress");
    
      // get all wards
      const [AllWardNames] = await sequelize.query(`
      select distinct UnilineMacMapping.Ward ,  count (*)
      from UnilineMacMapping 
      inner join Uniline_summary  
      on UnilineMacMapping.SNoutput = Uniline_summary.SNoutput
      where UnilineMacMapping.City = "Delhi"
      group by UnilineMacMapping.Ward;
      `);
      // console.log ("*************ALL WARD NAMES+Total Machines");
      //console.log(AllWardNames);
    
    const [CountDeviceOnLine] = await sequelize.query(`
    select distinct a.Ward, count(device_status) from Uniline_summary a
    left join UnilineMacMapping b on a.SNoutput = b.SNoutput
    where a.device_status ="Online" group by Ward;      
    `);

  const [CountInverterOnLine] = await sequelize.query(`
    select distinct a.Ward, count(inverter_status) from Uniline_summary a
    left join UnilineMacMapping b on a.SNoutput = b.SNoutput
    where a.inverter_status ="Online" group by Ward;      
    `);

  const [CountBatteryShutDown] = await sequelize.query(`
    select distinct a.Ward, count(battery_status) from Uniline_summary a
    left join UnilineMacMapping b on a.SNoutput = b.SNoutput
    where a.battery_status ="Shut Down" group by Ward;      
    `);

  const [CountBatteryLow] = await sequelize.query(`
    select distinct a.Ward, count(battery_status) from Uniline_summary a
    left join UnilineMacMapping b on a.SNoutput = b.SNoutput
    where a.battery_status ="Low" group by Ward;      
    `);
    
    
    
    
      for (const index in AllWardNames)
      {
   
    
        const [ZoneForWard] = await sequelize.query(`
        select Zone,Ward  from UnilineMacMapping 
        where City = "Delhi" 
        and Ward = '${AllWardNames[index].Ward}'
        limit 1 ;
        `);

        
      const DataWardSummary = {
        ward: AllWardNames[index].Ward,
        deviceTotal : parseInt(AllWardNames[index]?.['count (*)']?? 0),
        deviceOnline : parseInt(CountDeviceOnLine[index]?.['count(device_status)']?? 0),
        inverterTotal : parseInt(AllWardNames[index]?.['count (*)']?? 0),
        inverterOnline : parseInt(CountInverterOnLine[index]?.['count(inverter_status)']?? 0),
        BatteryShutDown: parseInt(CountBatteryShutDown[index]?.['count(battery_status)'] ?? 0),
        BatteryLow : parseInt(CountBatteryLow[index]?.['count(battery_status)'] ?? 0),
        zone : ZoneForWard[0].Zone
      };
    
      
      const hourlyReportLog = await UnilineHourlyReport.create({
        ward:DataWardSummary.ward,
        deviceTotal : DataWardSummary.deviceTotal,
        deviceOnline : DataWardSummary.deviceOnline,
        inverterTotal : DataWardSummary.inverterTotal,
        inverterOnline : DataWardSummary.inverterOnline,
        BatteryShutDown : DataWardSummary.BatteryShutDown,
        BatteryLow : DataWardSummary.BatteryLow,
        onTime:0,
        zone :DataWardSummary.zone
      });
    
    
    
      // console.log (hourlyReportLog);
      }  
    }
    catch(err)
    {
      console.log("hourly report update error");
      console.log(err);
    }
    
    } 

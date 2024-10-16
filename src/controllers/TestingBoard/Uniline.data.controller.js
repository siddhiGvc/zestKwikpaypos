import { where } from "sequelize";

const {UnilineMacMapping,TestMode,SerialPort} =require("../../models")
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
      // console.log(req.query.status)
      var replObjG = {};
      if (req.query.city) replObjG['City'] = req.query.city.split(',');
      if (req.query.zone) replObjG['Zone'] = req.query.zone.split(',');
      if (req.query.ward) replObjG['Ward'] = req.query.ward.split(',');
      if (req.query.beat) replObjG['Beat'] = req.query.beat.split(',');
      if (req.query.status) replObjG['device_status'] = req.query.device_status.split(',');
    //   if (req.query.status) replObjG['inverter_status'] = req.query.inverter_status.split(',');
    
      const replacements = {};
  
  if (req.query.city) {
    replacements.city = req.query.city.split(',');
  }
  
  if (req.query.zone) {
    replacements.location = req.query.zone.split(',');
  }
  
  if (req.query.ward) {
    replacements.uid = req.query.ward.split(',');
  }

  if (req.query.beat) {
    replacements.uid = req.query.beat.split(',');
  }
  
  if (req.query.device_status) {
    replacements.device_status = req.query.device_status.split(',');
  }
  
//   if (req.query.inverter_status) {
//     replacements.inverter_status = req.query.inverter_status.split(',');
//   }
  
  const [objAll, _metadata] = await sequelize.query(`
    SELECT a.*, b.* 
    FROM UnilineMacMapping a
    LEFT JOIN Uniline_summary b ON a.SNoutput = b.SNoutput
    WHERE 1=1
    ${req.query.city ? ` AND b.City IN (:city)` : ''}
    ${req.query.zone ? ` AND b.Zone IN (:zone)` : ''}
    ${req.query.ward ? ` AND b.Ward IN (:ward)` : ''}
     ${req.query.beat ? ` AND b.Beat IN (:bard)` : ''}
  `, { replacements });
  
  const [obj, metadata] = await sequelize.query(`
    SELECT a.*, b.*, c.* 
    FROM UnilineMacMapping a
    LEFT JOIN Uniline_summary b ON a.SNoutput = b.SNoutput
    WHERE 1=1
    ${replObjG.City ? ` AND b.City IN (:city)` : ''}
    ${replObjG.Zone ? ` AND b.Zone IN (:zone)` : ''}
    ${replObjG.Ward ? ` AND b.Ward IN (:uid)` : ''}
    ${req.query.beat ? ` AND b.Beat IN (:bard)` : ''}
    ${replObjG.device_status ? ` AND b.device_status IN (:device_status)` : ''}
   
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
        var respObj = obj.map(q => q.zone);
      //   if (!req.user.isAdmin && req.user.ward)
      //     respObj = respObj.filter(q => req.user.ward.split(',').indexOf(q) >= 0)
        return successResponse(req, res, respObj);
      } catch (error) {
        return errorResponse(req, res, error.message);
      }
    };
  
    export const getWards = async (req, res) => {
      try {
        // console.log(req.query.city)
        // console.log(req.query.location);
        const [obj, metadata] = await sequelize.query(`
          select distinct Ward from UnilineMacMapping where City in (:city) and Wone in (:location) order by Ward;
        `, {
          replacements: {
            city: req.query.city.split(','),
            zone:req.query.zone.split(','),
            ward:req.query.ward.split(','),
            beat:req.query.beat.split(',')
          
          },
        });
  
        return successResponse(req, res, obj.map(q => q.ward));
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
            beat:req.query.beat.split(',')
          
          },
        });
  
        return successResponse(req, res, obj.map(q => q.beat));
      } catch (error) {
        // console.log(error)
        return errorResponse(req, res, error.message);
      }
    };

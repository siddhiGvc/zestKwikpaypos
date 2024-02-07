import { sequelize, faultReport } from '../../models';
import dotenv from 'dotenv'
import { successResponse, errorResponse, uniqueId } from '../../helpers';
const { Op } = require("sequelize");
const moment = require('moment');
dotenv.config();

export const postFaultReportData=async(req,res)=>{
    try{
//        console.log("****************************************")    
  //      console.log(req.body);
        const report= await faultReport.create({
            machineID:req.body.machineNumber,
            userName:req.body.userName,
            loginLat:req.body.Lat,
            loginLong:req.body.Long,
            faultReported:req.body.fault,
            actionTaken:req.body.action,
            faultStatus:req.body.status,
        });
    //    console.log(report);
        res.status(200).json("Okay");

    }
    catch(err){

        console.log(err);
        res.status(505).json("Error");

    }

}

export const getFaultReportData=async(req,res)=>{
    try{
       // console.log("Get fault Report")
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
      //  console.log(startDate,endDate);
        const obj = await faultReport.findAll({
            where: {
                createdAt: { [Op.between]: [req.body.startDate, moment(req.body.endDate).add(1, 'day')] }
              },
              order: [['createdAt', 'ASC'], ['id', 'ASC']],
            });
          return successResponse(req, res, { obj });    
     }
    catch(err){

        res.status(505).json(err);
    }

}



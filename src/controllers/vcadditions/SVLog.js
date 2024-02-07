import { sequelize, simulatedvendinglogs } from '../../models';
import dotenv from 'dotenv'
import { successResponse, errorResponse, uniqueId } from '../../helpers';
const { Op } = require("sequelize");
const moment = require('moment');
dotenv.config();

export const saveSVLog=async(req,res)=>{
    try{
        // console.log("Saving SV Logs Info")
        // console.log(req.body.userName);
        // console.log(req.body.simulatedQty);
        // console.log(req.body.simulatedCycles);
        // console.log(req.body.Zones);
        // console.log(req.body.Wards);
        // console.log(req.body.Beats);
        simulatedvendinglogs.create({
            userName: req.body.userName,
            simulatedQty: req.body.simulatedQty,
            simulatedCycles: req.body.simulatedCycles,
            Wards: req.body.Wards,
            Zones: req.body.Zones,
            Beats:req.body.Beats,
        }) 
        res.status(200).json("okay");
    }
    catch(err){
        console.log("error in saving SV Log info");
    }
}

export const getSVLog=async(req,res)=>{
    try{
        console.log("Get SV Logs Info")
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        console.log(startDate,endDate);

        const obj = await simulatedvendinglogs.findAll({
            where: {
                createdAt: { [Op.between]: [req.body.startDate, moment(req.body.endDate).add(1, 'day')] }
              },
              order: [['createdAt', 'ASC'], ['id', 'ASC']],
            });
          return successResponse(req, res, { obj });    
    }
    catch(err){
        console.log("error in getting SV Log info");
    }
}
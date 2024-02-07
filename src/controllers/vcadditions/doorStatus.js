import { sequelize, lockLogs } from '../../models';
import dotenv from 'dotenv'
import { successResponse, errorResponse, uniqueId } from '../../helpers';
const { Op } = require("sequelize");
const moment = require('moment');
dotenv.config();


export const setDoorStatus=async(req,res)=>{
    try{
        console.log("Saving door Status")
        console.log(req.body.userName);
        console.log(req.body.machineID);
        console.log(req.body.currentLat);
        console.log(req.body.currentLong);
        console.log(req.body.doorStatus);
        lockLogs.create({
        userName: req.body.userName,
        machineID: req.body.machineID,
        currentLat: req.body.currentLat || "99.99",
        currentLong: req.body.currentLong || "99.99",
        doorStatus: req.body.doorStatus,
        }) 
        console.log("Now updating Machine Data");
        var testQuery = `
        update MachineData set last_status = '${req.body.doorStatus}' where machineId =
                (select id from Machines where serial = '${req.body.machineID}' limit 1)
    `;
        console.log(testQuery);
        sequelize.query(`
            update MachineData set last_status = '${req.body.doorStatus}' where machineId =
                    (select id from Machines where serial = ${req.body.machineID} limit 1);
        `).catch(function (ex) {
            console.log('Error', ex);
        });

        res.status(200).json("okay");
    }
    catch(err){
        console.log("error in saving door Status");
    }
}

export const getDoorStatus=async(req,res)=>{
    try{
        console.log("Get door Status")
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        console.log(startDate,endDate);
        // console.log(Zones);
        // console.log(Wards);
        // console.log(Beats);
        // console.log(machineID);
        const obj = await lockLogs.findAll({
            where: {
                createdAt: { [Op.between]: [req.body.startDate, moment(req.body.endDate).add(1, 'day')] }
              },
              order: [['createdAt', 'ASC'], ['id', 'ASC']],
            });
          return successResponse(req, res, { obj });    
    }
    catch(err){
        console.log("error in getting door Status");
    }
}
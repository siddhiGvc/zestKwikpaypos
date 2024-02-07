import { sequelize, hourlyReport } from '../../models';
import dotenv from 'dotenv'
import { successResponse, errorResponse, uniqueId } from '../../helpers';
const { Op } = require("sequelize");
const moment = require('moment');
dotenv.config();

export const postHourlyReportData=async(req,res)=>{
    try{
        //console.log("****************************************")    
        //console.log(req.body);
        const report= await hourlyReport.create({
            machinesTotal:req.body.Total,
            machineOnline:req.body.Onlines,
            machineEmpty:req.body.StockEmpty,
            machineLowStock:req.body.StockLow,
            qtySales:req.body.ItemsDespends,
            cashSales:req.body.Cash,
            burningSales:req.body.BurningEnabled,
            ward:req.body.Ward,
            zone:req.body.Zone,
            onTime:req.body.onTime    
            
        });
        // console.log(report);
        res.status(200).json("Okay");

    }
    catch(err){

        console.log(err);
        res.status(505).json("Error");

    }

}

export const getHourlyReportData=async(req,res)=>{
    try{
        //console.log(req.body);    
        const time =req.body.hourTime;
        //console.log(time); //1

        const timeArray = time.split(":");
        timeArray[1] = "59";
        const Time = timeArray.join(":");
         //console.log(Time); //2

        const dateObj1 = new Date(`1970-01-01T${time}`);

        // Subtract 5 hours and 30 minutes
        dateObj1.setHours(dateObj1.getHours() - 5);
        dateObj1.setMinutes(dateObj1.getMinutes() - 30);

        // Format the resulting time
        const decreasedTime1 = dateObj1.toTimeString().slice(0, 8);
        // console.log("Line 57- ",decreasedTime1);

        const dateObj2 = new Date(`1970-01-01T${Time}`);

        // Subtract 5 hours and 30 minutes (corrected from dateObj1 to dateObj2)
        dateObj2.setHours(dateObj2.getHours() - 5);
        dateObj2.setMinutes(dateObj2.getMinutes() - 30);

        // Format the resulting time
        const decreasedTime2 = dateObj2.toTimeString().slice(0, 8);
        // console.log("Line 67- ",decreasedTime2);

        const originalDate = new Date(req.body.startDate);
        //console.log("Line 70- ",originalDate);
        const formattedDate = originalDate.toISOString().split('T')[0] +` ${decreasedTime1}`;
        //console.log(formattedDate);
    
        const originalDate2 = new Date(req.body.startDate);
        //console.log("Line 75",originalDate2);
        const formattedDate2 = originalDate2.toISOString().split('T')[0] +` ${decreasedTime2}`;
        //console.log("Line 77- ",formattedDate2);
      
        // const reportData = await HourlyReport.findAll({
        //     where: {
        //       createdAt: {
        //         [Op.between]: ['2023-12-15 10:30:00', '2023-12-15 10:31:00']
        //       }
        //     }
        //   });

        var results;
        const query = 'SELECT * FROM hourlyReport WHERE createdAt BETWEEN :startTime AND :endTime LIMIT 13';

          sequelize.query(query, {
            replacements: {
              startTime: formattedDate,
              endTime: formattedDate2
            },
            type: sequelize.QueryTypes.SELECT
          })
            .then(result => {
                res.status(200).json(result);

              results=result;
            })
            .catch(error => {
              console.error('Error executing the query:', error);
            });
        //   console.log(results);
        // res.status(200).json(results);

    }
    catch(err){

        res.status(505).json(err);


    }

}



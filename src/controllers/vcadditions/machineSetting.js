import { sequelize, SSNReport } from '../../models';
import dotenv from 'dotenv'
import { successResponse, errorResponse, uniqueId } from '../../helpers';
const { Op } = require("sequelize");
const moment = require('moment');
const mqttHandler=require('../../../mqtt');
var mqttClient = new mqttHandler();
var events = require('../../helpers/events');


dotenv.config();

// console.log(req.body.MaxDoorCount);
// console.log(req.body.AlarmTime);
// console.log(req.body.MinA);
// console.log(req.body.MinB);
// console.log(req.body.MaxA);
// console.log(req.body.MaxB);
// console.log(req.body.MaxBurnTime);
// console.log(req.body.Model);
// console.log(req.body.Manufacture);



export const SetPrice=async(req,res)=>{
    try{
        console.log("Setting Price")
        console.log(req.body.ProductPrice);
        console.log(req.body.machineID);
        var machineID = req.body.machineID;
        var ProductPrice = req.body.ProductPrice;
        var message="*SPP,"+ProductPrice+",0#";
        console.log(message);
        mqttClient.sendMessage('GVC/VM/' + machineID,message);
        res.status(200).json("okay");
    }
    catch(err){
        console.log("error in setting Price");
    }
}


export const SetName=async(req,res)=>{
    try{
        console.log("Setting Name")
        console.log(req.body.Name);
        console.log(req.body.machineID);

        var machineID = req.body.machineID;
        var Name = req.body.Name;
        var message="*NAM,"+Name+"#";
        console.log(message);
        mqttClient.sendMessage('GVC/VM/' + machineID,message);
        res.status(200).json("okay");
    }
    catch(err){
        console.log("error in setting Name");
    }
}



export const SetModel=async(req,res)=>{
    try{
        console.log("Setting Model")
        console.log(req.body.Model);
        console.log(req.body.machineID);
        var machineID = req.body.machineID;
        var Model = req.body.Model;
        var message="*MOD,"+Model+"#";
        console.log(message);
        mqttClient.sendMessage('GVC/VM/' + machineID,message);
        res.status(200).json("okay");
    }
    catch(err){
        console.log("error in setting Model");
    }
}


export const SetSerialNumber=async(req,res)=>{
    try{
        console.log("Setting SerialNumber")
        console.log(req.body.NewSerialNumber);
        console.log(req.body.machineID);
        console.log(req.body.userName);
        var machineID = req.body.machineID;
        var NewSerialNumber = req.body.NewSerialNumber;
        var message="*SSN,"+NewSerialNumber+"#";
        console.log(message);
        mqttClient.sendMessage('GVC/VM/' + machineID,message);
        const data=await SSNReport.findAll();
        let daily_Count=data[data.length-1].dailyCount;
        console.log((data[data.length-1].createdAt));
        
        const last_date=data[data.length-1].createdAt;


        const currentDate = new Date();
        const currentUtcDate = new Date(currentDate.toISOString().split('T')[0]);

      
        const lastElementDate = new Date(last_date.toISOString().split('T')[0]);

        if (currentUtcDate > lastElementDate) {
          
           daily_Count=0;
        }
        const total_Count=data[data.length-1].totalCount;
        const report= await SSNReport.create({
            machineID:req.body.machineID,
            userName:req.body.userName,
            newMachineID:req.body.NewSerialNumber,
            totalCount:total_Count+1,
            dailyCount:daily_Count+1

        });

        res.status(200).json("okay");
    }
    catch(err){
        console.log(err);
        console.log("error in setting Serial number");
    }
}

export const getCountSerialNumber=async(req,res)=>{
    try{
        const data=await SSNReport.findAll();
        let daily_Count=data[data.length-1].dailyCount;
        const last_date=data[data.length-1].createdAt;
        const currentDate = new Date();
        const currentUtcDate = new Date(currentDate.toISOString().split('T')[0]);

      
        const lastElementDate = new Date(last_date.toISOString().split('T')[0]);

        if (currentUtcDate > lastElementDate) {
          
           daily_Count=0;
        }
        const total_Count=data[data.length-1].totalCount;

        const d={
            dailyCount:daily_Count,
            totalCount:total_Count
        }
    
        res.status(200).json(d)

    }
    catch(err){
        console.log(err);

    }
}


export const SetTemperature=async(req,res)=>{
    try{
        console.log("Setting Temperature")
        console.log(req.body.minA);
        console.log(req.body.minB);
        console.log(req.body.maxA);
        console.log(req.body.maxB);
        console.log(req.body.machineID);
        var machineID = req.body.machineID;
        var minA = req.body.minA;
        var minB = req.body.minB;
        var maxA = req.body.maxA;
        var maxB = req.body.maxB;
        console.log("creating message");
        var message="*TMP,"+ minA + "," + maxA + "," + minB + "," + maxB + "#";
        console.log(message);
        mqttClient.sendMessage('GVC/VM/' + machineID,message);
        res.status(200).json("okay");
    }
    catch(err){
        console.log("error in setting Price");
    }
}


export const SetBurnerValues=async(req,res)=>{
    try{
        console.log("Setting BurnerValues")
        console.log(req.body.maxDoorCount);
        console.log(req.body.maxProcessTime);
        console.log(req.body.alarmTime);
        var machineID = req.body.machineID;
        var maxDoorCount = req.body.maxDoorCount;
        var maxProcessTime =  req.body.maxProcessTime;
        var alarmTime =   req.body.alarmTime;   

        var message="*CNT,"+ maxDoorCount + "," + maxProcessTime + "," + alarmTime + "#";
        console.log(message);
        mqttClient.sendMessage('GVC/VM/' + machineID,message);
        res.status(200).json("okay");
    }
    catch(err){
        console.log("error in setting Price");
    }
}


// as this is MQTT Command 
// so set a time for 15 seconds
// some thing similar to Paytm
// 
export const GetSettings=async(req,res)=>{
    try{
        console.log("Get Settings")
        const machineID = req.body.machineID;
        var message="*Q?#";
        mqttClient.sendMessage('GVC/VM/' + machineID,message);

        const interval=setTimeout(()=>{ 
//            res.status(200).json("MachineOff");
               console.log("Machine Off Error") 
            },15000)


        events.pubsub.on('QueryValues', function(msg,ProductPrice,maxDoorCount,maxProcessTime,alarmTime,minA,maxA,minB,maxB) {
            // msg = JSON.parse(msg);
            console.log('some query values Receievd');
            console.log(msg);
            if(msg === req.body.machineID) {
              clearInterval(interval);
              console.log('query values Receievd');
              // send reply back
              res.status(200).json(
                {
                    "ProductPrice":ProductPrice,
                    "maxDoorCount":maxDoorCount,
                    "maxProcessTime":maxProcessTime,
                    "alarmTime":alarmTime,
                    "minA":minA,
                    "maxA":maxA,
                    "minB":minB,
                    "maxB":maxB
                }
                );      
                console.log("JSON Sent Back");
            }
          });



    }
    catch(err){
        console.log("error in getting Settings");
    }
}
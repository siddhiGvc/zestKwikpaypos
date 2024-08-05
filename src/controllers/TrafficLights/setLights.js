const mqttHandler=require('../../../mqtt');
var mqttClient = new mqttHandler();
var events = require('../../helpers/events');
import {InverterStaus,TrafficLightColors} from '../../models';


export const SetLights = async (req, res) => {
    try {
      const data=req.body;
      console.log(data);
      const junction=req.body.Junction;
      var message="*"+req.body.R1+","+req.body.R2+","+req.body.R3+","+req.body.R4+"#";
      await mqttClient.sendMessage('GVC/VM/' + junction,message);
      const obj=await TrafficLightColors.findOne({where:{Junction:parts[1]}})
      if(obj)
      {
          obj.R1=parts[2],
          obj.R2=parts[3],
          obj.R3=parts[4],
          obj.R4=parts[5],
          obj.lastHeartBeatTime=new Date().toISOString()
          await obj.save();
      }
      else{
       await TrafficLightColors.create({
        Junction:parts[1],
        R1:parts[2],
        R2:parts[3],
        R3:parts[4],
        R4:parts[5],
        lastHeartBeatTime:new Date().toISOString()
     })
      }
      res.status(200).json("Okay");
    } catch (error) {
      console.log(error);
      res.status(505).json("Error");
    }
  };

  export const getLights = async (req, res) => {
    try {
    
      const junction=req.body.Junction;
      const data=await TrafficLightColors.findAll({where:{Junction:junction}});
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(505).json("Error");
    }
  };



  export const SetDate = async (req, res) => {
    try {
      const data=req.body;
      console.log(data);
      const junction=req.body.Junction;
      var message="*"+req.body.DateTime+"#";
      mqttClient.sendMessage('GVC/VM/' + junction,message);
      res.status(200).json("Okay");
    } catch (error) {
      console.log(error);
      res.status(505).json("Error");
    }
  };

  
  export const QueryPowreBackup = async (req, res) => {
    try {
      const data=req.body;
      console.log(data);
      const junction=req.body.Junction;
      if(!junction)  {
        res.status('506').json("Error");
      }
      else{
       
    

      const Interval=setTimeout(()=>{
          res.status(202).json("Machine Is Offline");
      },5000);
      
      events.pubsub.on('sendPowerBackup',async function(parts){
        console.log(1);
        console.log(parts);
        if(parts[1]==junction)
        {
          clearInterval(Interval);
         const data={
          ACV:parts[2]+" V",
          ACI:parts[3]+" AMP",
          DCV:parts[4]+" V",
          DCI:parts[5]+" AMP"

         }

       
         const obj=TrafficLightColors.findOne({where:{Junction:junction}})
         if(obj)
         {
          obj.ACV=parts[2]+" V",
          obj.ACI=parts[3]+" AMP",
          obj.DCV=parts[4]+" V",
          obj.DCI=parts[5]+" AMP",
          obj.lastHeartBeatTime=new Date().toISOString()
          await obj.save();
         }
         else{
          await InverterStaus.create({
            Junction:parts[1],
            ACV:parts[2]+" V",
            ACI:parts[3]+" AMP",
            DCV:parts[4]+" V",
            DCI:parts[5]+" AMP",
            lastHeartBeatTime:new Date().toISOString()
         })
       
        }

         

         res.status(200).json(data);
        }
      })
      const message= "*QINV?#"
      await mqttClient.sendMessage('GVC/VM/' + junction,message);
    
    }


      
    } catch (error) {
      console.log(error);
      res.status(505).json("Error");
    }
  };


 
  export const getQueryPowerBackup = async (req, res) => {
    try {
    
      const junction=req.body.Junction;
      const data=await InverterStaus.findAll({where:{Junction:junction}});
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(505).json("Error");
    }
  };
 
  

  


  
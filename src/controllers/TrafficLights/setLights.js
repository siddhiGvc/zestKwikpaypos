const mqttHandler=require('../../../mqtt');
var mqttClient = new mqttHandler();
var events = require('../../helpers/events');
import {InverterStaus} from '../../models';


export const SetLights = async (req, res) => {
    try {
      const data=req.body;
      console.log(data);
      const juction=req.body.Junction;
      var message="*"+req.body.R1+","+req.body.R2+","+req.body.R3+","+req.body.R4+"#";
      mqttClient.sendMessage('GVC/VM/' + juction,message);
      res.status(200).json("Okay");
    } catch (error) {
      console.log(error);
      res.status(505).json("Error");
    }
  };


  export const SetDate = async (req, res) => {
    try {
      const data=req.body;
      console.log(data);
      const juction=req.body.Junction;
      var message="*"+req.body.DateTime+"#";
      mqttClient.sendMessage('GVC/VM/' + juction,message);
      res.status(200).json("Okay");
    } catch (error) {
      console.log(error);
      res.status(505).json("Error");
    }
  };

  const obj={
    Junction:'J01',
    ACV:"230",
    ACI:"1.2",
    DCV:"12.3",
    DCI:"+2.5"

  }

  export const QueryPowreBackup = async (req, res) => {
    try {
      const data=req.body;
      console.log(data);
      const juction=req.body.Junction;
    
      const message= "*QINV?#"
      mqttClient.sendMessage('GVC/VM/' + juction,message);
    

      const Interval=setTimeout(()=>{
          res.status(500).json("Machine Is Offline");
      },60000);
      
      events.pubsub.on('sendPowerBackup',async function(parts){
        console.log(1);
        console.log(parts);
        if(parts[1]==juction)
        {
          clearInterval(Interval);
         const obj={
          ACV:parts[2]+" V",
          ACI:parts[3]+" AMP",
          DCV:parts[4]+" V",
          DCI:parts[5]+" AMP"

         }

         await InverterStaus.create({
            Junction:parts[1],
            ACV:parts[2]+" V",
            ACI:parts[3]+" AMP",
            DCV:parts[4]+" V",
            DCI:parts[5]+" AMP"

         })

         res.status(200).json(obj);
        }
      })



      
    } catch (error) {
      console.log(error);
      res.status(505).json("Error");
    }
  };


 
  
 
  

  


  
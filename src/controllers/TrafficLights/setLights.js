const mqttHandler=require('../../../mqtt');
var mqttClient = new mqttHandler();


export const SetLights = async (req, res) => {
    try {
      const data=req.body;
      console.log(data);
      const juction=req.body.Junction;
      var message="*"+req.body.R1+","+req.body.R2+","+req.body.R3+","+req.body.R4+"#";
      mqttClient.sendMessage('GVC/TRA/' + juction,message);
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
      mqttClient.sendMessage('GVC/TRA/' + juction,message);
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
    
   
      // mqttClient.sendMessage('GVC/TRA/' + juction,message);
      res.status(200).json(obj);
    } catch (error) {
      console.log(error);
      res.status(505).json("Error");
    }
  };


 
  
 
  

  


  
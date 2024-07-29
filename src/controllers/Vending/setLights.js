const mqttHandler=require('../../../mqtt');
var mqttClient = new mqttHandler();


export const SetLights = async (req, res) => {
    try {
      const data=req.body;
      console.log(data);
      const juction=req.body.Junction;
      var message="*R1:"+req.body.R1+","+"R2:"+req.body.R2+","+"R3:"+req.body.R3+"R4:"+req.body.R4+"#";
      mqttClient.sendMessage('GVC/TRA/' + juction,message);
      res.status(200).json("Okay");
    } catch (error) {
      console.log(error);
      res.status(505).json("Error");
    }
  };
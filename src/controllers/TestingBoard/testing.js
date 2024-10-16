import { Op } from 'sequelize';
import moment from 'moment';
const {MacMapping,TestMode,SerialPort,UnilineMacMapping,UnilineTransactions} =require("../../models")
import { successResponse, errorResponse, uniqueId } from '../../helpers';
var events = require('../../helpers/events');
const mqttHandler=require('../../../mqtt');
var mqttClient = new mqttHandler();



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


export const report=async(req,res)=>{
  try{
    if (!req.body.startDate) return errorResponse(req, res, "Start Date is required");
    if (!req.body.endDate) return errorResponse(req, res, "End Date is required");
    var filterObj = { where: {} };
    if (req.body.devices) filterObj.where.SNoutput = { [Op.in]: req.body.devices.split(',') };
    const serialCount = (await UnilineMacMapping.findAll(filterObj)).length;
    var machines = await UnilineMacMapping.findAll(filterObj);
    var summaries = await UnilineTransactions.findAll({
      where: {
        SNoutput: { [Op.in]: machines.map(q => q.SNoutput) },
        createdAt: { [Op.between]: [req.body.startDate, moment(req.body.endDate).add(1, 'day')] }
      }
    });

    machines = JSON.parse(JSON.stringify(machines));
    summaries = JSON.parse(JSON.stringify(summaries));
    machines.forEach(m => {
      m.summary = {};
      for (var dt = moment(req.body.startDate); dt <= moment(req.body.endDate); dt.add(1, 'day')) {
        var smr = summaries.filter(q => q.SNoutput == m.SNoutput && moment(q.createdAt).format('DD-MMM-YYYY') == moment(dt).format('DD-MMM-YYYY'))[0];
        var zero = (smr?.onMinutes ?? 0) == 0;
        m.summary[dt.format('DD-MMM-YYYY')] = {
          G1: zero ? '' : ((smr?.G1 ?? 0) ),
      
        }
      }
    })
    console.log(machines);
    res.status(200).json({data:{ success: true,devices: serialCount }, machines: JSON.stringify(machines) });
  }
  catch(err){
    console.log(err);
    res.status(505).json({ status: 505 });
  }
}


export const sendG1 = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
  
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        
        events.pubsub.removeAllListeners('getResponse1');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
  

      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "G1/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse1', async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
      
        events.pubsub.removeAllListeners('getResponse1');
        if (!responseSent) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.G1=response.toString();
            await data.save();

            await UnilineTransactions.create({
                MacID:req.body.MacID,
                SNoutput:req.body.serialNumber,
                G1:response.toString()

            })
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };


  export const sendG2 = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
  
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("D");
        events.pubsub.removeAllListeners('getResponse2');
     
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed


      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "G2/r/n");
  
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse2', async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
      
        events.pubsub.removeAllListeners('getResponse2');

        if (!responseSent) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.G2=response.toString();
            await data.save();

            await UnilineTransactions.create({
                MacID:req.body.MacID,
                SNoutput:req.body.serialNumber,
                G2:response.toString()

            })
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
    
      
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };
  

  export const sendG3 = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("D");
        events.pubsub.removeAllListeners('getResponse3');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "G3/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse3', async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
       
        events.pubsub.removeAllListeners('getResponse3');
        if (!responseSent) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.G3=response.toString();
            await data.save();

            await UnilineTransactions.create({
                MacID:req.body.MacID,
                SNoutput:req.body.serialNumber,
                G3:response.toString()

            })
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };

  export const sendI = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("D");
        events.pubsub.removeAllListeners('getResponse4');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "I/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse4', async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
       
        events.pubsub.removeAllListeners('getResponse4');
        if (!responseSent) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.I=response.toString();
            await data.save();

            await UnilineTransactions.create({
                MacID:req.body.MacID,
                SNoutput:req.body.serialNumber,
                I:response.toString()

            })
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };

  export const sendGF = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("D");
        events.pubsub.removeAllListeners('getResponse5');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "GF/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse5', async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
      
        events.pubsub.removeAllListeners('getResponse5');
        if (!responseSent) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.GF=response.toString();
            await data.save();

            await UnilineTransactions.create({
                MacID:req.body.MacID,
                SNoutput:req.body.serialNumber,
                GF:response.toString()

            })
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };


  export const sendQ = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("D");
        events.pubsub.removeAllListeners('getResponse6');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "Q/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse6', async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        
        events.pubsub.removeAllListeners('getResponse6');
        if (!responseSent) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.Q=response.toString();
            await data.save();

            await UnilineTransactions.create({
                MacID:req.body.MacID,
                SNoutput:req.body.serialNumber,
                Q:response.toString()

            })
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };


  export const sendQ1 = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("D");
        events.pubsub.removeAllListeners('getResponse7');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "Q1/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse7', async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
       
        events.pubsub.removeAllListeners('getResponse7');
        if (!responseSent) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.Q1=response.toString();
            await data.save();

            await UnilineTransactions.create({
                MacID:req.body.MacID,
                SNoutput:req.body.serialNumber,
                Q1:response.toString()

            })
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };

  export const sendT = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("D");
        events.pubsub.removeAllListeners('getResponse8');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "T/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse8', (response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        events.pubsub.removeAllListeners('getResponse8');
        if (!responseSent) { 
            responseSent=true;
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };

  export const sendTL = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("D");
        events.pubsub.removeAllListeners('getResponse9');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "TL/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse9', (response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        events.pubsub.removeAllListeners('getResponse9');
        if (!responseSent) { 
            responseSent=true;
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };

  export const sendS = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("D");
        events.pubsub.removeAllListeners('getResponse10');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "S/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse10', (response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        events.pubsub.removeAllListeners('getResponse10');
        if (!responseSent) { 
            responseSent=true;
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };


  export const sendC = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("D");
        events.pubsub.removeAllListeners('getResponse11');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "C/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse11', (response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        events.pubsub.removeAllListeners('getResponse11');
        if (!responseSent) { 
            responseSent=true;
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };


  export const sendCT = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("D");
        events.pubsub.removeAllListeners('getResponse12');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "CT/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse12', (response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        events.pubsub.removeAllListeners('getResponse12');
        if (!responseSent) { 
            responseSent=true;
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };


  export const sendF = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("D");
        events.pubsub.removeAllListeners('getResponse13');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "F/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse13', (response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        events.pubsub.removeAllListeners('getResponse13');
        if (!responseSent) { 
            responseSent=true;
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };
  


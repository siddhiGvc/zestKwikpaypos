import { Op, fn ,col } from 'sequelize';
import moment from 'moment';
const {MacMapping,TestMode,SerialPort,UnilineMacMapping,UnilineTransactions,sequelize} =require("../../models")
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

    const startDate = moment(req.body.startDate, 'DD-MMM-YYYY'); // Ensure date format is ISO-compliant
    const endDate = moment(req.body.endDate, 'DD-MMM-YYYY').add(1, 'day');

    // Reassign `startDate` or `endDate` if needed later in your code


    var filterObj = { where: {} };
    if (req.body.city) filterObj.where.City = { [Op.in]: req.body.city.split(',') };
    const cityCount = (await UnilineMacMapping.findAll(filterObj)).length;
    if (req.body.zone) filterObj.where.Zone = { [Op.in]: req.body.zone.split(',') };
    const zoneCount = (await UnilineMacMapping.findAll(filterObj)).length;
    if (req.body.ward) filterObj.where.Ward = { [Op.in]: req.body.ward.split(',') };
    const wardCount = (await UnilineMacMapping.findAll(filterObj)).length;
    if (req.body.beat) filterObj.where.Beat = { [Op.in]: req.body.beat.split(',') };
    const beatCount = (await UnilineMacMapping.findAll(filterObj)).length;
   
    if (req.body.devices) filterObj.where.SNoutput = { [Op.in]: req.body.devices.split(',') };
    const serialCount = (await UnilineMacMapping.findAll(filterObj)).length;
    var machines = await UnilineMacMapping.findAll(filterObj);
  
    
    var summaries = await UnilineTransactions.findAll({
      attributes: [
        'SNoutput',
        [fn('DATE', col('createdAt')), 'date'], // Extract date part
        [fn('MAX', col('createdAt')), 'latestCreatedAt']
      ],
      where: {
        SNoutput: { [Op.in]: machines.map(q => q.SNoutput) },
        createdAt: {
          [Op.between]: [startDate, endDate]
        }
      },
      group: ['SNoutput', fn('DATE', col('createdAt'))], // Group by SNoutput and date
      order: [[fn('DATE', col('createdAt')), 'ASC']] // Sort by date (optional)
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
          G2: zero ? '' : ((smr?.G2 ?? 0) ),
          G3: zero ? '' : ((smr?.G1 ?? 0) ),
      
      
        }
      }
    })
    
    res.status(200).json({data:{ success: true, counts: { city: cityCount, zone: zoneCount, ward: wardCount, beat: beatCount, machines: serialCount }, machines: machines }});
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
      await events.pubsub.emit('getResponse1',req.body.serialNumber, async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
      
        events.pubsub.removeAllListeners('getResponse1');
        if (!responseSent && response.length>2) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.G1=response.toString();
            data.lastHeartBeatTime=new Date().toISOString();
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
      console.log("G1 ERROR",err);
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
      await events.pubsub.emit('getResponse2',req.body.serialNumber, async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
      
        events.pubsub.removeAllListeners('getResponse2');

        if (!responseSent && response.length>2) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.G2=response.toString();
            data.lastHeartBeatTime=new Date().toISOString();
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
      // console.log(err);
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
      await events.pubsub.emit('getResponse3',req.body.serialNumber, async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
       
        events.pubsub.removeAllListeners('getResponse3');
        if (!responseSent && response.length>2 ) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.G3=response.toString();
            data.lastHeartBeatTime=new Date().toISOString();
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
      // console.log(err);
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
        if (!responseSent ) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "I/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse4',req.body.serialNumber, async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
       
        events.pubsub.removeAllListeners('getResponse4');
        if (!responseSent && response.length>2) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.I=response.toString();
            data.lastHeartBeatTime=new Date().toISOString();
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
      // console.log(err);
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
      await events.pubsub.emit('getResponse5',req.body.serialNumber, async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
      
        events.pubsub.removeAllListeners('getResponse5');
        if (!responseSent && response.length>2) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.GF=response.toString();
            data.lastHeartBeatTime=new Date().toISOString();
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
      // console.log(err);
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
      await events.pubsub.emit('getResponse6',req.body.serialNumber, async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        
        events.pubsub.removeAllListeners('getResponse6');
        if (!responseSent && response.length>2) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.Q=response.toString();
            data.lastHeartBeatTime=new Date().toISOString();
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
      // console.log(err);
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
        if (!responseSent ) { 
            responseSent=true;
        res.status(200).json({ data: "D" }); // Send the response back to the client
        }
       
      }, 5000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "Q1/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse7',req.body.serialNumber, async(response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
       
        events.pubsub.removeAllListeners('getResponse7');
        if (!responseSent && response.length>2) { 
            responseSent=true;
            const data=await UnilineMacMapping.findOne({where:{SNoutput:req.body.serialNumber}});
            data.Q1=response.toString();
            data.lastHeartBeatTime=new Date().toISOString();
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
      // console.log(err);
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
        if (!responseSent && response.length>2) { 
            responseSent=true;
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      // console.log(err);
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
        if (!responseSent ) { 
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
        if (!responseSent && response.length>2) { 
            responseSent=true;
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      // console.log(err);
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
        if (!responseSent && response.length>2) { 
            responseSent=true;
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      // console.log(err);
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
        if (!responseSent && response.length>2) { 
            responseSent=true;
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      // console.log(err);
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
        if (!responseSent && response.length>2) { 
            responseSent=true;
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      // console.log(err);
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
        if (!responseSent ) { 
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
        if (!responseSent && response.length>2) { 
            responseSent=true;
           res.status(200).json({ data: response }); // Send the response back to the client
        }
       
      });
     
      
    } catch (err) {
      // console.log(err);
      res.status(505).json({ status: 505 });
    }
  };
  


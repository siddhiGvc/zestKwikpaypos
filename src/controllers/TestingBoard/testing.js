const {MacMapping,TestMode,SerialPort} =require("../../models")
import { successResponse, errorResponse, uniqueId } from '../../helpers';
var events = require('../../helpers/events');
const mqttHandler=require('../../../mqtt');
var mqttClient = new mqttHandler();


export const sendG1 = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
  
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("Device is Offline");
        events.pubsub.removeAllListeners('getResponse1');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "Device Is Offline" }); // Send the response back to the client
        }
       
      }, 10000); // Adjust the timeout duration as needed
  

      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "G1/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse1', (response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        events.pubsub.removeAllListeners('getResponse1');
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


  export const sendG2 = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
  
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("Device is Offline");
        events.pubsub.removeAllListeners('getResponse2');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "Device Is Offline" }); // Send the response back to the client
        }
       
      }, 10000); // Adjust the timeout duration as needed


      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "G2/r/n");
  
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse2', (response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        events.pubsub.removeAllListeners('getResponse2');
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
  

  export const sendG3 = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("Device is Offline");
        events.pubsub.removeAllListeners('getResponse3');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "Device Is Offline" }); // Send the response back to the client
        }
       
      }, 10000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "G3/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse3', (response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        events.pubsub.removeAllListeners('getResponse3');
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

  export const sendI = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("Device is Offline");
        events.pubsub.removeAllListeners('getResponse4');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "Device Is Offline" }); // Send the response back to the client
        }
       
      }, 10000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "I/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse4', (response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        events.pubsub.removeAllListeners('getResponse4');
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

  export const sendGF = async (req, res) => {
    try {
      let responseSent = false;
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      
    
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("Device is Offline");
        events.pubsub.removeAllListeners('getResponse5');
        if (!responseSent) { 
            responseSent=true;
        res.status(200).json({ data: "Device Is Offline" }); // Send the response back to the client
        }
       
      }, 10000); // Adjust the timeout duration as needed
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "GF/r/n");
      // Listen for the response using the event emitter
      await events.pubsub.emit('getResponse5', (response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        events.pubsub.removeAllListeners('getResponse5');
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
  


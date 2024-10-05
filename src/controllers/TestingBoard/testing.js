const {MacMapping,TestMode,SerialPort} =require("../../models")
import { successResponse, errorResponse, uniqueId } from '../../helpers';
var events = require('../../helpers/events');
const mqttHandler=require('../../../mqtt');
var mqttClient = new mqttHandler();


export const sendG1 = async (req, res) => {
    try {
      console.log("API called", req.body);
  
      // Send the MQTT message
    
      await mqttClient.sendMessage('GVC/' + req.body.serialNumber, "G1/r/n");
      // Set up a timeout to handle cases where no response is received in time
      const timeout = setTimeout(() => {
        console.log("Device is Offline");
        events.pubsub.removeAllListeners('getResponse');
        res.status(200).json({ data: "Device Is Offline" });
       
      }, 10000); // Adjust the timeout duration as needed
  
      // Listen for the response using the event emitter
      events.pubsub.emit('getResponse', (response) => {
        // Clear the timeout if the response is received in time
        console.log("Response:",response);
        clearTimeout(timeout);
        events.pubsub.removeAllListeners('getResponse');
        res.status(200).json({ data: response }); // Send the response back to the client
       
      });

      
  
    } catch (err) {
      console.log(err);
      res.status(505).json({ status: 505 });
    }
  };
  

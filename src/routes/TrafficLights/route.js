import express from 'express';
// import { SetLights,SetDate,QueryPowreBackup,getLights,getQueryPowerBackup, GetAllJunctions, GetAllDevices, GetAllInverters} from '../../controllers/TrafficLights/setLights';

import { sendMessage } from '../../controllers/Traffic/trafficMacAddress';
const router = express.Router();

//= ===============================
// Admin routes
//= ===============================
router.post('/sendMessage', sendMessage);

module.exports = router;

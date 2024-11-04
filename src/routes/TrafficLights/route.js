import express from 'express';
// import { SetLights,SetDate,QueryPowreBackup,getLights,getQueryPowerBackup, GetAllJunctions, GetAllDevices, GetAllInverters} from '../../controllers/TrafficLights/setLights';

import * as macAddress from '../../controllers/Traffic/trafficMacAddress';
const router = express.Router();

//= ===============================
// Admin routes
//= ===============================



router.get('/getMacAddress',macAddress.getAllMacAddress);
router.get('/getData',macAddress.getData);
router.post('/sendFota',macAddress.sendFota);
router.post('/reset',macAddress.sendReset);

router.post('/sendFW',macAddress.sendFW);

router.post('/sendFotaUrl',macAddress.sendFotaUrl);
router.post('/askUrl',macAddress.askUrl);





router.post('/sendHBT',macAddress.sendHBT);
router.post('/sendSIP',macAddress.sendSIP);
router.post('/askSIP',macAddress.askSIP);
router.post('/sendSSID',macAddress.sendSSID);
router.post('/askSSID',macAddress.askSSID);
router.post('/sendPWD',macAddress.sendPWD);
router.post('/sendSSID1',macAddress.sendSSID1);
router.post('/sendPWD1',macAddress.sendPWD1);

router.post('/modeTest1',macAddress.modeTest1);
router.post('/modeTest2',macAddress.modeTest2);
router.post('/modeTest3',macAddress.modeTest3);
router.post('/modeNone',macAddress.modeNone);
router.get('/getTestMode',macAddress.getTestMode);
router.post('/setTestMode',macAddress.setTestMode);
router.post('/setSN',macAddress.setSN);
router.post('/checkSN',macAddress.checkSN);
router.post('/setErase',macAddress.setErase);
router.post('/checkErase',macAddress.checkErase);

router.get('/getSerialPorts',macAddress.getSerialPorts);

router.post('/sendMessage', macAddress.sendMessage);

module.exports = router;

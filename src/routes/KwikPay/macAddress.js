import express from "express";
import * as macAddress from '../../controllers/KwikPay/macAddress';

const router = express.Router();
router.get('/getMacAddress',macAddress.getAllMacAddress);
router.get('/getData',macAddress.getData);
router.post('/saveINHoutput',macAddress.saveINHoutput);
router.post('/sendFota',macAddress.sendFota);
router.post('/reset',macAddress.sendReset);
router.post('/sendV',macAddress.sendV);
router.post('/sendTC',macAddress.sendTC);
router.post('/sendFW',macAddress.sendFW);
router.post('/sendTV',macAddress.sendTV);
router.post('/sendFotaUrl',macAddress.sendFotaUrl);
router.post('/askUrl',macAddress.askUrl);
router.post('/sendCC',macAddress.sendCC);
router.post('/askCC',macAddress.askCC);
router.post('/sendLight',macAddress.sendLight);
router.post('/sendHBT',macAddress.sendHBT);
router.post('/sendSIP',macAddress.sendSIP);
router.post('/askSIP',macAddress.askSIP);
router.post('/sendSSID',macAddress.sendSSID);
router.post('/askSSID',macAddress.askSSID);
router.post('/sendPWD',macAddress.sendPWD);
router.post('/sendSSID1',macAddress.sendSSID1);
router.post('/sendPWD1',macAddress.sendPWD1);
router.post('/sendCA',macAddress.sendCA);
router.post('/askCA',macAddress.askCA);
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
router.post('/setPair',macAddress.setPair);
router.post('/checkPair',macAddress.checkPair);
router.post('/setL',macAddress.setL);
router.get('/getSerialPorts',macAddress.getSerialPorts);
router.post('/sendPassThru',macAddress.sendPassThru);
router.post('/checkPassThru',macAddress.checkPassThru);
router.post('/sendD',macAddress.sendD);
router.post('/sendVS',macAddress.sendVS);

module.exports = router;
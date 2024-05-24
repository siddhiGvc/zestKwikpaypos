import express from "express";
import * as macAddress from '../../controllers/KwikPay/macAddress';

const router = express.Router();
router.get('/getMacAddress',macAddress.getAllMacAddress);
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
router.post('/sendLight',macAddress.sendLight);
router.post('/sendHBT',macAddress.sendHBT);
router.post('/sendSIP',macAddress.sendSIP);
router.post('/sendSSID',macAddress.sendSSID);
router.post('/sendPWD',macAddress.sendPWD);
router.post('/sendSSID1',macAddress.sendSSID1);
router.post('/sendPWD1',macAddress.sendPWD1);


module.exports = router;
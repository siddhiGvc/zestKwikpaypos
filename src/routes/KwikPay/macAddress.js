import express from "express";
import * as macAddress from '../../controllers/KwikPay/macAddress';

const router = express.Router();
router.get('/getMacAddress',macAddress.getAllMacAddress);
router.post('/saveINHoutput',macAddress.saveINHoutput);
router.post('/sendFota',macAddress.sendFota);
router.post('/reset',macAddress.sendReset);
router.post('/sendV',macAddress.sendV);
router.post('/sendTC',macAddress.sendTC);


module.exports = router;
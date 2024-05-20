import express from "express";
import * as macAddress from '../../controllers/KwikPay/macAddress';

const router = express.Router();
router.get('/getMacAddress',macAddress.getAllMacAddress);
router.post('/saveINHoutput',macAddress.saveINHoutput);


module.exports = router;
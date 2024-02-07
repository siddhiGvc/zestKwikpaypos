import express from 'express';
import * as vcadditions from '../controllers/vcadditions/simulatedVending';
import * as saveLogin from '../controllers/vcadditions/saveLogin';
import * as SVLog from '../controllers/vcadditions/SVLog';
import * as doorStatus from '../controllers/vcadditions/doorStatus';
import * as hourlyReport from '../controllers/vcadditions/hourlyReport';
import * as faultReport from '../controllers/vcadditions/faultReport';
import * as machineSetting from '../controllers/vcadditions/machineSetting';
import * as SSNReport from '../controllers/vcadditions/SSNReport';

import auth from '../middleware/apiAuth'
const router = express.Router();
router.post('/add',vcadditions.getAddData);
router.post('/substract',vcadditions.getSubstarctData);
router.post('/savelogin',saveLogin.saveLogin);
router.post('/getloginfo',saveLogin.getLogInfo);
router.post('/saveSVLog',SVLog.saveSVLog);
router.post('/getSVLog',SVLog.getSVLog);
router.post('/setDoorStatus',doorStatus.setDoorStatus);
router.post('/getDoorStatus',doorStatus.getDoorStatus);

router.post('/SetPrice',machineSetting.SetPrice);
router.post('/SetTemperature',machineSetting.SetTemperature);
router.post('/SetBurnerValues',machineSetting.SetBurnerValues);
router.post('/SetSerialNumber',machineSetting.SetSerialNumber);
router.post('/SetModel',machineSetting.SetModel);
router.post('/SetName',machineSetting.SetName);

router.post('/GetSettings',machineSetting.GetSettings);




router.post("/saveHR",hourlyReport.postHourlyReportData);
router.post("/getHR",hourlyReport.getHourlyReportData);

router.post("/saveFR",faultReport.postFaultReportData);
router.post("/getFR",faultReport.getFaultReportData);


router.post("/getSSN",SSNReport.getSSNReportData);
router.get("/getCountsSerial",machineSetting.getCountSerialNumber);

module.exports = router;


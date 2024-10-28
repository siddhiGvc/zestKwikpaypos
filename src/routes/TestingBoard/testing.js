import express from "express";
import * as testing from '../../controllers/TestingBoard/testing';
import * as getData from "../../controllers/TestingBoard/Uniline.data.controller"
import * as hourlyReport from "../../controllers/TestingBoard/hourlyReport"

const router = express.Router();
router.get('/getMacAddress',testing.getAllMacAddress);
router.get('/getData',getData.getData);
router.get('/getCities',getData.getCities);
router.get('/getZones',getData.getZones);
router.get('/getWards',getData.getWards);
router.get('/getBeats',getData.getBeats);

router.get("/addDevice",getData.createMapping);


router.post('/sendG1',testing.sendG1);
router.post('/sendG2',testing.sendG2);
router.post('/sendG3',testing.sendG3);
router.post('/sendI',testing.sendI);
router.post('/sendGF',testing.sendGF);
router.post('/sendQ',testing.sendQ);
router.post('/sendQ1',testing.sendQ1);
router.post('/sendT',testing.sendT);
router.post('/sendTL',testing.sendTL);
router.post('/sendC',testing.sendC);
router.post('/sendCT',testing.sendCT);
router.post('/sendF',testing.sendF);
router.post('/sendF',testing.sendF);
router.post('/report',testing.report);


router.post("/saveHR",hourlyReport.postHourlyReportData);
router.post("/getHR",hourlyReport.getHourlyReportData);


module.exports=router;
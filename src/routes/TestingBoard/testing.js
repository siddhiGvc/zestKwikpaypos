import express from "express";
import * as testing from '../../controllers/TestingBoard/testing';

const router = express.Router();
router.post('/sendG1',testing.sendG1);
router.post('/sendG2',testing.sendG2);
router.post('/sendG3',testing.sendG3);
router.post('/sendI',testing.sendI);
router.post('/sendGF',testing.sendGF);
router.post('/sendQ',testing.sendQ);
router.post('/sendQ1',testing.sendQ1);


module.exports=router;
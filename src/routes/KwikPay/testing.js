import express from "express";
import * as testing from '../../controllers/KwikPay/testing';

const router = express.Router();
router.get('/getOutputs',testing.getAllCommandOutputs);


module.exports=router;
import express from "express";
import * as testing from '../../controllers/TestingBoard/testing';

const router = express.Router();
router.post('/sendG1',testing.sendG1);


module.exports=router;
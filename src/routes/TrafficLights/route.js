import express from 'express';
import { SetLights,SetDate,QueryPowreBackup,getLights } from '../../controllers/TrafficLights/setLights';

const router = express.Router();

//= ===============================
// Admin routes
//= ===============================
router.post('/setLights', SetLights);
router.post('/setDate', SetDate);
router.post('/queryPowerBackup', QueryPowreBackup);
router.post('/getLights',getLights);


module.exports = router;

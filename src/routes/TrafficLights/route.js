import express from 'express';
import { SetLights,SetDate,QueryPowreBackup,getLights,getQueryPowerBackup, GetAllJunctions} from '../../controllers/TrafficLights/setLights';

const router = express.Router();

//= ===============================
// Admin routes
//= ===============================
router.post('/setLights', SetLights);
router.post('/setDate', SetDate);
router.post('/queryPowerBackup', QueryPowreBackup);
router.post('/getInverterStatus', getQueryPowerBackup);
router.post('/getLights',getLights);
router.get('/getAllJunstion',GetAllJunctions);


module.exports = router;

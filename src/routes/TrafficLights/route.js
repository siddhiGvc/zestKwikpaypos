import express from 'express';
import { SetLights,SetDate,QueryPowreBackup,getLights,getQueryPowerBackup, GetAllJunctions, GetAllDevices, GetAllInverters} from '../../controllers/TrafficLights/setLights';

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
router.get('/getAllInverters',GetAllInverters);
router.get('/getAllDevices',GetAllDevices);


module.exports = router;

import express from 'express';
import * as controller from '../controllers/machine/machine.controller';
import * as dataController from '../controllers/machine/machine.data.controller';
import auth from '../middleware/apiAuth'

const router = express.Router();

router.get('/', controller.get);
router.get('/data', dataController.getData);
router.get('/lastBurn', dataController.lastBurningStart);
router.get('/address', controller.getAddressData);
router.post('/createMapping', controller.createMapping);

router.get('/master/zone', auth, dataController.getZones);
router.get('/master/ward', auth, dataController.getWards);
router.get('/master/beat', dataController.getBeats);
router.get('/master/machine', dataController.getMachines);

router.post('/report', dataController.report);

module.exports = router;

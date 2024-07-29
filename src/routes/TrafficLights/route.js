import express from 'express';
import { SetLights } from '../../controllers/Vending/setLights';

const router = express.Router();

//= ===============================
// Admin routes
//= ===============================
router.post('/setLights', SetLights);


module.exports = router;

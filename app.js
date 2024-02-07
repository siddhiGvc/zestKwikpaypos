import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';

import publicRoutes from './src/routes/public';
import apiRoutes from './src/routes/api';
import adminRoutes from './src/routes/admin';
import machineRoutes from './src/routes/machine';
import apiMiddleware from './src/middleware/apiAuth';
import adminMiddleware from './src/middleware/adminAuth';
import errorHandler from './src/middleware/errorHandler';
import vcRoutes from './src/routes/vcroutes';
import colorRouter from './src/routes/hourlyReportColors';
import inventoryRouter from './src/routes/inventory';
const paytmRouter=require("./src/routes/paytmRoutes")


dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cors());
app.use(bodyParser.json());
app.use('/pub', publicRoutes);
app.use('/api/machine', machineRoutes);
app.use('/api', apiMiddleware, apiRoutes);
app.use('/api/admin', apiMiddleware, adminMiddleware, adminRoutes);
app.use('/add',vcRoutes);
app.use('/', paytmRouter);
app.use('/colors',colorRouter);
app.use('/inventory',inventoryRouter);
app.get('/hbt', (req, res) => res.send('Ok'));
 
 

app.use(errorHandler);

module.exports = app;

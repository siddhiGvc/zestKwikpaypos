import express from 'express';
import dotenv from 'dotenv';
const os = require('os');
const dns = require('dns');
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
import kwikpayRouter from "./src/routes/KwikPay/macAddress";
import kwikpayTestingRouter from "./src/routes/KwikPay/testing";
const paytmRouter=require("./src/routes/paytmRoutes");
const customerRouter=require("./src/routes/customer");
const trafficRouter =require("./src/routes/TrafficLights/route");
const testingBoardRouter=require("./src/routes/TestingBoard/testing");
const UnilineUserRouter=require('./src/routes/unilineAdmin')
const UnilineCustomerRouter=require('./src/routes/TestingBoard/customers')

dotenv.config();
require('./src/config/sequelize');
require('./src/helpers/socketServer');
// require('./src/helpers/trafficSocket');


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
app.use('/customers',customerRouter);
app.use('/kwikpay',kwikpayRouter);
app.use('/kwikpayTesting',kwikpayTestingRouter);
app.use('/trafficLights',trafficRouter);
app.use('/testingBoard',testingBoardRouter);
app.use('/unilineAdmin', UnilineUserRouter);
app.use('/unilineCustomers',UnilineCustomerRouter);

app.get('/hbt', (req, res) => {
  const clientIP = req.ip.replace('::ffff:', '');

  // Perform a reverse DNS lookup to get the hostname
  dns.reverse(clientIP, (err, hostnames) => {
    if (err) {
      res.send('Unable to determine client hostname');
    } else {
      const clientHostname = hostnames[0] || 'Unknown';
      res.send(`Client Hostname: ${clientHostname}`);
    }
  });
}
);
 
 

app.use(errorHandler);

module.exports = app;

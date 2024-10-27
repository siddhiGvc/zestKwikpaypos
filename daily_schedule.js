const schedule = require('node-schedule');
const fs = require('fs')
const path = require('path')
const moment = require('moment')
const logPath = path.resolve(__dirname, 'daily.log')
import * as dataController from './src/controllers/TestingBoard/Uniline.data.controller';

const setup = async function () {
    const jobHourlyReport = schedule.scheduleJob('*/1 * * * * ', function() {
        console.log("Starting 1 minute function");
        dataController.updateHourlyTable().then (list =>{
            console.log("Table Updated")
        })
    });



    // const job = schedule.scheduleJob('00 19 * * *', function () {
    //     console.log('Running Daily Schedule!');
    //     dataController.CalcDailySummary().then(list => {
    //         fs.appendFile(logPath, `[${moment().format()}]\nRunning Now\n${JSON.stringify(list)}\n\n`, err => {
    //             //console.log(err)
    //         });
    //         console.log('Daily Schedule completed');
    //         console.log('Archiving records');
    //         dataController.ArchiveTransactions();
    //         console.log('Archiving records completed');
    //     });
    // });
    console.log('Daily Schedule initialized');
    return jobHourlyReport;
}

module.exports = setup;
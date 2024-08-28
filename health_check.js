const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');

const setup = async function (mqtt_client) {
    const job = schedule.scheduleJob('* * * * *', function () {
        console.log('Heartbeat');
        mqtt_client.publish('GVC/VM/SVR', '*HBT#', (err) => {
            if (err) {
                console.error('Error publishing message:', err);

                // Define the path to the file you want to modify
                const filePath = path.join(__dirname, 'error-log.txt');

                // Log the error to the file
                fs.appendFile(filePath, `${new Date().toISOString()} - Error: ${err.message}\n`, 'utf8', (fileErr) => {
                    if (fileErr) {
                        console.error('Error writing to file:', fileErr);
                    } else {
                        console.log('Error logged to file successfully.');
                    }
                });
            } else {
                // console.log('Message published successfully.');
            }
        });
    });
    return job;
}

module.exports = setup;

const schedule = require('node-schedule');

const setup = async function (mqtt_client) {
    const job = schedule.scheduleJob('* * * * *', function () {
        console.log('Heartbeat');
        mqtt_client.publish('GVC/VM/SVR', '*HBT#');
    });
    return job;
}

module.exports = setup;
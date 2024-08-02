import { Transaction, MachineData, Machine, RejectedRecord, sequelize ,TrafficLightColors} from '../models';
// import { sendQueryPowerBackup} from '../controllers/TrafficLights/setLights';
var events = require('./events');
//a
const num = a => {
    if (['BST', 'BEN', 'BER'].indexOf(a) > -1) return a == 'BST' ? 1 : a == 'BEN' ? 0 : 2;
    if (isNaN(parseInt(a))) return null;
    else return parseInt(a);
}
//q
module.exports.parse = (payload, mqttClient,topic) => {
    console.log("Payload1",payload.toString());
     parseInternal(payload.toString(), mqttClient,topic);
    // if (!/.*?(\*[0-9A-Za-z\,]*\#)+?.*?/gm.test(payload.toString())) return;
    // var commands = [...payload.toString().matchAll(/.*?(\*[0-9A-Za-z\,]*\#)+?.*?/gm)].map(q => q[0]);
    // commands.forEach(cmd => {
    //     try {
    //         parseInternal(cmd, mqttClient,topic);
    //     } catch (ex) {
    //         console.log('Exception in MQTT:', ex);
    //     }
    // })
}






const parseInternal = (payload, mqttClient,topic) => {
    // 'Parsing message - ' + payload
    try {
        console.log("Payload2",payload)
        var cleaned = /^\**(.*?)\#*$/.exec(payload)[1];
        var parts = cleaned.split(',');
        // 211023 - ignore test with numeric number, allow commands in parts[0] 
        //if (!/^\d+$/.test(parts[0])) return;

        // 211023 added code for detecting machine packets ie *SSN,12345# sent to GVC/VM/#
       
            if(parts[0]=="QPB")
                {
                    console.log("QPB accepted");
                    events.pubsub.emit('sendPowerBackup',parts);
                }

            if(parts[0]=="TRA")
            {
               TrafficLightColors.create({
                  Junction:parts[1],
                  R1:parts[2],
                  R2:parts[3],
                  R3:parts[4],
                  R4:parts[5]
               })
            }

            if (parts[0] == 'SSN'){
            var from = topic.replace('GVC/VM/','');
            console.log('From -',from,'  To -',parts[1]); 
            Transaction.create({
                machine: from,
                command: parts[0],
                p1: parts[1],
            }) 
            return;
            }  

            if (parts[1] == 'STA')
            {
                console.log(parts);
             //   events.pubsub.emit('paytm_success',parts[3],parts[2]) ;
            }   
    
        if (parts[1] == 'UPI')
        {
         //   console.log(parts);
            events.pubsub.emit('paytm_success',parts[3],parts[2]) ;
        }   

        if (parts[1] == 'QRY')
        {
            console.log(parts);
            events.pubsub.emit('QueryValues',parts[0],parts[2],parts[3],parts[4],parts[5],parts[6],parts[7],parts[8],parts[9]) ;
        }   


        if (parts[1] == 'RFN')
        {
         //   console.log(parts);
            events.pubsub.emit('partialRefund',parts[3],parts[2]) ;
        }   

        

        if(parts[1] != 'SUM' && parts[1] != 'PWR' && parts[1] != 'UPI' && parts[1] != 'RFN' ) return;
//        console.log(parts);   
        Transaction.create({
            machine: parts[0],
            command: parts[1],
            p1: parts[2],
            p2: parts[3],
            p3: parts[4],
            p4: parts[5],
            p5: parts[6],
            p6: parts[7],
            p7: parts[8],
            p8: parts[9],
            p9: parts[10],
            p10: parts[11],
            p11: parts[12],
            p12: parts[13],
        })
        const staticValues = { lastOnTime: "COALESCE(lastOnTime, NOW())", lastHeartbeatTime: "NOW()", status: 1 };
        switch (parts[1]) {
            case "PWR":
                //console.log(parts.join(','))
                query({ lastOnTime: 'NOW()', lastHeartbeatTime: 'NOW()', sim_number: "'" + parts[2] + "'", status: 1 }, parts[0]);
                // sequelize.query(`
                //     update MachineData set lastOnTime = NOW(), lastHeartbeatTime = NOW(), burn_status = 0, status = 1 where machineId =
                //         (select id from Machines where serial = '${parts[0]}' limit 1)
                //     `)
                break;
            case "HBT":
                query(staticValues, parts[0]);
                // sequelize.query(`
                // update MachineData set ${staticValues} where machineId =
                //         (select id from Machines where serial = '${parts[0]}' limit 1)
                //     `)
                break;
            case "STK":
                query(Object.assign({ spiral_a_status: parts[2] }, staticValues), parts[0]);
                // sequelize.query(`
                //     update MachineData set spiral_a_status = ${parts[2]}, ${staticValues} where machineId =
                //             (select id from Machines where serial = '${parts[0]}' limit 1)
                //         `)
                break;
            case "CSH":
                query(Object.assign({ cashCurrent: parts[3] }, staticValues), parts[0]);
                // sequelize.query(`
                //         update MachineData set cashCurrent = ${parts[3]}, ${staticValues} where machineId =
                //                 (select id from Machines where serial = '${parts[0]}' limit 1)
                //             `)
                break;
            case "VND":
                query(Object.assign({ qtyCurrent: parts[2] }, staticValues), parts[0]);
                // sequelize.query(`
                //         update MachineData set qtyCurrent = ${parts[2]}, ${staticValues} where machineId =
                //                 (select id from Machines where serial = '${parts[0]}' limit 1)
                //             `)
                break;
            case "BST":
                query(Object.assign({ burn_status: 1, burnCycleCurrent: parts[2] }, staticValues), parts[0]);
                // sequelize.query(`
                //         update MachineData set burn_status = 1, burnCycleCurrent = ${parts[2]}, ${staticValues} where machineId =
                //                 (select id from Machines where serial = '${parts[0]}' limit 1)
                //             `)
                break;
            case "BEN":
                query(Object.assign({ burn_status: 0, burnCycleCurrent: parts[2] }, staticValues), parts[0]);
                // sequelize.query(`
                //         update MachineData set burn_status = 0, burnCycleCurrent = ${parts[2]}, ${staticValues} where machineId =
                //                 (select id from Machines where serial = '${parts[0]}' limit 1)
                //             `)
                break;
            case "BER":
                query(Object.assign({ burn_status: 2, burnCycleCurrent: parts[2] }, staticValues), parts[0]);
                // sequelize.query(`
                //         update MachineData set burn_status = 2, burnCycleCurrent = ${parts[2]}, ${staticValues} where machineId =
                //                 (select id from Machines where serial = '${parts[0]}' limit 1)
                //             `)
                break;
            case "RST":
                query(Object.assign({ reset_ts: "'" + parts[2] + "'" }, staticValues), parts[0]);
                reset_machine(parts[2] ?? '', parts[0])
                mqttClient.publish('GVC/VM/' + parts[0], '*ACK#')
                break;
            case "SUM":
                summary(parts, staticValues, mqttClient)
                // sequelize.query(`
                //         update MachineData set burn_status = ${bstat}, spiral_a_status = ${parts[3]}, 
                //             cashCurrent = ${parts[4]}, qtyCurrent = ${parts[5]}, burnCycleCurrent = ${parts[6]}, ${staticValues} 
                //             where machineId =
                //                 (select id from Machines where serial = '${parts[0]}' limit 1)
                //             `)
                break;
            default:
                query(Object.assign({}, staticValues), parts[0]);
                // sequelize.query(`
                // update MachineData set ${staticValues} where machineId =
                //         (select id from Machines where serial = '${parts[0]}' limit 1)
                //     `)
                break;
        }
    } catch (ex) {
        console.log('Failed to parse message', ex);
        // 'Failed to parse message'
    }
}

function query(values, serial) {
    var parts = Object.keys(values).map(k => `${k} = ${values[k]}`).join(', ');
    sequelize.query(`
        update MachineData set ${parts} where machineId =
                (select id from Machines where serial = '${serial}' limit 1)
    `).catch(function (ex) {
        console.log('Error', ex);
    });
}

function reset_machine(reset_ts, serial) {
    sequelize.query(`
        update MachineData 
        set 
            cashLife = cashLife + cashCurrent, cashCurrent = 0,
            qtyLife = qtyLife + qtyCurrent, qtyCurrent = 0,
            doorLife = doorLife + doorCurrent, doorCurrent = 0,
            burnCycleLife = burnCycleLife + burnCycleCurrent, burnCycleCurrent = 0,
            reset_ts = '${reset_ts}'
        where machineId = (select id from Machines where serial = '${serial}' limit 1);
    `).catch(function (ex) {
        console.log('Error', ex);
    });
}

function reset_qty(reset_ts, serial) {
    sequelize.query(`
        update MachineData 
        set 
            qtyLife = qtyLife + qtyCurrent, qtyCurrent = 0,
            reset_ts = '${reset_ts}'
        where machineId = (select id from Machines where serial = '${serial}' limit 1);
    `).catch(function (ex) {
        console.log('Error', ex);
    });
}
function reset_cash(reset_ts, serial) {
    sequelize.query(`
        update MachineData 
        set 
            cashLife = cashLife + cashCurrent, cashCurrent = 0,
            reset_ts = '${reset_ts}'
        where machineId = (select id from Machines where serial = '${serial}' limit 1);
    `).catch(function (ex) {
        console.log('Error', ex);
    });
}
function reset_burn(reset_ts, serial) {
    sequelize.query(`
        update MachineData 
        set 
            burnCycleLife = burnCycleLife + burnCycleCurrent, burnCycleCurrent = 0,
            reset_ts = '${reset_ts}'
        where machineId = (select id from Machines where serial = '${serial}' limit 1);
    `).catch(function (ex) {
        console.log('Error', ex);
    });
}



async function summary(parts, staticValues, mqttClient) {
    var m = await Machine.findAll({ where: { serial: parts[0] } });
    if(!m[0]){
        console.log('Summary error: '+parts[0]);
        return;
    }
    var md = await MachineData.findAll({ where: { machineId: m[0].id } });
    md = md[0];
    // special SUM command with only 2 parts added
    if (parts.length!= 2)
    {
 // 121023 - 
 // there are three parameters
 // QTY - CASH - BURN
 // so there are totally three values for eact type
 // new value - current value - life value
 // now we need to only check if new value is less than current value
 // if yes, then make life value as life value + (current value or maximum value)
 // and save new value as current value

 
 //   if (Math.abs(parseInt(parts[5]) - md.qtyCurrent) > parseInt(process.env.THRESHOLD_QTY)) {
    if (parseInt(parts[5]) < md.qtyCurrent)  {
    console.log('Qty Less than previous ' + parts[0]);
        var rr = await RejectedRecord.create({
            machineId: m[0].id,
            qtyOld: md.qtyCurrent,
            qtyNew: parseInt(parts[5]),
            cashOld : 1,
            cashNew : 1,    
        });
        // removed on 211023 to ensure that figures match with zest-iot
        //reset_qty('ERR', parts[0])
    }
//    if (Math.abs(parseInt(parts[4]) - md.cashCurrent) > parseInt(process.env.THRESHOLD_CASH)) {
    if (parseInt(parts[4]) < md.cashCurrent) {
            console.log('Cash less than Previous ' + parts[0]);
        await RejectedRecord.create({
            machineId: m[0].id,
            qtyOld: md.cashCurrent,
            qtyNew: parseInt(parts[4]),
            cashOld: 2,
            cashNew: 2,
        });
        // removed on 211023 to ensure that figures match with zest-iot
        //reset_cash('ERR', parts[0])
    }
    if (parseInt(parts[6]) < md.burnCycleCurrent)  {
        console.log('Burn Cycle less than previous ' + parts[0]);
        await RejectedRecord.create({
            machineId: m[0].id,
            qtyOld: md.burnCycleCurrent,
            qtyNew: parseInt(parts[6]),
            cashOld: 3,
            cashNew: 3,
        });
        reset_burn('ERR', parts[0])
    }


    var bstat = parts[2] == 'BST' ? 1 : parts[2] == 'BEN' ? 0 : 2;
    var objUpdate = {
        burn_status: bstat,
        spiral_a_status: parts[3],
        cashCurrent: parts[4],
        qtyCurrent: parts[5],
        burnCycleCurrent: parts[6],
    }
    if (parts[7]) objUpdate["doorCurrent"] = parts[7];
    if (parts[8]) objUpdate["rssi"] = "'" + parts[8] + "'";
    query(Object.assign(objUpdate, staticValues), parts[0]);
    }
    else
       query(staticValues, parts[0]);
}
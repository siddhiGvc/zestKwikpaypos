import { Transaction, MachineData, Machine, RejectedRecord, sequelize ,TrafficLightColors,UnilineMacMapping,UnilineTransactions} from '../models';
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
    // console.log("Payload1",payload.toString());
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



const transactionBuffers = {}; // Dictionary to store buffers by SerialNumber

const parseInternal = async(payload, mqttClient,topic) => {
    // 'Parsing message - ' + payload
    try {
        let parts;
        if(payload.includes(','))
        {
            parts = payload.split(',');
        }
        else{
            parts = payload.split(':');
        }
       
      if(parts[0].includes("GVC-CUPS"))
      {
        const serial=await UnilineMacMapping.findOne({where:{SNoutput:parts[0]}})
        if(parts[1]=='G1')
        {
            if(serial)
            {
             serial.BatteryVoltage=parts[2],
             serial.BatteryCapacity=parts[3],
             serial.IpFrequency=parts[5],
             serial.OpFreuency=parts[6],
             serial.lastHeartBeatTime=new Date().toISOString(),
             await serial.save();
            }
            else{
            await UnilineMacMapping.create({
                SNoutput:parts[0],
                BatteryVoltage:parts[2],
                BatteryCapacity:parts[3],
                IpFrequency:parts[5],
                OpFreuency:parts[6],
                lastHeartBeatTime:new Date().toISOString(),


            })
           }
        }
        if(parts[1]=='G3')
            {
                if(serial)
                {
                 serial.IpVoltage1=parts[2],
                 serial.IpVoltage2=parts[3],
                 serial.IpVoltage3=parts[4],
                 serial.OpVoltage1=parts[5],
                 serial.OpVoltage2=parts[6],
                 serial.OpVoltage3=parts[7],
                 serial.Load1=parts[8],
                 serial.Load2=parts[9],
                 serial.Load3=parts[10],
                 serial.lastHeartBeatTime=new Date().toISOString(),
                 await serial.save();
                }
                else{
                await UnilineMacMapping.create({
                    SNoutput:parts[0],
                    IpVoltage1:parts[2],
                    IpVoltage2:parts[3],
                    IpVoltage3:parts[4],
                    OpVoltage1:parts[5],
                    OpVoltage2:parts[6],
                    OpVoltage3:parts[7],
                    Load1:parts[8],
                    Load2:parts[9],
                    Load3:parts[10],
                    lastHeartBeatTime:new Date().toISOString(),
                })
               }
            }

            if(parts[1]=='I')
                {
                    if(serial)
                    {
                     serial.Company=parts[2],
                     serial.Model=parts[3],
                     serial.Version=parts[4],
                     serial.lastHeartBeatTime=new Date().toISOString(),
                     await serial.save();
                    }
                    else{
                    await UnilineMacMapping.create({
                        SNoutput:parts[0],
                        Company:parts[2],
                        Model:parts[3],
                        Version:parts[4],
                        lastHeartBeatTime:new Date().toISOString(),
                    })
                   }
                }

                if(parts[1]=='GF')
                    {
                        if(serial)
                        {
                         serial.RectiferNeutral=parts[2],
                         serial.RectfierPhase=parts[3],
                         serial.RectiferTopology=parts[4],
                         serial.RectfierFrequency=parts[5],

                         serial.BypassNeutral=parts[6],
                         serial.BypassPhase=parts[7],
                         serial.BypassTopology=parts[8],
                         serial.BypassFrequency=parts[9],

                         serial.OutputNeutral=parts[6],
                         serial.OutputPhase=parts[7],
                         serial.OutputTopology=parts[8],
                         serial.OutputFrequency=parts[9], 

                         serial.UpsBatteryVoltage=parts[10],
                         serial.PowerRating=parts[11]
                         serial.lastHeartBeatTime=new Date().toISOString(),
                       
                         await serial.save();
                        }
                        else{
                        await UnilineMacMapping.create({
                            SNoutput:parts[0],
                            RectiferNeutral:parts[2],
                            RectfierPhase:parts[3],
                            RectiferTopology:parts[4],
                            RectfierFrequency:parts[5],
   
                            BypassNeutral:parts[6],
                            BypassPhase:parts[7],
                            BypassTopology:parts[8],
                            BypassFrequency:parts[9],
   
                            OutputNeutral:parts[6],
                            OutputPhase:parts[7],
                            OutputTopology:parts[8],
                            OutputFrequency:parts[9], 
                           
                            UpsBatteryVoltage:parts[10],
                            PowerRating:parts[11],
                            lastHeartBeatTime:new Date().toISOString(),
                           
                        })
                       }
                    }
       
    }

        
       
        events.pubsub.on('getResponse1',(SerialNumber,callback) => {
          
          
             
                var parts = payload.split(' ');
               
                console.log("parts",parts);
                    if(parts[parts.length-2]==SerialNumber && parts[parts.length-1]=='G1')
                    {
                    console.log('GOT the G1 Response');
                    console.log("length",parts.length);
                    events.pubsub.removeAllListeners('getResponse1');
                    callback(parts);
                    }
                    else{
                        events.pubsub.removeAllListeners('getResponse1');
                        callback(' ');  
                    }                  
                    
                 
                
              
             
              
             
          
        });
        events.pubsub.on('getResponse2',(SerialNumber,callback) => {
          
          
            console.log(1);
            console.log("Payload2",payload)
            var parts = payload.split(' ');
           
            console.log("parts",parts);
            
            if(parts[parts.length-2]==SerialNumber && parts[parts.length-1]=='G2')
            {
                console.log('GOT the G2 Response');
                console.log("length",parts.length);
                events.pubsub.removeAllListeners('getResponse2');
                callback(parts);
                
            }
            else{
                events.pubsub.removeAllListeners('getResponse2');
                callback(' ');
            }
         
          
         
      
    });
    events.pubsub.on('getResponse3',(SerialNumber,callback) => {
          
        
        console.log("Payload2",payload)
        var parts = payload.split(' ');
       
        console.log("parts",parts);
       
        if(parts[parts.length-2]==SerialNumber && parts[parts.length-1]=='G3')
            {
            console.log('GOT the G3 Response');
            console.log("parts",parts.length);
            events.pubsub.removeAllListeners('getResponse3');
            callback(parts);
            }
            else{
                events.pubsub.removeAllListeners('getResponse3');
                callback(' ');

            }
            
        
     });
     events.pubsub.on('getResponse4',(SerialNumber,callback) => {
          
          
        console.log(1);
        console.log("Payload2",payload)
        var parts = payload.split(' ');
      
        console.log("parts",parts);
        if(parts[parts.length-2]==SerialNumber && parts[parts.length-1]=='I')
        {
            events.pubsub.removeAllListeners('getResponse4');
            callback(parts);
            
        }
        else{
            events.pubsub.removeAllListeners('getResponse4');
            callback(' ');

        }
    
     });
     events.pubsub.on('getResponse5',(SerialNumber,callback) => {
          
          
        console.log(1);
        console.log("Payload2",payload)
        var parts = payload.split(' ');
    
        console.log("parts",parts);
        console.log("length",parts.length,12);
        if(parts[parts.length-2]==SerialNumber && parts[parts.length-1]=='GF')
            {
                events.pubsub.removeAllListeners('getResponse5');
                callback(parts);
                
            }
            else{
                events.pubsub.removeAllListeners('getResponse5');
                callback(' ');

            }
     });

     events.pubsub.on('getResponse6',(SerialNumber,callback) => {
          
          
        console.log(1);
        console.log("Payload2",payload)
        var parts = payload.split(' ');
      
        console.log("parts",parts);
      
        if(parts[parts.length-2]==SerialNumber && parts[parts.length-1]=='Q')
            {
                events.pubsub.removeAllListeners('getResponse6');
                callback(parts);
                
            }
            else{
                events.pubsub.removeAllListeners('getResponse6');
                callback(' ');

            }
     });

     events.pubsub.on('getResponse7',(SerialNumber,callback) => {
          
          
        console.log(1);
        console.log("Payload2",payload)
        var parts = payload.split(' ');
        
        console.log("parts",parts);
      
        if(parts[parts.length-2]==SerialNumber && parts[parts.length-1]=='Q1')
            {
                events.pubsub.removeAllListeners('getResponse7');
                callback(parts);
                
            }
            else{
                events.pubsub.removeAllListeners('getResponse7');
                callback(' ');

            }
     });

     events.pubsub.on('getResponse8',(callback) => {
          
          
        console.log(1);
        console.log("Payload2",payload)
        var parts = payload.split(' ');
        events.pubsub.removeAllListeners('getResponse8');
        console.log("parts",parts);
        callback(parts);
     });


     events.pubsub.on('getResponse9',(callback) => {
          
          
        console.log(1);
        console.log("Payload2",payload)
        var parts = payload.split(' ');
        events.pubsub.removeAllListeners('getResponse9');
        console.log("parts",parts);
        callback(parts);
     });

     events.pubsub.on('getResponse10',(callback) => {
          
          
        console.log(1);
        console.log("Payload2",payload)
        var parts = payload.split(' ');
        events.pubsub.removeAllListeners('getResponse11');
        console.log("parts",parts);
        callback(parts);
     });

     events.pubsub.on('getResponse12',(callback) => {
          
          
        console.log(1);
        console.log("Payload2",payload)
        var parts = payload.split(' ');
        events.pubsub.removeAllListeners('getResponse12');
        console.log("parts",parts);
        callback(parts);
     });

     events.pubsub.on('getResponse13',(callback) => {
          
          
        console.log(1);
        console.log("Payload2",payload)
        var parts = payload.split(' ');
        events.pubsub.removeAllListeners('getResponse13');
        console.log("parts",parts);
        callback(parts);
     });
    
       

       
        
        
           
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
 
    if (parseInt(parts[5]) < md.qtyCurrent)  {
    console.log('Qty Less than previous ' + parts[0]);
        var rr = await RejectedRecord.create({
            machineId: m[0].id,
            qtyOld: md.qtyCurrent,
            qtyNew: parseInt(parts[5]),
            cashOld : 1,
            cashNew : 1,    
        });
      
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
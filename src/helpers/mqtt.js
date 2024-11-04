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
        const parts = payload.split(' ');
        const SerialNumber= parts[parts.length-2];
        const data=await UnilineMacMapping.findOne({where:{SNoutput:SerialNumber}});
        const messageType = parts[parts.length - 1];

        if (!transactionBuffers[SerialNumber]) {
            transactionBuffers[SerialNumber] = { G1: null, G2: null, G3: null, I: null, GF: null ,isSaving:null};
        }

        const buffer = transactionBuffers[SerialNumber];
    if (messageType === 'G1') buffer.G1 = parts.toString();
    else if (messageType === 'G2') buffer.G2 = parts.toString();
    else if (messageType === 'G3') buffer.G3 = parts.toString();
    else if (messageType === 'I') buffer.I = parts.toString();
    else if (messageType === 'GF') buffer.GF = parts.toString();

        if(data && parts[parts.length-1]=='G1')
            {
              
                data.G1=parts.toString();
                data.lastHeartBeatTime=new Date().toISOString();
                await data.save();
    
              
            }
        if(data && parts[parts.length-1]=='G2')
        {
            let Data1=parts[0].split('');
            let Data2=parts[1].split('');
            let  status = '';
            if(Data1[6] =='1' && Data2[7]== '1')
            {
              status='ON'
            }
            else{
              status='OFF'
            }
            
            sequelize.query('INSERT INTO InverterStatusLog (status) VALUES (?)', {
                replacements: [status],
                type: sequelize.QueryTypes.INSERT
              });
              
            data.G2=parts.toString();
            data.lastHeartBeatTime=new Date().toISOString();
            await data.save();

          
        }
      
            if(data && parts[parts.length-1]=='G3')
                {
                   
                    data.G3=parts.toString();
                    data.lastHeartBeatTime=new Date().toISOString();
                    await data.save();
        
                  
                }
                if(data && parts[parts.length-1]=='I')
                    {
                       
                        data.I=parts.toString();
                        data.lastHeartBeatTime=new Date().toISOString();
                        await data.save();
            
                      
                    }

                    if(data && parts[parts.length-1]=='GF')
                        {
                           
                            console.log(data.GF);
                            data.GF=parts.toString();
                            data.lastHeartBeatTime=new Date().toISOString();
                            await data.save();
                
                          
                        }

                        if (buffer.G1 && buffer.G2 && buffer.G3 && buffer.I && buffer.GF &&!buffer.isSaving) {
                            console.log("UnilineTransaction saved for SerialNumber:", SerialNumber);
                            buffer.isSaving=true
                            // Save transaction for this SerialNumber
                            await UnilineTransactions.create({
                                G1: buffer.G1,
                                G2: buffer.G2,
                                G3: buffer.G3,
                                I: buffer.I,
                                GF: buffer.GF,
                                SNoutput: SerialNumber
                            });
                    
                            buffer.G1 = null;
                            buffer.G2 = null;
                            buffer.G3 = null;
                            buffer.I = null;
                            buffer.GF = null;
                            buffer.isSaving = false; // Reset the saving flag
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
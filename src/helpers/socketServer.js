const net = require("net");
const moment=require("moment");
const {sequelize,MacMapping,Transaction}=require("../models");
var events = require('../helpers/events');
const { sendV } = require("../controllers/KwikPay/macAddress");

const port = 6666;
let TID=Math.floor(Math.random() * 100000) + 1;
let y=1;
let intervals = [];

function getDateTime(){

  const date = new Date();

const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const year = date.getFullYear();

const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');
const seconds = String(date.getSeconds()).padStart(2, '0');

const formattedDate = `${day}-${month}-${year}`;
const formattedTime = `${hours}-${minutes}-${seconds}`;

const formattedDateTime = `${formattedDate} ${formattedTime}`;

 return formattedDateTime;


}

//console.log(getDateTime());

function sendData(socket,count,socketNumber) {
    // Construct message
    const message = `Count:${count}-${socketNumber}`;
    // console.log(message)
    // Send message
    socket.write(message+"\n");
  
   
    // const success=socket.write('Hello, server!');
   
    // Increment count
     count++;
    if(count>7)
    {
        count=1;
    }

    // Reset count to 0 if it reaches 1000
  
}

async function sendVend(socket,tid,name) {
  // Construct message
  const message = `*V:${tid}:${y}:${y}#`;

  await socket.write(message+"\n");
  socket.write(message+"\n");
  //socket.write("*RST#");
  
  
 
  // const success=socket.write('Hello, server!');
 
  // Increment count
   y++;
  if(y>7)
  {
      y=1;
  }

  // Reset count to 0 if it reaches 1000

}

async function sendClear(socket,name) {
  // Construct message
  const message = `*TC?#`;
 
  await socket.write(message+"\n");
   
  //  await socket.write("*TV?#\n")
  
  // const success=socket.write('Hello, server!');
 
  // Increment count
  
  // Reset count to 0 if it reaches 1000

}

function sendReset(socket,name) {
    // Construct message
    const message = `*RST:${name}:${getDateTime()}#`;
    console.log("Resetting connection")
    // Send message
    socket.write(message+"\n");
    // const success=socket.write('Hello, server!');
   
  
  
}

function sendINHOutput(socket,port,value,name){
    const message = `*INH:${name}:${getDateTime()}:${value}#`;
  
    socket.write(message+"\n");

}

const setIntervalAndStore = (callback, interval) => {
  const intervalId = setInterval(callback, interval);
  intervals.push(intervalId);
  return intervalId;
};

const clearAllIntervals = () => {
  intervals.forEach(intervalId => clearInterval(intervalId));
  intervals = [];
};




const server = net.createServer((socket) => {
    console.log("Client connected");
     const { remoteAddress, remotePort } = socket;
     
     let count=0;
     socket.write(`Connectecd From Client:${remotePort}`); 
  // setInterval(() => {
        
     //  sendData(socket,count++,remotePort);
    //}, 10000);

    events.pubsub.on('sendINHOutput', function(output,port,name) {
       
         let value=0;
         if(output==true)
         {
           value=1;
         }
           console.log(value,port);
           console.log(remotePort);
       
        if(remotePort == port) {
        console.log("port matched");
          sendINHOutput(socket,port,value,name);
        }
      });

      events.pubsub.on('sendFota', function(output,port,name,type) {
      console.log('FOTA',output,port);
      
       if(remotePort == port) {
         console.log('FOTA SEND');
         if(type=="old")
          {
            socket.write(`*FOTA#`);
          }
          else{
            socket.write(`*FOTA:${name}:${getDateTime()}#`);
          }
        
       }
     });

     events.pubsub.on('sendReset', function(port,name) {
     
        
         if(remotePort == port) {
           sendReset(socket,name);
         }
       });

       events.pubsub.on('sendTC', function(port,name) {
     
        
        if(remotePort == port) {
            socket.write(`*TC?#`);
        }
      });

       events.pubsub.on('sendV', function(port,pin,pulse,name) {
     
        
        if(remotePort == port) {
          socket.write(`*V:${TID++}:${pin}:${pulse}`);
        }
      });

      events.pubsub.on('sendFW', function(port,name) {
     
        
        if(remotePort == port) {
          console.log("FW sent");
          socket.write(`*FW?#`);
        }
      });
      events.pubsub.on('sendTV', function(port,name) {
     
        
        if(remotePort == port) {
          socket.write(`*TV?#`);
        }
      });

      events.pubsub.on('sendFotaUrl', function(port,url,name) {
     
        
        if(remotePort == port) {
          socket.write(`*URL:${name}:${getDateTime()}:${url}#`);
          console.log(`*URL:${name}:${getDateTime()}:${url}# sent`)
        }
      });
      events.pubsub.on('askUrl', function(port,name) {
     
        
        if(remotePort == port) {
          socket.write(`*URL?#`);
        }
      });

      events.pubsub.on('sendCC', function(port,name) {
     
        
        if(remotePort == port) {
          socket.write(`*CC:${name}:${getDateTime()}#`);
        }
      });

      events.pubsub.on('sendLight', function(port,light,postion,name) {
     
        
        if(remotePort == port) {
          socket.write(`*SL:${name}:${getDateTime()}:${light}:${postion}#`);
        }
      });

      events.pubsub.on('sendHBT', function(port,value,name) {
     
        
        if(remotePort == port) {
          socket.write(`*HBT:${value}#`);
        }
      });

      events.pubsub.on('sendSIP', function(port,ip,pin,name) {
     
        
        if(remotePort == port) {
          socket.write(`*SIP:${name}:${getDateTime()}:${ip}:${pin}#`);
        }
      });

      events.pubsub.on('sendSSID', function(port,ssid,name) {
     
        
        if(remotePort == port) {
          socket.write(`*SS:${name}:${getDateTime()}:${ssid}#`);
        }
      });

      events.pubsub.on('sendPWD', function(port,pwd,name) {
     
        
        if(remotePort == port) {
          socket.write(`*PW:${name}:${getDateTime()}:${pwd}`);
        }
      });

      events.pubsub.on('sendSSID1', function(port,ssid,name) {
     
        
        if(remotePort == port) {
          socket.write(`*SS1:${name}:${getDateTime()}:${ssid}#`);
        }
      });

      events.pubsub.on('sendPWD1', function(port,pwd,name) {
     
        
        if(remotePort == port) {
          socket.write(`*PW1:${name}:${getDateTime()}:${pwd}#`);
        }
      });
      events.pubsub.on('sendCA', function(port,num,polarity,name) {
     
        
        if(remotePort == port) {
          socket.write(`*CA:${name}:${getDateTime()}:${num}:${polarity}#`);
        }
      });

      events.pubsub.on('askCA', function(port,name) {
     
        
        if(remotePort == port) {
          socket.write(`*CA?#`);
        }
      });

      events.pubsub.on('modeTest1', async function(port,name) {
        
        
        if(remotePort == port) {
      
          await setTimeout(()=>{

            socket.write(`*CC:${name}:${getDateTime()}#`);

          },500)
          await setTimeout(()=>{
            socket.write(`*TC?#`);
            socket.write(`*TV?#`);
             setIntervalAndStore(() => {
              sendClear(socket,name);
             },5000)
          },2000)
       
        
         
        }
      });
      events.pubsub.on('modeTest2',async function(port,name) {
       
        
        if(remotePort == port) {
          await setTimeout(()=>{

            socket.write(`*CC:${name}:${getDateTime()}#`);

          },500)
        
          await setTimeout(()=>{
            socket.write(`*TC?#`);
            socket.write(`*TV?#`);
             setIntervalAndStore(() => {
              sendVend(socket,TID++,name);
            },3000)
          },2000)
      
         
         
        }
      });

      events.pubsub.on('modeNone', function(port,name) {
      
        if(remotePort == port) {
          clearAllIntervals();
       
        }
      });



   
    const socketNumber = `${remotePort}`;
    
    console.log(remoteAddress,remotePort);

    socket.on("data",async (data) => {
       
        const strData = data.toString();
        console.log(`Received: ${strData}`);
        if(strData.includes("*") || strData.includes("#"))
            {
             console.log(strData);
              //var cleaned = /^\**(.*?)\#*$/.exec(`**${strData}##`);
              const splitWithStar=strData.split('*');
              const splitWithHash=splitWithStar[1].split('#');
              const cleaned=splitWithHash[0];
              
    
        const command = cleaned.split(",");
        console.log(command[0]);
        
        if(command[0]=="MAC")
        {
            //console.log("Timer Started");
            // await setTimeout(()=>{
            //    console.log("Resetting Connection");
            //    socket.write(`*RST#`);
            // },10000)
            const address=command[1];
            console.log(`Mac Adress:${address}`);
            const data=await MacMapping.findOne({where:{MacID:command[1]}});
           // console.log(data);
            if(data)
                {
                    data.SocketNumber=remotePort;
                    data.lastHeartBeatTime=new Date().toISOString();
                    await data.save();
                      await Transaction.create({
                          machine:data.UID,
                          command:command[0],
                          p1:command[1],
                          p2:command[2],
                          p3:command[3],
                          p4:command[4]
                      })
                       console.log("Saved In Transactions");
                }
           
          
        } 
        else  if(command[0].includes("INH"))
            {
              
                console.log("inh received");
                const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
              
                if(data)
                    {
                      
                        data.INHinput=parseInt(command[1]);
                        data.lastHeartBeatTime=new Date().toISOString();
                        await data.save();
                          await Transaction.create({
                              machine:data.UID,
                              command:command[0],
                              p1:command[1],
                              p2:command[2],
                              p3:command[3],
                              p4:command[4]
                          })
                           console.log("Saved In Transactions");
                    }
               
              
            } 
            else  if(command[0]=="RST-OK")
                {
                  
                    
                    const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                  
                    if(data)
                        {
                          
                            data.RstMessage=command[0];
                            data.lastHeartBeatTime=new Date().toISOString();
                            await data.save();
                          
                              await Transaction.create({
                                  machine:data.UID,
                                  command:command[0],
                                  p1:command[1],
                                  p2:command[2],
                                  p3:command[3],
                                  p4:command[4]
                              })
                               console.log("Saved In Transactions");
                               setTimeout(()=>{
                                data.RstMessage='';
                              
                               data.save();
  
                              },3000)
                        }
                   
                  
         } 
         else  if(command[0].includes("FOTA"))
            {
              
                
                const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
              
                if(data)
                    {
                      
                        data.FotaMessage=command[0];
                        data.lastHeartBeatTime=new Date().toISOString();
                        await data.save();
                          await Transaction.create({
                              machine:data.UID,
                              command:command[0],
                              p1:command[1],
                              p2:command[2],
                              p3:command[3],
                              p4:command[4]
                          })
                           console.log("Saved In Transactions");
                           setTimeout(()=>{
                            data.FotaMessage='';
                          
                           data.save();

                          },3000)
                    }
               
              
            } 
            else  if(command[0].includes("V") && !command[0].includes("TV"))
                {
                  
                    
                    const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                  
                    if(data)
                        {
                          
                            data.Voutput=command[0];
                            data.lastHeartBeatTime=new Date().toISOString();
                            await data.save();
                              await Transaction.create({
                                  machine:data.UID,
                                  command:command[0],
                                  p1:command[1],
                                  p2:command[2],
                                  p3:command[3],
                                  p4:command[4]
                              })
                               console.log("Saved In Transactions");
                               setTimeout(()=>{
                                data.Voutput='';
                              
                               data.save();
  
                              },3000)
                        }
                   
                  
                }
                else  if(command[0].includes("TC"))
                    {
                      
                        
                        const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                      
                        if(data)
                            {
                              
                                data.TCoutput=strData;
                                data.lastHeartBeatTime=new Date().toISOString();
                                await data.save();
                                  await Transaction.create({
                                      machine:data.UID,
                                      command:command[0],
                                      p1:command[1],
                                      p2:command[2],
                                      p3:command[3],
                                      p4:command[4]
                                  })
                                   console.log("Saved In Transactions");
                                   setTimeout(()=>{
                                    data.TCoutput='';
                                  
                                   data.save();
      
                                  },3000)
                            }
                       
                      
                    }
                    
                  else  if(command[0].includes("TV"))
                    {
                      
                       // console.log(remotePort);
                        const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                       // console.log(data);
                        if(data)
                            {
                              
                                data.TVoutput=strData;
                                data.lastHeartBeatTime=new Date().toISOString();
                                await data.save();
                                  await Transaction.create({
                                      machine:data.UID,
                                      command:command[0],
                                      p1:command[1],
                                      p2:command[2],
                                      p3:command[3],
                                      p4:command[4]
                                  })
                                   console.log("Saved In Transactions");
                                   setTimeout(()=>{
                                    data.TVoutput='';
                                  
                                   data.save();
      
                                  },3000)
                            }
                       
                      
                    }
                    else  if(command[0].includes("Kwikpay"))
                    {
                      
                       // console.log(remotePort);
                       
                        const FWoutput=command[0].split('-');
                        
                       
                        const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                       // console.log(data);
                        if(data)
                            {
                              
                                data.FWoutput=FWoutput[1];
                                data.lastHeartBeatTime=new Date().toISOString();
                                await data.save();
                                setTimeout(()=>{
                                  data.FWoutput='';
                                
                                 data.save();
    
                                },3000)
                                  await Transaction.create({
                                      machine:data.UID,
                                      command:command[0],
                                      p1:command[1],
                                      p2:command[2],
                                      p3:command[3],
                                      p4:command[4]
                                  })
                                   console.log("Saved In Transactions");
                                 
                            }
                       
                      
                    }
                     else  if(command[0].includes("SL"))
                    {
                      
                       // console.log(remotePort);
                       
                      
                        
                       
                        const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                       // console.log(data);
                        if(data)
                            {
                              
                                data.Soutput=command[0];
                                data.lastHeartBeatTime=new Date().toISOString();
                                await data.save();
                                setTimeout(()=>{
                                  data.Soutput='';
                                
                                 data.save();
    
                                },3000)
                                  await Transaction.create({
                                      machine:data.UID,
                                      command:command[0],
                                      p1:command[1],
                                      p2:command[2],
                                      p3:command[3],
                                      p4:command[4]
                                  })
                                   console.log("Saved In Transactions");
                                  
                            }
                       
                      
                    }
                      else  if(command[0]=="URL-OK")
                    {
                      
                       // console.log(remotePort);
                       
                      
                        
                       
                        const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                       // console.log(data);
                        if(data)
                            {
                              
                                data.FotaURLoutput=command[0];
                                data.lastHeartBeatTime=new Date().toISOString();
                                await data.save();
                                setTimeout(()=>{
                                  data.FotaURLoutput='';
                                
                                 data.save();
    
                                },3000)
                                  await Transaction.create({
                                      machine:data.UID,
                                      command:command[0],
                                      p1:command[1],
                                      p2:command[2],
                                      p3:command[3],
                                      p4:command[4]
                                  })
                                   console.log("Saved In Transactions");
                                 
                            }
                       
                      
                    }
                      else  if(command[0].includes("URL"))
                    {
                      
                       // console.log(remotePort);
                       
                      
                        
                       
                        const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                       // console.log(data);
                        if(data)
                            {
                              
                                data.URLoutput=command[1];
                                data.lastHeartBeatTime=new Date().toISOString();
                                await data.save();
                                  await Transaction.create({
                                      machine:data.UID,
                                      command:command[0],
                                      p1:command[1],
                                      p2:command[2],
                                      p3:command[3],
                                      p4:command[4]
                                  })
                                   console.log("Saved In Transactions");
                                   setTimeout(()=>{
                                    data.URLoutput='';
                                  
                                   data.save();
      
                                  },3000)
                            }
                       
                      
                    }
                        else  if(command[0]=="CC-OK")
                    {
                      
                       // console.log(remotePort);
                       
                      
                        
                       
                        const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                      // console.log(data);
                        if(data)
                            {
                              
                                data.Coutput=command[0];
                                data.lastHeartBeatTime=new Date().toISOString();
                                await data.save();
                                setTimeout(()=>{
                                  data.Coutput='';
                                
                                 data.save();
    
                                },3000)
                                  await Transaction.create({
                                      machine:data.UID,
                                      command:command[0],
                                      p1:command[1],
                                      p2:command[2],
                                      p3:command[3],
                                      p4:command[4]
                                  })
                                   console.log("Saved In Transactions");
                                 
                            }
                       
                      
                    }
                    else  if(command[0]=="SIP-OK")
                      {
                        
                         // console.log(remotePort);
                         
                        
                          
                         
                          const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                        // console.log(data);
                          if(data)
                              {
                                
                                  data.SIPoutput=command[0];
                                  data.lastHeartBeatTime=new Date().toISOString();
                                  await data.save();
                                  setTimeout(()=>{
                                    data.SIPoutput='';
                                  
                                   data.save();
      
                                  },3000)
                                    await Transaction.create({
                                        machine:data.UID,
                                        command:command[0],
                                        p1:command[1],
                                        p2:command[2],
                                        p3:command[3],
                                        p4:command[4]
                                    })
                                     console.log("Saved In Transactions");
                                   
                              }
                         
                        
                      }
                      else  if(command[0]=="SS-OK")
                        {
                          
                           // console.log(remotePort);
                           
                          
                            
                           
                            const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                          // console.log(data);
                            if(data)
                                {
                                  
                                    data.SSIDoutput=command[0];
                                    data.lastHeartBeatTime=new Date().toISOString();
                                    await data.save();
                                    setTimeout(()=>{
                                      data.SSIDoutput='';
                                    
                                     data.save();
        
                                    },3000)
                                      await Transaction.create({
                                          machine:data.UID,
                                          command:command[0],
                                          p1:command[1],
                                          p2:command[2],
                                          p3:command[3],
                                          p4:command[4]
                                      })
                                       console.log("Saved In Transactions");
                                   
                                }
                           
                          
                        }
                        else  if(command[0]=="SS1-OK")
                          {
                            
                             // console.log(remotePort);
                             
                            
                              
                             
                              const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                             //console.log(data);
                              if(data)
                                  {
                                    
                                      data.SSID1output=command[0];
                                      data.lastHeartBeatTime=new Date().toISOString();
                                      await data.save();
                                      setTimeout(()=>{
                                        data.SSID1output='';
                                      
                                       data.save();
          
                                      },3000)
                                        await Transaction.create({
                                            machine:data.UID,
                                            command:command[0],
                                            p1:command[1],
                                            p2:command[2],
                                            p3:command[3],
                                            p4:command[4]
                                        })
                                         console.log("Saved In Transactions");
                                        
                                  }
                             
                            
                          }
                           else  if(command[0]=="PW-OK")
                          {
                            
                             // console.log(remotePort);
                             
                            
                              
                             
                              const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                             //console.log(data);
                              if(data)
                                  {
                                    
                                      data.PWDoutput=command[0];
                                      data.lastHeartBeatTime=new Date().toISOString();
                                      await data.save();
                                      setTimeout(()=>{
                                        data.PWDoutput='';
                                      
                                       data.save();
          
                                      },3000)
                                        await Transaction.create({
                                            machine:data.UID,
                                            command:command[0],
                                            p1:command[1],
                                            p2:command[2],
                                            p3:command[3],
                                            p4:command[4]
                                        })
                                         console.log("Saved In Transactions");
                                      
                                  }
                             
                            
                          }
                           else  if(command[0]=="PW1-OK")
                          {
                            
                             // console.log(remotePort);
                             
                            
                              
                             
                              const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                             //console.log(data);
                              if(data)
                                  {
                                    
                                      data.PWD1output=command[0];
                                      data.lastHeartBeatTime=new Date().toISOString();
                                      await data.save();
                                      setTimeout(()=>{
                                        data.PWD1output='';
                                      
                                       data.save();
          
                                      },3000)
                                        await Transaction.create({
                                            machine:data.UID,
                                            command:command[0],
                                            p1:command[1],
                                            p2:command[2],
                                            p3:command[3],
                                            p4:command[4]
                                        })
                                         console.log("Saved In Transactions");
                                       
                                  }
                             
                            
                          }
                          else  if(command[0]=="CA-OK")
                            {
                              
                               // console.log(remotePort);
                               
                              
                                
                               
                                const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
                               //console.log(data);
                                if(data)
                                    {
                                      
                                        data.CAoutput=strData;
                                        data.CAmessage=strData;
                                        data.lastHeartBeatTime=new Date().toISOString();
                                        await data.save();
                                        setTimeout(()=>{
                                          data.CAoutput='';
                                          data.CAmessage='';
                                         data.save();
            
                                        },3000)
                                          await Transaction.create({
                                              machine:data.UID,
                                              command:command[0],
                                              p1:command[1],
                                              p2:command[2],
                                              p3:command[3],
                                              p4:command[4]
                                          })
                                           console.log("Saved In Transactions");
                                         
                                    }
                               
                              
                            }

                   
                   
                else{


            const data=await MacMapping.findOne({where:{SocketNumber:remotePort}});
           // console.log(data);
            if(data)
            {
                data.lastHeartBeatTime=new Date();
                await data.save();
            await Transaction.create({
                machine:data.UID,
                command:command[0],
                p1:command[1],
                p2:command[2],
                p3:command[3],
                p4:command[4]
            })
             console.log("Saved In Transactions");
            }

        }
        const operator = command[0];
        
      
        let result;

        switch (operator) {
           
        }
       }

       await socket.write(`RemotePort From Server:${remotePort}`);
    });

    socket.on("end", () => {
        console.log("Client disconnected");
    });

    socket.on("error", (error) => {
        console.log(`Socket Error: ${error.message}`);
    });
});

server.on("error", (error) => {
    console.log(`Server Error: ${error.message}`);
});

server.listen(port, () => {
    console.log(`TCP socket server is running on port: ${port}`);
});
const net = require("net");
const moment=require("moment");
const {sequelize,MacMapping,Transaction}=require("../models");
var events = require('../helpers/events')

const port = 6666;
const TID=10;

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

function sendReset(socket) {
    // Construct message
    const message = `*RST#`;
    console.log("Resetting connection")
    // Send message
    socket.write(message+"\n");
    // const success=socket.write('Hello, server!');
   
  
  
}

function sendINHOutput(socket,port,value){
    const message = `*INH:${value}#`;
  
    socket.write(message+"\n");

}




const server = net.createServer((socket) => {
    console.log("Client connected");
     const { remoteAddress, remotePort } = socket;
     
     let count=0;
     socket.write(`Connectecd From Client:${remotePort}`); 
  // setInterval(() => {
        
     //  sendData(socket,count++,remotePort);
    //}, 10000);

    events.pubsub.on('sendINHOutput', function(output,port) {
       
         let value=0;
         if(output==true)
         {
           value=1;
         }
           console.log(value,port);
           console.log(remotePort);
       
        if(remotePort == port) {
        console.log("port matched");
          sendINHOutput(socket,port,value);
        }
      });

      events.pubsub.on('sendFota', function(output,port) {
      console.log('FOTA',output,port);
      
       if(remotePort == port) {
         console.log('FOTA SEND');
         socket.write(`*FOTA#`);
       }
     });

     events.pubsub.on('sendReset', function(port) {
     
        
         if(remotePort == port) {
           socket.write(`*RST#`);
         }
       });

       events.pubsub.on('sendV', function(port,pin,pulse) {
     
        
        if(remotePort == port) {
          socket.write(`*V:${TID++}:${pin}:${pulse}`);
        }
      });

   
    const socketNumber = `${remotePort}`;
    
    console.log(remoteAddress,remotePort);

    socket.on("data",async (data) => {
       
        const strData = data.toString();
        console.log(`Received: ${strData}`);
        if(strData.includes("*") || strData.includes("#"))
            {
           
              //var cleaned = /^\**(.*?)\#*$/.exec(`**${strData}##`);
              const splitWithStar=strData.split('*');
              const splitWithHash=splitWithStar[1].split('#');
              const cleaned=splitWithHash[0];
              
    
        const command = cleaned.split(",");
     
        
        if(command[0]=="MAC")
        {
            //console.log("Timer Started");
            // await setTimeout(()=>{
            //    console.log("Resetting Connection");
            //    socket.write(`*RST#`);
            // },10000)
            const address=command[1];
            console.log(`Mac Adress:${address}`);
            const data=await MacMapping.findOne({where:{MacID:address}});
            if(data)
                {
                    data.SocketNumber=remotePort;
                    data.lastHeartBeatTime=new Date().toISOString();
                    await data.save();
                      await Transaction.create({
                          machine:data.UID,
                          command:command[0],
                          p1:command[1],
                          p2:command[2]
                      })
                       console.log("Saved In Transactions");
                }
           
          
        } 
        else  if(command[0]=="INH-DONE")
            {
                //console.log("Timer Started");
                // await setTimeout(()=>{
                //    console.log("Resetting Connection");
                //    socket.write(`*RST#`);
                // },10000)
              
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
                              p2:command[2]
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
                p2:command[2]
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
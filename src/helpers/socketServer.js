const net = require("net");
const {sequelize,MacMapping,Transaction}=require("../models");


const port = 6666;

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




const server = net.createServer((socket) => {
    console.log("Client connected");
     const { remoteAddress, remotePort } = socket;
     
     let count=0;
     socket.write(`Connectecd From Client:${remotePort}`); 
  // setInterval(() => {
        
     //  sendData(socket,count++,remotePort);
    //}, 10000);

   

   
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
            console.log("Timer Started");
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
                    await data.save();
                }
           
          
        }  
        else{

            const address=command[1];
            console.log(`Mac Adress:${address}`);
            const data=await MacMapping.findOne({where:{MacID:address}});
            await Transaction.create({
                machine:data.UID,
                command:command[0],
                p1:command[2],
                p2:command[3]
            })

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
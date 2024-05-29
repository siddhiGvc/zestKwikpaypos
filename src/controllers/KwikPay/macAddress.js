const {MacMapping} =require("../../models")
var events = require('../../helpers/events')

export const getAllMacAddress=async(req,res)=>{
    try{
    
       
        const obj = await MacMapping.findAll();
         res.status(200).json({data:obj})

    }
    catch(err){
        console.log(err);
        res.status(505).json({status:505})

    }

}


export const saveINHoutput=async(req,res)=>{
    try{
        console.log(req.body);
        const output=req.body.outPutValue;
        events.pubsub.emit('sendINHOutput',output,req.body.socketNumber,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
        if(obj)
            {
                obj.INHoutput=output ? 1:0
                await obj.save();
            }
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendFota=async(req,res)=>{
    try{
        console.log(req.body);
        const output=req.body.outPutValue;
        events.pubsub.emit('sendFota',output,req.body.socketNumber,req.body.UserName,req.body.type) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendReset=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendReset',req.body.socketNumber,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendV=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendV',req.body.socketNumber,req.body.Pin,req.body.Pulse,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendTC=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendTC',req.body.socketNumber,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendFW=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendFW',req.body.socketNumber,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }


}
export const sendTV=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendTV',req.body.socketNumber,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendFotaUrl=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendFotaUrl',req.body.socketNumber,req.body.Url,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const askUrl=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('askUrl',req.body.socketNumber,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendCC=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendCC',req.body.socketNumber,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendLight=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendLight',req.body.socketNumber,req.body.light,req.body.position,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendHBT=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendHBT',req.body.socketNumber,req.body.value,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendCA=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendCA',req.body.socketNumber,req.body.numValue,req.body.polarity,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const askCA=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('askCA',req.body.socketNumber,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendSIP=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendSIP',req.body.socketNumber,req.body.Ip,req.body.Pin,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendSSID=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendSSID',req.body.socketNumber,req.body.SSID,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendPWD=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendPWD',req.body.socketNumber,req.body.PWD,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendSSID1=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendSSID1',req.body.socketNumber,req.body.SSID1,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const sendPWD1=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('sendPWD1',req.body.socketNumber,req.body.PWD1,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const modeTest1=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('modeTest1',req.body.socketNumber,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const modeTest2=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('modeTest2',req.body.socketNumber,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}

export const modeNone=async(req,res)=>{
    try{
        
      
        events.pubsub.emit('modeNone',req.body.socketNumber,req.body.UserName) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}
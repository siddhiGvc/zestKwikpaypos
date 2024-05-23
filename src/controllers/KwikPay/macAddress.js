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
        events.pubsub.emit('sendINHOutput',output,req.body.socketNumber) ;
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
        events.pubsub.emit('sendFota',output,req.body.socketNumber) ;
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
        
      
        events.pubsub.emit('sendReset',req.body.socketNumber) ;
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
        
      
        events.pubsub.emit('sendV',req.body.socketNumber,req.body.Pin,req.body.Pulse) ;
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
        
      
        events.pubsub.emit('sendTC',req.body.socketNumber) ;
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
        
      
        events.pubsub.emit('sendFW',req.body.socketNumber) ;
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
        
      
        events.pubsub.emit('sendTV',req.body.socketNumber) ;
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
        
      
        events.pubsub.emit('sendFotaUrl',req.body.socketNumber,req.body.Url) ;
        const obj = await MacMapping.findOne({where:{MacID:req.body.MacId}});
       
        res.status(200).json({data:obj})
  
    }
    catch(err)
    {
        console.log(err);
        res.status(505).json({status:505})
    }

}
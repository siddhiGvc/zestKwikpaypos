const {MacMapping} =require("../../models")


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
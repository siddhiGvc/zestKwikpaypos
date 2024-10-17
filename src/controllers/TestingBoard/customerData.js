import { sequelize,UnilineCustomerData} from '../../models';
import dotenv from 'dotenv'
import { successResponse, errorResponse, uniqueId } from '../../helpers';
const { Op } = require("sequelize");
const moment = require('moment');
dotenv.config();

export const updateUnilineCustomerData=async(req,res)=>{
    try{

        const data=await UnilineCustomerData.findOne({where:{id:req.query.id}});
        if(data)
        {
            await sequelize.query(
                `UPDATE UnilineCustomerData
                 SET \`CustomerName\`=:Customer,
                     \`CInfo1\`=:City1,
                     \`CInfo2\`=:City2,
                     \`CInfo3\`=:City3,
                     \`CInfo4\`=:City4,
                     \`MachineType\`=:MachineType

                 WHERE id= :ID`,
                {
                  replacements: {
                     ID:req.query.id,
                     Customer:req.body.CustomerName,
                     City1:req.body.CInfo1,
                     City2:req.body.CInfo2,
                     City3:req.body.CInfo3,
                     City4:req.body.CInfo4,
                     MachineType:req.body.MachineType
                  },
                  type: sequelize.QueryTypes.UPDATE,
                }
              );

        }
       
        res.status(200).json("Okay");

    }
    catch(err){
        console.log(err);
        res.status(505).json("Error")

    }

}


export const postUnilineCustomerData=async(req,res)=>{
    try{

        await UnilineCustomerData.create({
            CustomerName:req.body.CustomerName,
            CInfo1:req.body.CInfo1,
            CInfo2:req.body.CInfo2,
            CInfo3:req.body.CInfo3,
            CInfo4:req.body.CInfo4,
          
            
           
         })

         res.status(200).json("Okay");

    }
    catch(err){
        res.status(505).json("Error")
    }
}




export const getAllUnilineCustomerData=async(req,res)=>{
    try{
    
      
        const obj = await UnilineCustomerData.findAll();
         res.status(200).json({data:obj})

    }
    catch(err){
        console.log(err);
        res.status(505).json({status:505})

    }

}

export const getUnilineCustomerDataByName=async(req,res)=>{
    try{
    
      
        const obj = await UnilineCustomerData.findAll({where:{CustomerName:req.body.clientName}});
         res.status(200).json({data:obj})

    }
    catch(err){
        console.log(err);
        res.status(505).json({status:505})

    }

}

export const deleteById = async (req, res) => {
    try {
    
      await UnilineCustomerData.destroy({ where: { id: req.query.id } });
      return successResponse(req, res, {});
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  };

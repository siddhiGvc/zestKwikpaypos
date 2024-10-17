import { sequelize,UnilineCustomerInfo} from '../../models';
import dotenv from 'dotenv'
import { successResponse, errorResponse, uniqueId } from '../../helpers';
const { Op } = require("sequelize");
const moment = require('moment');
dotenv.config();

export const updateUnilineCustomerInfo=async(req,res)=>{
    try{
        console.log(req.query.id);
        const data=await UnilineCustomerInfo.findOne({where:{id:req.query.id}});
        if(data)
        {
            await sequelize.query(
                `UPDATE UnilineCustomerInfo
                 SET \`CustomerName\`=:Customer,
                     \`City\`=:City
                    
                   

                 WHERE id= :ID`,
                {
                  replacements: {
                     ID:req.query.id,
                     Customer:req.body.CustomerName,
                     City:req.body.City,
                   
                   

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

export const postUnilineCustomerInfo=async(req,res)=>{
    try{

        await UnilineCustomerInfo.create({
            CustomerName:req.body.CustomerName,
            City:req.body.City,
           
         })

         res.status(200).json("Okay");

    }
    catch(err){
        res.status(505).json("Error")
    }
}



export const getAllUnilineCustomerInfo=async(req,res)=>{
    try{
    
      
        const obj = await UnilineCustomerInfo.findAll();
         res.status(200).json({data:obj})

    }
    catch(err){
        console.log(err);
        res.status(505).json({status:505})

    }

}

export const getUnilineCustomerInfoByName=async(req,res)=>{
    try{
    
      
        const obj = await UnilineCustomerInfo.findAll({where:{CustomerName:req.body.clientName}});
         res.status(200).json({data:obj})

    }
    catch(err){
        console.log(err);
        res.status(505).json({status:505})

    }

}

export const deleteById = async (req, res) => {
    try {
    
      await UnilineCustomerInfo.destroy({ where: { id: req.query.id } });
      return successResponse(req, res, {});
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  };

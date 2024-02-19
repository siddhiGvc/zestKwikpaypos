import { sequelize,CustomerInfo} from '../../models';
import dotenv from 'dotenv'
import { successResponse, errorResponse, uniqueId } from '../../helpers';
const { Op } = require("sequelize");
const moment = require('moment');
dotenv.config();

export const updateCustomerInfo=async(req,res)=>{
    try{
        console.log(req.query.id);
        const data=await CustomerInfo.findOne({where:{id:req.query.id}});
        if(data)
        {
            await sequelize.query(
                `UPDATE CustomerInfo
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
        else
        {
            await CustomerInfo.create({
                UserName:req.body.userName,
                TotalQty:req.body.qty,
                TotalCash:req.body.cash
             })
        }
        res.status(200).json("Okay");

    }
    catch(err){
        console.log(err);
        res.status(505).json("Error")

    }

}

export const postCustomerInfo=async(req,res)=>{
    try{

        await CustomerInfo.create({
            CustomerName:req.body.CustomerName,
            City:req.body.City,
           
         })

         res.status(200).json("Okay");

    }
    catch(err){
        res.status(505).json("Error")
    }
}



export const getAllCustomerInfo=async(req,res)=>{
    try{
    
      
        const obj = await CustomerInfo.findAll();
         res.status(200).json({data:obj})

    }
    catch(err){
        console.log(err);
        res.status(505).json({status:505})

    }

}

export const deleteById = async (req, res) => {
    try {
    
      await CustomerInfo.destroy({ where: { id: req.query.id } });
      return successResponse(req, res, {});
    } catch (error) {
      return errorResponse(req, res, error.message);
    }
  };

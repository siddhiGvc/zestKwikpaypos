import { sequelize,totalInventory,InventoryTransactions} from '../../models';
import dotenv from 'dotenv'
import { successResponse, errorResponse, uniqueId } from '../../helpers';
const { Op } = require("sequelize");
const moment = require('moment');
dotenv.config();

export const updateTotalInventory=async(req,res)=>{
    try{
        console.log(req.body);
        const data=await totalInventory.findOne({where:{UserName:req.body.userName}});
        if(data)
        {
            await sequelize.query(
                `UPDATE totalInventory
                 SET \`TotalQty\`=:qty,
                     \`TotalCash\`=:cash
                 WHERE UserName = :userName`,
                {
                  replacements: {
                     userName:req.body.userName,
                     qty:req.body.qty,
                     cash:req.body.cash

                  },
                  type: sequelize.QueryTypes.UPDATE,
                }
              );

        }
        else
        {
            await totalInventory.create({
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


export const updateInventroyTransactions=async(req,res)=>{
    try{
        console.log(req.body);

        await InventoryTransactions.create({
            From:req.body.from,
            To:req.body.to,
            QtyDelivered:req.body.qtyDelivered,
            CashReceived:req.body.cashReceived,
            Remark:req.body.remark

        })
        const From=await totalInventory.findOne({where:{UserName:req.body.from}});
     
        if(From)
        {
            const Quantity1 = parseInt(From.dataValues.TotalQty)-parseInt(req.body.qtyDelivered);
            const Cash1 = parseInt(From.dataValues.TotalCash)+parseInt(req.body.cashReceived);
            
            console.log(From.dataValues, Quantity1, Cash1);
            await sequelize.query(
                `UPDATE totalInventory
                 SET TotalQty=:qty,
                     TotalCash=:cash
                 WHERE UserName = :userName`,
                {
                  replacements: {
                     userName:req.body.from,
                     qty:Quantity1.toString(),
                     cash:Cash1.toString()
    
                  },
                  type: sequelize.QueryTypes.UPDATE,
                }
              );
    

        }
        const To=await totalInventory.findOne({where:{UserName:req.body.to}});
      
        if(To)
        {
            const Quantity2 = parseInt(To.dataValues.TotalQty) + parseInt(req.body.qtyDelivered);
            const Cash2 = parseInt(To.dataValues.TotalCash) - parseInt(req.body.cashReceived);
            
            console.log(To.dataValues, Quantity2, Cash2);
            await sequelize.query(
                `UPDATE totalInventory
                 SET TotalQty=:qty,
                     TotalCash=:cash
                 WHERE UserName = :userName`,
                {
                  replacements: {
                     userName:req.body.to,
                     qty:Quantity2.toString(),
                     cash:Cash2.toString()
    
                  },
                  type: sequelize.QueryTypes.UPDATE,
                }
              );
    

        }


      
      
          
          

          res.status(200).json({status:200});
        

    }
    catch(err){
        console.log(err);
        res.status(505).json({status:505})
        
    }


}

export const getAllTransactions=async(req,res)=>{
    try{
    
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const obj = await InventoryTransactions.findAll({
            where: {
                createdAt: { [Op.between]: [req.body.startDate, moment(req.body.endDate).add(1, 'day')] }
              },
              order: [['createdAt', 'ASC'], ['id', 'ASC']],
            });
         res.status(200).json({data:obj})

    }
    catch(err){
        console.log(err);
        res.status(505).json({status:505})

    }

}

export const getAllStocks=async(req,res)=>{
    try{
        const data=await totalInventory.findAll();
        res.status(200).json({data:data});

    }
    catch(err){
        console.log(err);
        res.status(505).json({status:505})

    }

}

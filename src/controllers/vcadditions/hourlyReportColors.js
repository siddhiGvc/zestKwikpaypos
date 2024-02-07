import { sequelize,colorSettings} from '../../models';
import dotenv from 'dotenv'
import { successResponse, errorResponse, uniqueId } from '../../helpers';
const { Op } = require("sequelize");
const moment = require('moment');
dotenv.config();

export const getColors=async(req,res)=>{
    try{
        const data=await colorSettings.findOne({where:{id:1}});
        res.status(200).json(data);

    }
    catch(err){
        console.log(err);
        res.status(505).json("Error")

    }

}


export const updateColors=async(req,res)=>{
    try{

        await sequelize.query(
            `UPDATE colorSettings
             SET \`Primary\`=:primary,
                 \`Secondary\`=:secondary,
                 \`Tertiary\`=:tertiary,
                 \`Faulty\`=:faulty,
                 \`Range1\`=:range1,
                 \`Range2\`=:range2,
                 \`Range3\`=:range3,
                 \`Range4\`=:range4

             WHERE id = 1`,
            {
              replacements: {
                primary: req.body.primary,
                secondary: req.body.secondary,
                tertiary: req.body.tertiary,
                faulty: req.body.faulty,
                range1:req.body.range1,
                range2:req.body.range2,
                range3:req.body.range3,
                range4:req.body.range4,
              },
              type: sequelize.QueryTypes.UPDATE,
            }
          );
          
          

          res.status(200).json({status:200});
        

    }
    catch(err){
        console.log(err);
        res.status(505).json({status:505})
        
    }


}

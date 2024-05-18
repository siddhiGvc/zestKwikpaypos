import { sequelize, MachineData } from '../../models';
import dotenv from 'dotenv'
dotenv.config()



import { successResponse, errorResponse, uniqueId } from '../../helpers';

export const getAddData=async(req,res)=>{
    try{
        console.log("Adding")
        console.log(req.body.quantity);
        console.log(req.body.collection);
        console.log(req.body.cycles);
        console.log(req.body.zones);
        console.log(req.body.wards);
        console.log(req.body.beats);

        const cities = req.body.cities.map(city => sequelize.escape(city)).join(',');

        try {
            // var machineId = req.query.machineId;
            const [obj, metadata] = await sequelize.query(`
            select SUM(qtyCurrent+qtyLife) from MachineData  
            where machineID in (select id from Machines where data1 in (${cities}));
          `);
            console.log("*******1")
            console.log(obj);
            if (!obj.length) throw "Unable to find entry";
          
             //res.status(200).json("ok")
             //return successResponse(req, res, obj[0]);
          } catch (error) {
            console.log(error)
             //return errorResponse(req, res, error.message);
             //res.status(500).json(err)
          }

          try {
            // var machineId = req.query.machineId;
            const [obj, metadata] = await sequelize.query(`
            select SUM(cashCurrent+cashLife) from MachineData  
            where machineID in (select id from Machines where data1 in (${cities}));
          `);
          console.log("*******2")
          console.log(obj);
            if (!obj.length) throw "Unable to find entry";
          
            // res.status(200).json("ok")
            // return successResponse(req, res, obj[0]);
          } catch (error) {
            console.log(error)
            // return errorResponse(req, res, error.message);
            // res.status(500).json(err)
          }


          try {
              var splitWards = `${req.body.wards}`.split(',');
              splitWards = splitWards.join(`','`);
              
              if ((req.body.beats == null) || (req.body.beats == undefined)  || (req.body.beats == [''])  || (req.body.beats.length == 0) )
              {
                var mySQLQuery = `
                update MachineData set qtyLIfe = (qtyLife + ${req.body.quantity}) , cashLife = (cashLife+ ${req.body.quantity*process.env.PAD_PRICE}) ,
                burnCycleLife = (burnCycleLife+${req.body.cycles})  
                where machineID in (select id from Machines where data1 in (${cities})
                and zone in (${req.body.zones}) 
                and ward in ('${splitWards}') 
                );`
              }  
              else
              {
                var mySQLQuery = `
                update MachineData set qtyLIfe = (qtyLife + ${req.body.quantity}) , cashLife = (cashLife+ ${req.body.quantity*process.env.PAD_PRICE}) ,
                burnCycleLife = (burnCycleLife+${req.body.cycles})  
                where machineID in (select id from Machines where data1 in (${cities})
                and beat in (${req.body.beats})            
                );`
              }                
              console.log("*******3")
  
              console.log(mySQLQuery);
              
              const [obj, metadata] = await sequelize.query(mySQLQuery);
          } catch (error) {
            console.log(error)
            // return errorResponse(req, res, error.message);
            // res.status(500).json(err)
          }
          try {
            // var machineId = req.query.machineId;
            const [obj, metadata] = await sequelize.query(`
            select SUM(qtyCurrent+qtyLife) from MachineData  
            where machineID in (select id from Machines where data1 in (${cities}));
          `);
          console.log("*******4")

            console.log(obj);
            if (!obj.length) throw "Unable to find entry";
          
            // res.status(200).json("ok")
            // return successResponse(req, res, obj[0]);
          } catch (error) {
            console.log(error)
            // return errorResponse(req, res, error.message);
            // res.status(500).json(err)
          }
          try {
            // var machineId = req.query.machineId;
            const [obj, metadata] = await sequelize.query(`
            select SUM(cashCurrent+cashLife) from MachineData  
            where machineID in (select id from Machines where data1 in (${cities}));
          `);
          console.log("*******5")

            console.log(obj);
            if (!obj.length) throw "Unable to find entry";
          
            // res.status(200).json("ok")
            // return successResponse(req, res, obj[0]);
          } catch (error) {
            console.log(error)
            // return errorResponse(req, res, error.message);
            // res.status(500).json(err)
          }
       
          res.status(200).json("ok")

    }
    catch(err){
         console.log(err)
         res.status(500).json(err)
    }

}

export const getSubstarctData=async(req,res)=>{
    try{
        console.log("Substracting")
        console.log(req.body.quantity);
        console.log(req.body.collection);
        console.log(req.body.cycles);
        console.log(req.body.zones);
        console.log(req.body.wards);
        console.log(req.body.beats);

        try {
          // var machineId = req.query.machineId;
          const [obj, metadata] = await sequelize.query(`
          select SUM(qtyCurrent+qtyLife) from MachineData  
          where machineID in (select id from Machines where data1 = 'Mumbai');
        `);
          console.log(obj);
          if (!obj.length) throw "Unable to find entry";
        
          // res.status(200).json("ok")
          // return successResponse(req, res, obj[0]);
        } catch (error) {
          // return errorResponse(req, res, error.message);
          // res.status(500).json(err)
        }

        try {
          // var machineId = req.query.machineId;
          const [obj, metadata] = await sequelize.query(`
          select SUM(cashCurrent+cashLife) from MachineData  
          where machineID in (select id from Machines where data1 = 'Mumbai');
        `);
          console.log(obj);
          if (!obj.length) throw "Unable to find entry";
        
          // res.status(200).json("ok")
          // return successResponse(req, res, obj[0]);
        } catch (error) {
          // return errorResponse(req, res, error.message);
          // res.status(500).json(err)
        }


        try {
          var splitWards = `${req.body.wards}`.split(',');
          splitWards = splitWards.join(`','`);
          
          if ( (req.body.beats == null) || (req.body.beats == undefined)  || (req.body.beats == [''])  || (req.body.beats == []) )
          {
             var mySQLQuery = `
            update MachineData set qtyLIfe = (qtyLife - ${req.body.quantity}) , cashLife = (cashLife- ${req.body.quantity*process.env.PAD_PRICE}) ,
            burnCycleLife = (burnCycleLife-${req.body.cycles})  
            where machineID in (select id from Machines where data1 = 'Mumbai'
            and zone in (${req.body.zones}) 
            and ward in ('${splitWards}') 
            );`
          }  
          else
          {
            var mySQLQuery = `
            update MachineData set qtyLIfe = (qtyLife - ${req.body.quantity}) , cashLife = (cashLife- ${req.body.quantity*process.env.PAD_PRICE}) ,
            burnCycleLife = (burnCycleLife-${req.body.cycles})  
            where machineID in (select id from Machines where data1 = 'Mumbai'
            and beat in (${req.body.beats})            
            );`

          }
          
          console.log(mySQLQuery);
          
          const [obj, metadata] = await sequelize.query(mySQLQuery);
      } catch (error) {
          // return errorResponse(req, res, error.message);
          // res.status(500).json(err)
        }
        try {
          // var machineId = req.query.machineId;
          const [obj, metadata] = await sequelize.query(`
          select SUM(qtyCurrent+qtyLife) from MachineData  
          where machineID in (select id from Machines where data1 = 'Mumbai');
        `);
          console.log(obj);
          if (!obj.length) throw "Unable to find entry";
        
          // res.status(200).json("ok")
          // return successResponse(req, res, obj[0]);
        } catch (error) {
          // return errorResponse(req, res, error.message);
          // res.status(500).json(err)
        }
        try {
          // var machineId = req.query.machineId;
          const [obj, metadata] = await sequelize.query(`
          select SUM(cashCurrent+cashLife) from MachineData  
          where machineID in (select id from Machines where data1 = 'Mumbai');
        `);
          console.log(obj);
          if (!obj.length) throw "Unable to find entry";
        
          // res.status(200).json("ok")
          // return successResponse(req, res, obj[0]);
        } catch (error) {
          // return errorResponse(req, res, error.message);
          // res.status(500).json(err)
        }
     
        res.status(200).json("ok")

        
    }
    catch(err){
        console.log("error")
        res.status(500).json(err)
    }

}



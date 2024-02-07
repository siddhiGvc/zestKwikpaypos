const colorRouter=require("express").Router();
const { getColors, updateColors } = require("../controllers/vcadditions/hourlyReportColors");


colorRouter.get("/getColors",getColors);
colorRouter.post("/updateColors",updateColors);

module.exports=colorRouter;
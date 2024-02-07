const paytmRouter=require("express").Router();
const {getPaytmMessage,getPaytmMessagesList}=require("../controllers/vcadditions/paytm.controllers");

paytmRouter.post("/",getPaytmMessage);
paytmRouter.post("/get",getPaytmMessagesList);

module.exports=paytmRouter;
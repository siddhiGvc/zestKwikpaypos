const customerRouter=require("express").Router();
import * as CustomeDataController  from "../../controllers/TestingBoard/customerData";
import * as CustomeInfoController  from "../../controllers/TestingBoard/customerInfo";




customerRouter.get("/getAllCustomerInfo",CustomeInfoController.getAllUnilineCustomerInfo);
customerRouter.get("/getAllCustomerData",CustomeDataController.getAllUnilineCustomerData);
customerRouter.post("/updateCustomerData",CustomeDataController.updateUnilineCustomerData);
customerRouter.post("/updateCustomerInfo",CustomeInfoController.updateUnilineCustomerInfo);
customerRouter.get("/deleteCustomerInfo",CustomeInfoController.deleteById);
customerRouter.get("/deleteCustomerData",CustomeDataController.deleteById);
customerRouter.post("/postCustomerInfo",CustomeInfoController.postUnilineCustomerInfo);
customerRouter.post("/postCustomerData",CustomeDataController.postUnilineCustomerData);

customerRouter.post("/getCustomerDataByName",CustomeDataController.getUnilineCustomerDataByName);
customerRouter.post("/getCustomerInfoByName",CustomeInfoController.getUnilineCustomerInfoByName);

module.exports=customerRouter;
const inventoryRouter=require("express").Router();
const {getAllTransactions,updateInventroyTransactions,updateTotalInventory,getAllStocks}=require("../controllers/Inventory/inventry")



inventoryRouter.post("/getAllTransactions",getAllTransactions);
inventoryRouter.get("/getAllStocks",getAllStocks);
inventoryRouter.post("/updateTransactions",updateInventroyTransactions);
inventoryRouter.post("/updateStock",updateTotalInventory);

module.exports=inventoryRouter;
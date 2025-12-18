const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware"); 
const clientController = require("../controller/client.controller");
const validateClient=require("../validator/clientSchema");
router.use(authMiddleware); 

router.post("/", validateClient, clientController.createClient); 
router.get("/dropdown", clientController.getClientsForDropdown);     
router.get("/", clientController.getClients);         
router.get("/:id", clientController.getClientById);   
router.patch("/:id", clientController.updateClient);  
router.delete("/:id", clientController.deleteClient);
module.exports = router;

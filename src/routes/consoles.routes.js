const express = require('express')

//controllers
const { 
    getItems, 
    createItem, 
    getItem, 
    updateItem, 
    deleteItem,
} = require('../controllers/consoles');

//validators
const { consoleValidator } = require('../validators/consoles');

//middleware
const { consoleExists } = require('../middlewares/consoles');

const consolesRouter = express.Router()

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
consolesRouter.get("/",getItems);
consolesRouter.get("/:id", consoleExists,getItem);
consolesRouter.post("/", consoleValidator,createItem);
consolesRouter.patch("/:id", consoleExists,updateItem);
consolesRouter.delete("/:id", consoleExists,deleteItem);

module.exports = { consolesRouter };
const express = require('express')

//controllers
const { 
    getItems, 
    createItem, 
    getItem, 
    updateItem, 
    deleteItem, 
    loginItem
} = require('../controllers/users');

//validators
const { userValidator } = require('../validators/users');

//middleware
const { userExists } = require('../middlewares/users');
const { userVerify } = require('../middlewares/verify');

const usersRouter = express.Router()

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
usersRouter.get("/",getItems);
usersRouter.get("/:id", userExists,getItem);
usersRouter.post("/signup", userValidator,createItem);
usersRouter.post("/login",loginItem);
usersRouter.patch("/:id", userExists, userVerify,updateItem);
usersRouter.delete("/:id", userExists, userVerify,deleteItem);

module.exports = { usersRouter };
const express = require('express')

//controllers
const { 
    getItems, 
    createItem, 
    getItem, 
    updateItem, 
    deleteItem,
} = require('../controllers/games');

//validators
const { gameValidator } = require('../validators/games');

//middleware
const { gameExists } = require('../middlewares/games');
const { createReview } = require('../controllers/reviews');

const gamesRouter = express.Router()

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
gamesRouter.get("/",getItems);
gamesRouter.get("/:id", gameExists,getItem);
gamesRouter.post("/", gameValidator,createItem);
gamesRouter.post("/reviews/:gameId", createReview);
gamesRouter.patch("/:id", gameExists,updateItem);
gamesRouter.delete("/:id", gameExists,deleteItem);

module.exports = { gamesRouter };
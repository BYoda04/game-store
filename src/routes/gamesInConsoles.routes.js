const express = require('express')

//controllers
const { 
    createItem
} = require('../controllers/gamesInConsoles');

//validators
const { gamesInConsolesValidator } = require('../validators/gamesInConsoles');

const gamesInConsolesRouter = express.Router()

// htttp://localhost:port/api/v1/roles GET,POST,DELET,PUT
gamesInConsolesRouter.post("/", gamesInConsolesValidator,createItem);

module.exports = { gamesInConsolesRouter };
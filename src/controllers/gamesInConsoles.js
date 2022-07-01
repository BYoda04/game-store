
// Models
const { GamesInConsoles } = require('../models/gamesInConsoles');

// Utils
const { catchAsync } = require('../utils/catchAsync');

const createItem = catchAsync(async (req, res, next) => {
	const { gameId,consoleId } = req.body;

	const newRelation = await GamesInConsoles.create({
		gameId,
        consoleId
	});

	res.status(201).json({
		status: 'success',
		newRelation,
	});
});

module.exports = {
	createItem,
};
// Models
const { Consoles } = require('../models/consoles');
const { Games } = require('../models/games');
const { Reviews } = require('../models/reviews');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { verifyToken } = require('../utils/verifyToken');

const gameExists = catchAsync(async (req, res, next) => {
	verifyToken

	const { id } = req.params;

	const game = await Games.findOne({ 
		where: { 
			id,
			status:'active'
		},
		include:[Consoles,Reviews]
	});

	if (!game) {
		return next(new AppError('Game not found', 404));
	}

	req.game = game;
	next();
});

module.exports = { gameExists };
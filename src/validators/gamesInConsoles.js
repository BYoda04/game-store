const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Array has errors
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const gamesInConsolesValidator = [
	body('gameId').isNumeric().withMessage('Game cannot be empty'),
	body('consoleId').isNumeric().withMessage('Console cannot be empty'),
	checkResult,
];

module.exports = { gamesInConsolesValidator };
// Models
const { Consoles } = require('../models/consoles');
const { Games } = require('../models/games');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { verifyToken } = require('../utils/verifyToken');

const consoleExists = catchAsync(async (req, res, next) => {
	verifyToken

	const { id } = req.params;

	const console = await Consoles.findOne({ 
		where: { 
			id,
			status:'active'
		 },
		include:Games
	});

	if (!console) {
		return next(new AppError('Console not found', 404));
	}

	req.console = console;
	next();
});

module.exports = { consoleExists };
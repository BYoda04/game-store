const jwt = require('jsonwebtoken');

// Models
const { Reviews } = require('../models/reviews');
const { Users } = require('../models/users');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const createReview = catchAsync(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(" ")[1];
	};

	if (!token) {
		return next(new AppError('Invalid token', 403))
	}

	const decoded = await jwt.verify(token, process.env.JWT_SIGN);

	const user = await Users.findOne({
		where: {
			id: decoded.id,
			status: 'active'
		}
	})

	if (!user) {
		return next(new AppError('The owner this token doesnt exist anymore',403))
	}

    const { gameId } = req.params
	const { comment } = req.body;

	const newReview = await Reviews.create({
		userId:decoded.id,
        gameId,
        comment
	});

	res.status(201).json({
		status: 'success',
		newReview,
	});
});

module.exports = {
	createReview,
};
// Models
const { Reviews } = require('../models/reviews');
const { Users } = require('../models/users');

// Utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const userExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await Users.findOne({ 
		where: { 
			id,
			status:'active'
		 },
		include:Reviews,
		attributes:['id','name','email','status','createdAt','updatedAt']
	});

	if (!user) {
		return next(new AppError('User not found', 404));
	}

	req.user = user;
	next();
});

module.exports = { userExists };
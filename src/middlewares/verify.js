const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
const jwt = require('jsonwebtoken');

const userVerify = catchAsync(async (req,res,next)=>{
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(" ")[1];
	};

	if (!token) {
		return next(new AppError('Invalid token', 403))
	}

	const decoded = await jwt.verify(token, process.env.JWT_SIGN);

    const { id } = req.params;

    const verify = parseInt(id) === decoded.id;

    if (!verify) {
        return next(new AppError('You dont have permission',403));
    };

    next();
});

module.exports = { userVerify };
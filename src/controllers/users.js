const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const { Users } = require('../models/users');
const { Reviews } = require('../models/reviews')
const { AppError } = require('../utils/appError');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { verifyToken } = require('../utils/verifyToken');

const getItems = catchAsync(async (req, res, next) => {
	verifyToken

	const data = await Users.findAll({
		where:{status:'active'},
		include:Reviews,
		attributes:['id','name','email','status','createdAt','updatedAt']
	});

	res.status(200).json({
		status: 'success',
		data
	});
});

const getItem = catchAsync(async (req, res, next) => {
	verifyToken

	const { user } = req;

	res.status(200).json({
		status: 'success',
		user,
	});
});

const createItem = catchAsync(async (req, res, next) => {
	const { name, email, password } = req.body;

	const salt = await bcrypt.genSalt(12);
	const encryptPass = await bcrypt.hash(password,salt);

	const newUser = await Users.create({
		name,
		email,
		password: encryptPass,
	});

	newUser.password = undefined

	res.status(201).json({
		status: 'success',
		newUser,
	});
});

const loginItem = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await Users.findOne({
		where:{ 
			email,
			status:'active' 
		}
	});

	if (!user) {
		return next(new AppError('User not exist',404));
	};

	const validPass = await bcrypt.compare(password,user.password);

	if (!validPass) {
		next(new AppError('Invalid password',404));
	};

	const token = jwt.sign({ id:user.id }, process.env.JWT_SIGN, { 
		expiresIn: '5m',
	 });

	res.status(200).json({
		status:'succes',
		token
	});
});

const updateItem = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { name,email } = req.body;

	await user.update({ name,email });

	res.status(204).json({ status: 'success' });
});

const deleteItem = catchAsync(async (req, res, next) => {
	const { user } = req;
 
	await user.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getItems,
	createItem,
	getItem,
	updateItem,
	deleteItem,
	loginItem
};
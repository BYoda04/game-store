const jwt = require('jsonwebtoken');

// Models
const { Consoles } = require('../models/consoles');
const { Games } = require('../models/games');
const { Users } = require('../models/users');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { verifyToken } = require('../utils/verifyToken');

const getItems = catchAsync(async (req, res, next) => {
	const data = await Consoles.findAll({
		where:{status:'active'},
		include:Games
	});

	res.status(200).json({
		status: 'success',
		data
	});
});

const getItem = catchAsync(async (req, res, next) => {
	const { console } = req;

	res.status(200).json({
		status: 'success',
		console,
	});
});

const createItem = catchAsync(async (req, res, next) => {
	verifyToken

	const { name,company } = req.body;

	const newConsole = await Consoles.create({
		name,
        company
	});

	res.status(201).json({
		status: 'success',
		newConsole,
	});
});

const updateItem = catchAsync(async (req, res, next) => {

	const { console } = req;
	const { name } = req.body;

	await console.update({ name });

	res.status(204).json({ status: 'success' });
});

const deleteItem = catchAsync(async (req, res, next) => {

	const { console } = req;
 
	await console.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getItems,
	createItem,
	getItem,
	updateItem,
	deleteItem,
};
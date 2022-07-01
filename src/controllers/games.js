// Models
const { Consoles } = require('../models/consoles');
const { Games } = require('../models/games');
const { Reviews } = require('../models/reviews');
const { Users } = require('../models/users');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { verifyToken } = require('../utils/verifyToken');

const getItems = catchAsync(async (req, res, next) => {
	const data = await Games.findAll({
		where:{status:'active'},
		include:[
			{model:Consoles},
			{
				model:Reviews,
				include:Users,
				attributes:['id','comment','status','createdAt','updatedAt']
			}
		]
	});

	res.status(200).json({
		status: 'success',
		data
	});
});

const getItem = catchAsync(async (req, res, next) => {
	const { game } = req;

	res.status(200).json({
		status: 'success',
		game,
	});
});

const createItem = catchAsync(async (req, res, next) => {
	verifyToken

	const { title,genre } = req.body;

	const newGame = await Games.create({
		title,
        genre
	});

	res.status(201).json({
		status: 'success',
		newGame,
	});
});

const updateItem = catchAsync(async (req, res, next) => {

	const { game } = req;
	const { title } = req.body;

	await game.update({ title });

	res.status(204).json({ status: 'success' });
});

const deleteItem = catchAsync(async (req, res, next) => {
	
	const { game } = req;
 
	await game.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getItems,
	createItem,
	getItem,
	updateItem,
	deleteItem,
};
require('dotenv').config()
const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { gamesRouter } = require('./routes/games.routes');
const { consolesRouter } = require('./routes/consoles.routes');
const { gamesInConsolesRouter } = require('./routes/gamesInConsoles.routes');

// Global err controller
const { globalErrorHandler } = require('./utils/globalErrorHandler');

// Utils
const { AppError } = require('./utils/appError');

// Init express app
const app = express();

app.use(express.json());

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/consoles', consolesRouter);
app.use('/api/v1/gamesInConsoles', gamesInConsolesRouter);

// Handle incoming unknown routes to the server
app.all('*', (req, res, next) => {
	next(
		new AppError(
			`${req.method} ${req.originalUrl} not found in this server`,
			404
		)
	);
});

app.use(globalErrorHandler);

module.exports = { app };
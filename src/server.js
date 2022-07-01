const { app } = require('./app');

// Models
const { Users } = require('./models/users');
const { Games } = require('./models/games');
const { Consoles } = require('./models/consoles');
const { Reviews } = require('./models/reviews');
const { GamesInConsoles } = require('./models/gamesInConsoles');

// Utils
const { db } = require('./DB/db');

db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

// Establish model's relations
// 1 User <----> M Post
//has many
Users.hasMany(Reviews,{ foreignKey:'userId' });
Games.hasMany(Reviews,{ foreignKey:'gameId' })

//belongs to
Reviews.belongsTo(Users);
Reviews.belongsTo(Games);

//belongs to many
Games.belongsToMany(Consoles,{
	foreignKey:'gameId',
	through:'gamesInConsoles'
});
Consoles.belongsToMany(Games,{
	foreignKey:'consoleId',
	through:'gamesInConsoles'
});

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(4001, () => {
	console.log('Express app running!!');
});
const { db, DataTypes } = require('../DB/db');
const { Consoles } = require('./consoles');
const { Games } = require('./games');

//Model table
const GamesInConsoles = db.define('gamesInConsoles', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    gameId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Games,
            key: 'id'
        }
    },
    consoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Consoles,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
		defaultValue: 'active',
    }
});

module.exports = {
    GamesInConsoles
};
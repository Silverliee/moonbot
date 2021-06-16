const mongoose = require('mongoose');
const config = require('../config.json');

function initialiseMongoose() {
	//Mongoose initialisation
	mongoose.connect(config.MOON_DB_ACCESS,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => console.log('Connexion à mon cluster mongodb réussie !'))
		.catch(() => console.log('la connexion au cluster à échouée :('));
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
}

module.exports = {initialiseMongoose};
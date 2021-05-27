const discord = require("discord.js");
const config = require('./config.json');
const client = new discord.Client();
const mongoose = require('mongoose');
const {feedAction,addSubReddit,deleteSubReddit} = require('./Controller/RedditController');

//bot prefix
const botPrefix = ".";

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

client.on("ready", () => {
	console.log("I am ready!");
});

client.on("message", (message) => {
	if(message.author.bot) return
	if(!message.content.startsWith(botPrefix)) return;

	const commandBody = message.content.slice(botPrefix.length);
	const args = commandBody.split(' ');
	const command = args.shift().toLowerCase();

	if(command === "ping") {
		message.channel.send("pong!").then();
	}
	if(command === "reddit") {
		switch(args[0]) {
			case "run" :
				async function fetchFeed(delay) {
					const responses = await feedAction();
					for(let i = 0; i < responses.length; i++) {
						message.channel.send(responses[i]).then();
					}
					setTimeout(() => fetchFeed(delay), delay);
				}
				fetchFeed(30000).then();
				break;
			case "ajoute" :
				if(args[1] !== undefined) {
					(async() => {
						const responses = await addSubReddit(args[1]);
						for(let i = 0; i < responses.length; i++) {
							message.channel.send(responses[i]).then();
						}
					})()
				}
				else {
					message.channel.send("Il faut aussi ajouter le lien Rss du subReddit pour que je puisse le prendre en compte :confused:").then()
				}
				break
			case "supprime" :
				if(args[1] !== undefined) {
					(async() => {
						const responses = await deleteSubReddit(args[1]);
						for(let i = 0; i < responses.length; i++) {
							message.channel.send(responses[i]).then();
						}
					})()
				}
				else {
					message.channel.send("Il faut aussi ajouter le lien Rss du subReddit pour que je puisse le prendre en compte :confused:").then()
				}
				break
			default :
				message.channel.send("connais pas").then()
				break
		}
	}

});


client.login(config.MOON_TOKEN).then();
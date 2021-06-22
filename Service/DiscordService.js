const config = require('../config.json');
const discord = require("discord.js");
const client = new discord.Client();
const pingCommands = require("../Command/PingCommands")();
const redditCommands = require("../Command/RedditCommands")();
const twitchCommands = require("../Command/TwitchCommands")();
const botPrefix = ".";

function launchDiscordClient() {
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
			pingCommands.handle(message);
		}
		if(command === "reddit") {
			redditCommands.handle(message,args);
		}
		if(command === "twitch") {
			twitchCommands.handle(message,args);
		}

	});
	client.login(config.MOON_TOKEN).then();
}

module.exports = {launchDiscordClient};
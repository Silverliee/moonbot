const config = require('../config.json');
const discord = require("discord.js");
const {twitch} = require("../Command/TwitchCommands");
const client = new discord.Client();
const {ping} = require("../Command/PingCommands");
const {reddit} = require("../Command/RedditCommands");
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
			ping(message);
		}
		if(command === "reddit") {
			reddit(message,args);
		}
		if(command === "twitch") {
			twitch(message,args);
		}

	});
	client.login(config.MOON_TOKEN).then();
}

module.exports = {launchDiscordClient};
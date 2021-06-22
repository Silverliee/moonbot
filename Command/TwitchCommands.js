const twitch = require("../Controller/TwitchController")();

class TwitchCommands {
	constructor() {
	}

	handle(message, commandArguments) {
		switch(commandArguments[0]) {
			case "stream":
				(async() => {
					await twitch.stream(message, commandArguments[1]);
				})()
				break;
			case "follow":
				(async() => {
					await twitch.follow(message, commandArguments[1]);
				})()
				break
			default:
				break;
		}
	}
}

module.exports = () => {
	return new TwitchCommands();
};
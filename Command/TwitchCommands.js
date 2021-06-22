const twitch = require("../Controller/TwitchController")();

class TwitchCommands {
	constructor() {
	}

	handle(message, commandArguments) {
		switch(commandArguments[0]) {
			case "watch":
				(async() => {
					await this.watch(message,3000).then()
				})()
				break;
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

	async watch(message,delay) {
		await twitch.twitchStreamsWatcher(message);
		setTimeout(() => this.watch(message,delay),delay);
	}
}

module.exports = () => {
	return new TwitchCommands();
};
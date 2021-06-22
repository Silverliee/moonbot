const reddit = require("../Controller/RedditController")();

class RedditCommands {
	constructor() {
	}

	handle(message, commandArguments) {
		switch(commandArguments[0]) {
			case "start":
				(async() => {
					await this.fetchFeed(message, 30000).then();
				})()
				break;
			case "ajoute":
				reddit.redditAdd(message, commandArguments);
				break;
			case "supprime":
				reddit.redditDelete(message, commandArguments)
				break;
			default:
				reddit.redditWrongArgument(message);
				break;
		}
	}

	async fetchFeed(message, delay) {
		const responses = await reddit.feedAction();
		for(let i = 0; i < responses.length; i++) {
			message.channel.send(responses[i]);
		}
		setTimeout(() => this.fetchFeed(delay), delay);
	}
}

module.exports = () => {
	return new RedditCommands();
};
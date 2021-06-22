class PingCommands {
	constructor() {
	}

	handle(message) {
		message.channel.send("pong!");
	}
}

module.exports = () => {
	return new PingCommands();
};
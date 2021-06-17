const {stream} = require("../Controller/TwitchController");

function twitch(message, commandArguments) {
	switch(commandArguments[0]) {
		case "stream":
			stream(message,commandArguments[1]);
			break;
		default:
			break;
	}
}

module.exports = {twitch};
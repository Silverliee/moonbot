const {redditStart, redditAdd, redditDelete, redditWrongArgument} = require("../Controller/RedditController");

function reddit(message, commandArguments) {
	switch(commandArguments[0]) {
		case "start":
			redditStart(message);
			break;
		case "ajoute":
			redditAdd(message, commandArguments);
			break;
		case "supprime":
			redditDelete(message, commandArguments)
			break;
		default:
			redditWrongArgument(message);
			break;
	}
}

module.exports = {reddit};
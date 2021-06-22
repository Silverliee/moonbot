//Declaration part
const Parser = require('rss-parser');
const parser = new Parser();
const subRedditRssRepository = require('../Repository/SubRedditRssRepository')();
let lastPostsHistoriser = [];

class RedditController {
	constructor() {
	}

	redditAdd(message, commandArguments) {
		if(commandArguments[1] !== undefined) {
			(async() => {
				const responses = await subRedditRssRepository.addSubReddit(commandArguments[1]);
				for(let i = 0; i < responses.length; i++) {
					message.channel.send(responses[i]);
				}
			})()
		} else {
			message.channel.send("Il faut aussi ajouter le lien Rss du subReddit pour que je puisse le prendre en compte :confused:");
		}
	}

	redditDelete(message, commandArguments) {
		if(commandArguments[1] !== undefined) {
			(async() => {
				const responses = await subRedditRssRepository.deleteSubReddit(commandArguments[1]);
				for(let i = 0; i < responses.length; i++) {
					message.channel.send(responses[i]);
				}
			})()
		} else {
			message.channel.send("Il faut aussi ajouter le lien Rss du subReddit pour que je puisse le prendre en compte :confused:");
		}
	}

	redditWrongArgument(message) {
		message.channel.send("connais pas");
	}

	async feedAction() {
		let response = [];
		let followedSubReddit = await subRedditRssRepository.getSavedSubReddit();
		for(let i = 0; i < followedSubReddit.length; i++) {
			let feed = await parser.parseURL(followedSubReddit[i].rss_url);
			if(lastPostsHistoriser.length === 1) {
				lastPostsHistoriser.push({
					rssUrl: followedSubReddit[i].rss_url,
					lastPostUrl: feed.items[1]
				});
				response.push(feed.items[1].link);
			} else if(lastPostsHistoriser.some(element => element.rssUrl === followedSubReddit[i].rss_url)) {
				let objectIndex = lastPostsHistoriser.findIndex((object => object.rssUrl === followedSubReddit[i].rss_url));
				if(lastPostsHistoriser[objectIndex].lastPostUrl !== feed.items[1].link) {
					lastPostsHistoriser[objectIndex] = {
						rssUrl: followedSubReddit[i].rss_url,
						lastPostUrl: feed.items[1].link
					};
					response.push(feed.items[1].link);
				}
			} else {
				lastPostsHistoriser.push({
					rssUrl: followedSubReddit[i].rss_url,
					lastPostUrl: feed.items[1]
				});
				response.push(feed.items[1].link);
			}
		}
		return response;
	}
}


module.exports = () => {
	return new RedditController()
};
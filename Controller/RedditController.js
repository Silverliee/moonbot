//Declaration part
const Parser = require('rss-parser');
const subRedditRssModel = require('../Model/SubRedditRss');
let lastPostsHistoriser = [];
const parser = new Parser();

//CommandAction
function redditStart(message) {
	async function fetchFeed(delay) {
		const responses = await feedAction();
		for(let i = 0; i < responses.length; i++) {
			message.channel.send(responses[i]);
		}
		setTimeout(() => fetchFeed(delay), delay);
	}

	fetchFeed(30000).then();
}

function redditAdd(message, commandArguments) {
	if(commandArguments[1] !== undefined) {
		(async() => {
			const responses = await addSubReddit(commandArguments[1]);
			for(let i = 0; i < responses.length; i++) {
				message.channel.send(responses[i]);
			}
		})()
	} else {
		message.channel.send("Il faut aussi ajouter le lien Rss du subReddit pour que je puisse le prendre en compte :confused:");
	}
}

function redditDelete(message, commandArguments) {
	if(commandArguments[1] !== undefined) {
		(async() => {
			const responses = await deleteSubReddit(commandArguments[1]);
			for(let i = 0; i < responses.length; i++) {
				message.channel.send(responses[i]);
			}
		})()
	} else {
		message.channel.send("Il faut aussi ajouter le lien Rss du subReddit pour que je puisse le prendre en compte :confused:");
	}
}

function redditWrongArgument(message) {
	message.channel.send("connais pas");
}

//SubFunctions
async function addSubReddit(subRedditUrl) {
	let response = [];
	const subReddit = new subRedditRssModel({
		rss_url: subRedditUrl
	});
	if(await isSubRedditAlreadyExist(subRedditUrl)) {
		response.push("Ton subReddit avait déjà été ajouté :neutral_face:")
	} else {
		await subReddit.save()
			.then(() => response.push("Le nouveau subReddit a bien été ajouté :partying_face:"))
			.catch(error => response.push("il y a une erreur :confused: =>" + error));
	}
	return response;
}

async function deleteSubReddit(subRedditUrl) {
	let response = [];
	await subRedditRssModel.deleteOne({rss_url: subRedditUrl})
		.then(() => response.push("Le subReddit a bien été supprimé :partying_face:"))
		.catch(error => response.push("il y a une erreur :confused: =>" + error));
	return response;
}

async function isSubRedditAlreadyExist(subRedditUrl) {
	let subReddit;
	await subRedditRssModel.find({rss_url: subRedditUrl})
		.then(products => subReddit = products)
	return subReddit.length !== 0;
}

async function getSavedSubReddit() {
	let subRedditRssArray;
	await subRedditRssModel.find()
		.then(products => subRedditRssArray = products)
	return subRedditRssArray;
}

async function feedAction() {
	let response = [];
	let followedSubReddit = await getSavedSubReddit();
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

module.exports = {redditStart, redditAdd, redditDelete, redditWrongArgument};
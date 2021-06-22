const subRedditRssModel = require('../Model/SubRedditRss');

class SubRedditRssRepository {
	constructor() {
	}

	async addSubReddit(subRedditUrl) {
		let response = [];
		const subReddit = new subRedditRssModel({
			rss_url: subRedditUrl
		});
		if(await this.isSubRedditAlreadyExist(subRedditUrl)) {
			response.push("Ton subReddit avait déjà été ajouté :neutral_face:")
		} else {
			await subReddit.save()
				.then(() => response.push("Le nouveau subReddit a bien été ajouté :partying_face:"))
				.catch(error => response.push("il y a une erreur :confused: =>" + error));
		}
		return response;
	}

	async deleteSubReddit(subRedditUrl) {
		let response = [];
		await subRedditRssModel.deleteOne({rss_url: subRedditUrl})
			.then(() => response.push("Le subReddit a bien été supprimé :partying_face:"))
			.catch(error => response.push("il y a une erreur :confused: =>" + error));
		return response;
	}

	async isSubRedditAlreadyExist(subRedditUrl) {
		let subReddit;
		await subRedditRssModel.find({rss_url: subRedditUrl})
			.then(products => subReddit = products)
		return subReddit.length !== 0;
	}

	async getSavedSubReddit() {
		let subRedditRssArray;
		await subRedditRssModel.find()
			.then(products => subRedditRssArray = products)
		return subRedditRssArray;
	}
}

module.exports = () => {
	return new SubRedditRssRepository();
}
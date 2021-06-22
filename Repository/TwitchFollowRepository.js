const twitchFollowModel = require('../Model/TwitchFollow');

class TwitchFollowRepository {
	constructor() {
	}

	async getFollowedStreamer() {
		return await twitchFollowModel.find().catch(error => {
			console.log(error)
		})
	}

	async isStreamerAlreadyFollowed(streamer) {
		const response = await twitchFollowModel.find().where('streamer').equals(streamer).then(response => {
			return response
		}).catch(error => console.log(error));
		return response.length !== 0;
	}

	async followNewStreamer(streamer) {
		let isStreamerFollowed = await this.isStreamerAlreadyFollowed(streamer).then(response => {
			return response
		})
		if(!isStreamerFollowed) {
			const newFollow = new twitchFollowModel({
				'streamer': streamer,
				'status': false
			});
			newFollow.save().catch(error => {
				console.log(error)
			});
			return true;
		} else {
			return false;
		}
	}
}

module.exports = () => {
	return new TwitchFollowRepository;
}
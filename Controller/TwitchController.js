const {ApiClient} = require('twitch');
const {ClientCredentialsAuthProvider} = require('twitch-auth');
const config = require('../config.json');
const authProvider = new ClientCredentialsAuthProvider(config.TWITCH_CLIENT_ID, config.TWITCH_CLIENT_SECRET);
const apiClient = new ApiClient({authProvider});
const twitchRepository = require('../Repository/TwitchFollowRepository')();

class TwitchController {
	async isStreamLive(userName) {
		const user = await apiClient.helix.users.getUserByName(userName);
		if(!user) {
			return false;
		}
		return await user.getStream() !== null;
	}

	async stream(message, streamer) {
		const response = await this.isStreamLive(streamer);
		message.channel.send(
			response === true ? streamer + " est en live !" : streamer + " n'est pas en live :/"
		)
	}

	async follow(message, streamer) {
		let isFollowing = await twitchRepository.followNewStreamer(streamer).then(response => {
			return response
		})
		if(isFollowing) {
			message.channel.send("Le/La streamer(se) a bien été ajouté à la liste")
		} else {
			message.channel.send("Le/La streamer(se) existe déjà dans la liste")
		}
	}
}

module.exports = () => {
	return new TwitchController;
}
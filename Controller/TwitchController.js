const {ApiClient} = require('twitch');
const {ClientCredentialsAuthProvider} = require('twitch-auth');
const config = require('../config.json');
const authProvider = new ClientCredentialsAuthProvider(config.TWITCH_CLIENT_ID, config.TWITCH_CLIENT_SECRET);
const apiClient = new ApiClient({authProvider});
const twitchRepository = require('../Repository/TwitchFollowRepository')();
let watchedStreamer = []

class TwitchController {
	async twitchStreamsWatcher(message) {
		let followedStreamer = await twitchRepository.getFollowedStreamer().then(response => {
			return response
		}).catch(error => {
			console.log(error)
		});
		for(let i = 0; i < followedStreamer.length; i++) {
			let isStreamerInLive = await this.isStreamLive(followedStreamer[i].streamer).then(response => {
				return response
			}).catch(error => {
				console.log(error)
			});
			if(watchedStreamer.length === 0) {
				watchedStreamer.push(followedStreamer[i]);
				if(isStreamerInLive) {
					message.channel.send(followedStreamer[i].streamer + " est en live !")
				}
			} else if(watchedStreamer.some(element => element.streamer === followedStreamer[i].streamer)) {
				let objectIndex = watchedStreamer.findIndex((object => object.streamer === followedStreamer[i].streamer));
				if(watchedStreamer[objectIndex].status !== isStreamerInLive) {
					watchedStreamer[objectIndex].status = isStreamerInLive;
					message.channel.send(followedStreamer[i].streamer + " est en live !")
				}
			} else {
				watchedStreamer.push(followedStreamer[i]);
				if(isStreamerInLive) {
					message.channel.send(followedStreamer[i].streamer + " est en live !")
				}
			}
		}
	}

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
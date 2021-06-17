const { ApiClient } = require('twitch');
const { ClientCredentialsAuthProvider } = require('twitch-auth');
const config = require('../config.json');
const authProvider = new ClientCredentialsAuthProvider(config.TWITCH_CLIENT_ID, config.TWITCH_CLIENT_SECRET);
const apiClient = new ApiClient({ authProvider });

async function isStreamLive(userName) {
	const user = await apiClient.helix.users.getUserByName(userName);
	if (!user) {
		return false;
	}
	return await user.getStream() !== null;
}

function stream(message, streamer) {
	(async() => {
		const response = await isStreamLive(streamer);
		message.channel.send(
			response === true ? streamer + " est en live !" : streamer + " n'est pas en live :/"
		)
	})()

}

module.exports = {stream};
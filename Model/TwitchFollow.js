const mongoose = require('mongoose');

const twitchFollow = new mongoose.Schema({
	streamer: String,
	status: Boolean
})

module.exports = mongoose.model('twitchFollow', twitchFollow);
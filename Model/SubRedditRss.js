const mongoose = require('mongoose')
const {Schema} = require('mongoose');

const subRedditRss = new Schema({
		rss_url: String,
	}
)

module.exports = mongoose.model('SubRedditRss', subRedditRss);
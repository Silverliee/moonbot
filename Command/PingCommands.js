const Discord = require('discord.js');

function ping(message) {
	const neaping = new Discord.MessageEmbed()
		.setColor('#385b55')
		.setTitle('Mohamed test')
		.setURL('https://github.com/Silverliee/moonbot')
		.setAuthor('Moon Bot')
		.setDescription('test description for moon ping commande ?')
		.setThumbnail('https://imgur.com/a/yFEwwrd')
		.attachFiles(['../moonbot/Image/moonBotDocumentationImg.png'])
		.setImage('attachment://moonBotDocumentationImg.png')
		.setFooter('test footer too')
	message.channel.send(neaping);
}

module.exports = {ping};
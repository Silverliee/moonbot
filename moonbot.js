const Discord = require("discord.js");
require('dotenv').config();
const MoonBot = new Discord.Client();


MoonBot.on("ready", () => {
    console.log("I am ready!");
});

MoonBot.on("message", (message) => {
    if (message.content.startsWith(".ping")) {
        message.channel.send("pong!");
    }
    if(message.content.startsWith(".start-protocol-laurelie")) {
        message.channel.send("Protocol Laurelie is starting...")
        message.channel.send("Protocol Laurelie ready")
    }
    if(message.content.startsWith(".stop-protocol-laurelie")) {
        message.channel.send("Protocol Laurelie down")
    }
});

MoonBot.login(process.env.BOT_TOKEN);
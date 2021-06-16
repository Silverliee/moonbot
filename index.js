const {launchDiscordClient} = require("./Service/DiscordService");
const {initialiseMongoose} = require("./Service/MongooseService");

//Mongoose initialisation
initialiseMongoose();
//launchDiscordClient
launchDiscordClient();

/*const commando = require('discord.js-commando');
const commando = require('discord.js-commando');
const bot =  new commando.Client();

bot.registry.registerGroup('random','Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");
bot.login("");*/

const websocket = require('websocket');
const Discord = require('discord.js');
const bot = new Discord.Client();
var config = require('./Modules/ConfigBot.json');
const InitCommands = require('./Modules/Commands');





InitCommands(bot);


// THIS  MUST  BE  THIS  WAY
bot.login(process.env.BOT_TOKEN);//config[0].Token);//process.env.BOT_TOKEN

/*const commando = require('discord.js-commando');
const commando = require('discord.js-commando');
const bot =  new commando.Client();

bot.registry.registerGroup('random','Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");
bot.login("");*/


const Discord = require('discord.js');
const bot = new Discord.Client();
var config = require('./Modules/Config');
const InitCommands = require('./Modules/Commands');



bot.on('ready', () => {
    console.log('I am ready!');

});


InitCommands(bot);


// THIS  MUST  BE  THIS  WAY
bot.login(config[0].Token);//process.env.BOT_TOKEN

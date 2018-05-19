const commando = require('discord.js-commando');
const bot =  new commando.Client();

bot.registry.registerGroup('random','Random');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");


//const Discord = require('discord.js');
//const client = new Discord.Client();

/*client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
        //message.reply('pong');
        message.channel.sendMessage("pong")
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login("NDQ3MzQyNDAwMzI3Nzc4MzE0.DeGLmA.s7NzYoY_5AQ5GG31gZRCoBlhC0Y");//process.env.BOT_TOKEN
*/
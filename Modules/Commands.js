const Math = require('mathjs');

function InitCommands(bot) {
    bot.on('message', message => {

        // if the bot is talking
        if(message.author.equals(bot.user)) return;
        
        Ping(message);
        RoleTheDice(message);

    });

 } 

 function Ping(message)
 {
    if (message.content === 'ping') {
        //message.reply('pong');
        message.channel.sendMessage("pong")
      }
 }

 function RoleTheDice(message)
 {
    if (message.content === 'roll') {
              
        var roll = Math.floor(Math.random(0,6)+1);//Math.floor(Math.floor()*6) + 1;
        message.reply("you rolled a " + roll);
      }
 }

 module.exports =  InitCommands;
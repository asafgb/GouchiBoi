const Math = require('mathjs');
const Discord = require('discord.js');
//var config = require('./ConfigBot');
var YTDL = require('ytdl-core');
var Gamearray =[];
var CommandList=[];
var AddedToListEnable=true;
var configSetting = require('./configSetting.json')
//var BotChannelId= "447377262854275072";
//var BotChannelEnable= true;
var servers={};

var prefix= process.env.Prefix;//config[0].cmdPrefix;//process.env.Prefix

function GenerateColor(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);}

function playMusic(con,message)
{
    var server =servers[message.guild.id];
    server.dispatcher =con.playStream(YTDL(server.queue[0],{filter:"audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end",function(){
        if(server.queue[0])
        play(con,message);
        else con.disconnect();
    })
}

// Command Area
function InitHelpList()
{
    var ClassName ="configuration"
    JsonCreator(ClassName,"config")
    JsonCreator(ClassName,"getconfig")
    JsonCreator(ClassName,"helpconfig")

     ClassName ="Help"
     JsonCreator(ClassName,"help")

     ClassName ="Ping"
     JsonCreator(ClassName,"ping")

     ClassName ="RoleTheDice"
     JsonCreator(ClassName,"roll")

     ClassName ="Game"
     JsonCreator(ClassName,"game!clear")
     JsonCreator(ClassName,"game!add")
     JsonCreator(ClassName,"game!timer [time]")
     JsonCreator(ClassName,"game!list")
     JsonCreator(ClassName,"game!gutigay")

}

function InitCommands(bot) {


    InitHelpList();

    bot.on('guildMemberAdd', function(member)  {
      member.guild.channels.find("name","bot_only").sendMessage(member.toString()+" Welcome Little Bitch");

      member.addRole(member.guild.roles.find("name","Melanie Trump"))
      });

    bot.on('ready', () => {
        bot.user.setGame("try "+prefix+"help")
        console.log('I am ready!');
      });


    bot.on('message', message => {
        var IsCommand=false;
        var isValidCommand=false;
        var content ="";
        //var contentArray;
       
        // if the bot is talking
        if(message.author.equals(bot.user)) return;

        // if not from group
        if (!message.guild)
        {
            message.reply("I dont accpet Instant message, Send me at group")
            return;
        }


        // Check if is the bot command
        var indexOf =message.content.indexOf(prefix);

        // If it is the first word
        if(indexOf===0)
        {
            IsCommand=true;
            content=message.content.substring(prefix.length,message.content.length)

            if(ConfigBot(content,message))
            {
                return;
            }

            // If there channel for bot
            if(message.channel.id != configSetting.BotChannelId && configSetting.BotChannelEnable){
                message.reply("not in the right channel");
                return ;
            }

            
        }

        if(IsCommand)
        {
            // Check if enter Good Command
            isValidCommand = isValidCommand || Help(content,message);
            isValidCommand = isValidCommand || Ping(content,message);
            isValidCommand = isValidCommand || RoleTheDice(content,message);
            isValidCommand = isValidCommand || Game(content,message);
            isValidCommand = isValidCommand || Voice(content,message);
            
            // If not good command
            if(!isValidCommand)
            {
                message.reply("this isn't a command try "+prefix+"help");
            }
        }
    });

 } 


function JsonCreator(name,value){
    var found =false;
    for(var i = 0; i < CommandList.length ; i++)
    {
        if(CommandList[i].ModuleName===name)
        {
            CommandList[i].Command.push(value);
            found=true;
        }
    }
    if(!found)
    {
        var Struct = {
            ModuleName: name,
            Command:[value]
        };
        CommandList.push(Struct)
    }
}


function ConfigBot(content,message) {
    var arrayContent = content.split(' ');
    var msg = "";

    if (arrayContent[0] === 'helpconfig') {
        msg+="\nSetting are: \n";
        msg+= "BotChannelEnable:(true/false)\n";
        msg+= "BotChannelId:(Channel's ID the bot will answer for)\n\n";

        msg+= "Usages:\n";
        msg+="example (more than 1 attribute at once): \n\t";
        msg+=prefix+"config BotChannelEnable:"+configSetting.BotChannelEnable + " BotChannelId:"+configSetting.BotChannelId+"\n\n";

        msg+="example: (1 attribute at once): \n\t";
        msg+=prefix+"config BotChannelId:"+configSetting.BotChannelId+"\n\n"

    }
    else
    if (arrayContent[0] === 'config') {
        
        for(var i =1;i < arrayContent.length;i++)
        {
            var text= arrayContent[i].split(':')

            if(text[0]=== 'BotChannelEnable')
            {
                configSetting.BotChannelEnable = (text[1].toLowerCase() === 'true');
                msg+="The BotChannelEnable Configurate to : "+configSetting.BotChannelEnable +"\n";
                
            }
            if(text[0]=== 'BotChannelId')
            {
                configSetting.BotChannelId = text[1];
                msg+="The BotChannelId Configurate to : "+configSetting.BotChannelId+"\n";
            }
        }
        if(msg.length===0)
        {
            message.reply("try "+prefix +"helpconfig");
        }
        
    }
    else
    if (arrayContent[0] === 'getconfig')
    {
        msg+="The BotChannelEnable Configurate to : "+configSetting.BotChannelEnable +"\n";
        msg+="The BotChannelId     Configurate to : "+configSetting.BotChannelId     +"\n";
    }

    if(msg.length!=0)
    {
        message.reply(msg);
    }

    return msg.length != 0;
 }

function Help(content,message)
 {
    if (content === 'help') {
        var embed = new Discord.RichEmbed()
        .setDescription("These are the commands you can use")
        .setColor([114, 137, 218]);

        for(var i = 0; i < CommandList.length ; i++)
        {
            var commands ="\n\t";
            for(var j=0; j< CommandList[i].Command.length;j++)
            {
                commands+= prefix+CommandList[i].Command[j]+"\n";
            }
            embed.addField(CommandList[i].ModuleName,commands,false);
        }
        embed.setFooter("All the commands Right now");
        embed.setThumbnail(message.author.avatarURL);
        
            /*.setColor('#ff22ff')
            .setImage("http://images5.fanpop.com/image/photos/31300000/beautiful-heart-pic-beautiful-pictures-31395948-333-500.jpg")
            .setAuthor("asaf")//.setURL("http://images5.fanpop.com/image/photos/31300000/beautiful-heart-pic-beautiful-pictures-31395948-333-500.jpg")
            .setDescription("Command List")*/
            

            
            //message.channel.sendEmbed(embed);
            message.author.sendEmbed(embed);
        return true;
      }
      return false;
 }

function Ping(content,message)
 {
    if (content === 'ping') {
        //message.reply('pong');
        message.channel.sendMessage("pong")
        return true;
    }
    if (content === 'dping') {
        //message.reply('pong');
        message.author.sendMessage('pong');
        return true;
    }
    return false;
 }

function RoleTheDice(content,message)
 {
    if (content === 'roll') {
        var roll = Math.floor(Math.random(0,6)+1);
        message.reply("you rolled a " + roll);
        return true;
    }
    return false;
 }

 function Game(content,message)
 {
     var isValid=false;
     var arrayContent = content.split(' ');

    if (arrayContent[0] === 'game!clear') {
        // Can added to List
        AddedToListEnable=true;
        Gamearray=[];
        message.reply("Game List Clear");
        isValid= true;
    }

      if (arrayContent[0] === 'game!add') {
        if(AddedToListEnable)
        {
            // If the user already Exist
            if(Gamearray.includes(message.author))
            {
                message.reply("You already in the List... dont hack!!");
                return true;
            }
            Gamearray.push(message.author);
            message.reply("You been added");
        }
        else
        {
            message.reply("sorry times Up");
        }
        isValid= true;
    }

    if (arrayContent[0] === 'game!timer') {
        var time=60;
        if(arrayContent.length===2)
        {   
             time =arrayContent[1];
            //message.reply("miss Params");
            //return true;
        }
        timeoutObj = setTimeout(() => {
            message.channel.sendMessage("Times Up");
            AddedToListEnable=false;
          }, 1000*time);

        message.reply("Timer Added with "+time+" Seconds");
        isValid= true;
    }
    if (arrayContent[0] === 'game!list') {
        var msg ="The list: \n";
        for(var i=0 ; i<Gamearray.length;i++)
        {
            msg+=Gamearray[i] + "\n";
        }
        
        message.channel.sendMessage(msg);
        isValid= true;
    }
     
    if (arrayContent[0]  === 'game!gutigay') {
        var LucyNumber = Math.floor(Math.random(0,Gamearray.length));
        var RandomUser = Gamearray[LucyNumber];
        message.channel.sendMessage(RandomUser + " You choosen");
        isValid= true;
    }
    return isValid;
 }

function Voice(content,message)
{
    var arrayContent = content.split(' ');
    var isValid=false;
    if (arrayContent[0] === 'play') {
        if(!arrayContent[1])
        {
            message.channel.sendMessage("**:x:you must provide a link**");
            isValid= true;
        }
        else        
        if (!message.member.voiceChannel) {
            message.channel.sendMessage('**:x:You need to join a voice channel first!**');
            isValid= true;
        }
        else
        {
            if (!servers[message.guild.id])
                servers[message.guild.id] = {
                    queue: []
                };
            var server = servers[message.guild.id];

            server.queue.push(arrayContent[1])

            if (!message.guild.voiceConnection)
                message.member.voiceChannel.join().then(function (con) {
                    playMusic(con, message)
                })
            /*message.member.voiceChannel.join()
            .then(connection => { // Connection is an instance of VoiceConnection
                message.reply('I have successfully connected to the channel!');
            })
            .catch(console.log);*/
        isValid=true;
        }
    } 
    else
    if (arrayContent[0] === 'skip') {
        var server = servers[message.guild.id]

        if(server.dispatcher) server.dispatcher.end();
        isValid=true;
    }
    else
    if (arrayContent[0] === 'stop') {
        var server = servers[message.guild.id]

        if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        isValid=true;
    }
    return isValid;
}

 

 module.exports =  InitCommands;
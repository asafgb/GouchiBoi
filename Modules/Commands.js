const Math = require('mathjs');
const Discord = require('discord.js');
var config = require('./Config');
var Gamearray =[];
var CommandList=[];
var AddedToListEnable=true;
var BotChannelId= "447377262854275072";
var BotChannelEnable= true;

var prefix= config[0].cmdPrefix;//process.env.Prefix

// Command Area
function InitHelpList()
{
    var ClassName ="configuration"
    JsonCreator(ClassName,"config")
    JsonCreator(ClassName,"getconfig")

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
            if(message.channel.id != BotChannelId && BotChannelEnable){
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


function JsonCreator(name,value)
{
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


 function ConfigBot(content,message)
 {
    // !!config SpecificChannel:true BotChannelId:1212121
    var arrayContent = content.split(' ');
    var msg = "";

    if (arrayContent[0] === 'config') {
        
        for(var i =1;i < arrayContent.length;i++)
        {
            var text= arrayContent[i].split(':')

            if(text[0]=== 'BotChannelEnable')
            {
                BotChannelEnable = (text[1].toLowerCase() === 'true');
                msg+="The BotChannelEnable Configurate to : "+BotChannelEnable +"\n";
                
            }
            if(text[0]=== 'BotChannelId')
            {
                BotChannelId = text[1];
                msg+="The BotChannelId Configurate to : "+BotChannelId+"\n";
            }
        }
        
    }
    else
    if (arrayContent[0] === 'getconfig')
    {
        msg+="The BotChannelEnable Configurate to : "+BotChannelEnable +"\n";
        msg+="The BotChannelId     Configurate to : "+BotChannelId     +"\n";
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
        // Display in private the commands List
        // Json of commands and data
        //var date =new Date();
        //date.setFullYear(1995);
        //date.setFullYear
        var embed = new Discord.RichEmbed()
        .setDescription("These are the commands you can use")
        .setColor([114, 137, 218]);
        
            /*.setColor('#ff22ff')
            .setImage("http://images5.fanpop.com/image/photos/31300000/beautiful-heart-pic-beautiful-pictures-31395948-333-500.jpg")
            .setAuthor("asaf")//.setURL("http://images5.fanpop.com/image/photos/31300000/beautiful-heart-pic-beautiful-pictures-31395948-333-500.jpg")
            .setDescription("Command List")*/
            

            
            message.channel.sendEmbed(embed);
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
    var isValid=false;
    if (content === 'join') {
            // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
          .then(connection => { // Connection is an instance of VoiceConnection
            message.reply('I have successfully connected to the channel!');
          })
          .catch(console.log);
      } else {
        message.reply('You need to join a voice channel first!');
      }
      isValid=true;
    }
    return isValid;
}

 

 module.exports =  InitCommands;
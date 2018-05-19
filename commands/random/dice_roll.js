const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'roll',
            description: 'Rolls a dice'

        });

    }

    async run(message, args){
        var roll = Math.floor(Math.floor()*6) + 1;
        message.replay("you rolled a " + roll);
    }

}

module.exports =  DiceRollCommand;
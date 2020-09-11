const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    message.channel.send('Mon ping est de `' + client.ping + ' ms`');

}

module.exports.help = {
    category: ":flashlight: | Utile",
    name: "botping",
    description: "Affiche le ping du BOT",
    usage: "/botping"
}

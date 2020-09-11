const Discord = require('discord.js');
const prefix = "/";
const id_bot = "744195842126381176";

module.exports = async(client, message) => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return; // Empêche les messages privés

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commande = args.shift().toLowerCase();

    const cmd = client.commands.get(commande);

    if(!cmd) return;

    cmd.run(client, message, args);
};

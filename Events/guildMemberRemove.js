const Discord = require('discord.js');

module.exports = async(client, member) => {

    member.guild.channels.get("744200275211976798").send(`:arrow_left: **${member.user.tag}** vient de quitter le serveur...`);

};

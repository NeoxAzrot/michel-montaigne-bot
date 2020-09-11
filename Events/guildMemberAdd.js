const Discord = require('discord.js');

module.exports = async(client, member) => {

    member.guild.channels.get("744200275211976798").send({
        embed: {
            color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
            description: `Bienvenue <@${member.user.id}> :wave:\nPenses à lire les <#744622973234839613> et à t'attribuer **les rôles** qui te correspondent dans <#744622818700034149> pour débloquer le reste du serveur !`,
            author: {
                name: member.user.username,
                icon_url: member.user.avatarURL,
                proxy_icon_url: ' '
              }
        }
    })

};

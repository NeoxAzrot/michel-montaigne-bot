const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    let nombre_membre_co = message.guild.members.filterArray(m=>m.presence.status!="offline").length;
    let serverCreateDate = message.guild.createdAt.toString().split(' ');
    //console.log(serverCreateDate);

    let embed_fields = [
        {
          name: ":bust_in_silhouette: | Proriétaire",
          value: message.guild.owner.displayName,
          inline: true
        },
        {
          name: ":busts_in_silhouette: | Membres",
          value: message.guild.memberCount,
          inline: true
        },
        {
          name: ":green_circle: | Membres connectés",
          value: nombre_membre_co,
          inline: true
        },
        {
          name: ":stuck_out_tongue: | Émojis",
          value: message.guild.emojis.size,
          inline: true
        },
        {
          name: ":speech_balloon: | Channels",
          value: message.guild.channels.size,
          inline: true
        },
        {
          name: ":japanese_goblin: | Rôles",
          value: message.guild.roles.size,
          inline: true
        },
        {
          name: ":map: | Région",
          value: message.guild.region,
          inline: true
        },
        {
          name: ":date: | Date de création",
          value: serverCreateDate[0] + " " +serverCreateDate[2] + " " +serverCreateDate[1] + " " + serverCreateDate[3] + " at "+serverCreateDate[4],
          inline: true
        }
    ];

    return message.channel.send({
        embed: {
            color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
            thumbnail: {
                url: message.guild.iconURL
            },
            fields: embed_fields,
            author: {
                name: `Informations sur ${message.guild.name}`,
            }
        }
    })

}

module.exports.help = {
    category: ":flashlight: | Utile",
    name: "server",
    description: "Affiche des informations sur le serveur",
    usage: "/server"
}

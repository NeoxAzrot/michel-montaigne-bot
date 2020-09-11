const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    if (!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
        return message.channel.send("Tu n'as pas la permission d'utiliser cette commande :no_entry_sign:");
    }else{
        let memberban = message.mentions.users.first();
        //console.log(memberban)
        if (!memberban){
            return message.channel.send("La bonne syntaxe est : `/ban @mention`");
        }else{
            if(!message.guild.member(memberban).bannable){
                return message.channel.send("Vous essayez de bannir un grade supérieur :no_entry_sign:");
            }else{
                message.guild.member(memberban).ban().then((member) => {
                  //console.log(member);
                  return message.channel.send({
                    embed: {
                        color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
                        description: `**${member.displayName}** a bien été banni du serveur :white_check_mark:`,
                        author: {
                            name: message.author.username,
                            icon_url: message.author.avatarURL,
                            proxy_icon_url: ' '
                          }
                      }
                  })
            }).catch(() => {
                return message.channel.send("Impossible de bannir cette personne pour le moment :x:");
            })
            }
        }
    }

}

module.exports.help = {
    category: ":tools: | Modération",
    name: "ban",
    description: "Permet aux admins de bannir une personne du serveur",
    usage: "/ban @mention"
}

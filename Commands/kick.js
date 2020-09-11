const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
        return message.channel.send("Tu n'as pas la permission d'utiliser cette commande :no_entry_sign:");
    }else{
        let memberkick = message.mentions.users.first();
        //console.log(memberkick);
        if (!memberkick){
            return message.channel.send("La bonne syntaxe est : `/kick @mention`");
        }else{
            if(!message.guild.member(memberkick).kickable){
                return message.channel.send("Vous essayez d'expulser un grade supérieur :no_entry_sign:");
            }else{
                message.guild.member(memberkick).kick().then((member) => {
                  //console.log(member);
                  return message.channel.send({
                    embed: {
                        color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
                        description: `**${member.displayName}** a bien été expulsé du serveur :white_check_mark:`,
                        author: {
                            name: message.author.username,
                            icon_url: message.author.avatarURL,
                            proxy_icon_url: ' '
                          }
                      }
                  })
            }).catch(() => {
                return message.channel.send("Impossible d'expulser cette personne pour le moment :x:");
            })
            }
        }
    }

}

module.exports.help = {
    category: ":tools: | Modération",
    name: "kick",
    description: "Permet aux admins d'expulser une personne du serveur",
    usage: "/kick @mention"
}

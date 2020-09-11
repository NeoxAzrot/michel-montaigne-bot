const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    let ClearRole = message.guild.roles.find("name", "🔧 | Admin"); // Nom du rôle

    if(!message.guild.roles.exists("name", "🔧 | Admin")) {
        return message.channel.send("Le rôle **🔧 | Admin** n'existe pas, veuillez le créer pour utiliser cette commande :x:").catch(console.error);
    }

    if(!message.member.roles.has(ClearRole.id)) {
        return message.channel.send("Tu n'as pas la permission d'utiliser cette commande :no_entry_sign:").catch(console.error);
    }

    let nombre_de_message = args.slice(0).join(" ");

    if(nombre_de_message.length === 0){
        message.channel.send("Il faut préciser le nombre de message à supprimer :x:");
    } else {
        let msg = parseInt(nombre_de_message) + 1;
        message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
        message.channel.send({
            embed: {
                title: "Messages supprimés :white_check_mark:",
                color: 0x76B054,
                description: `Nombre de messages supprimés : ${msg - 1}`,
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL,
                    proxy_icon_url: ' '
                  }
            }
        });
    }

}

module.exports.help = {
    category: ":tools: | Modération",
    name: "clear",
    description: "Permet aux admins de supprimer des messages",
    usage: "/clear <nombre de messages>"
}

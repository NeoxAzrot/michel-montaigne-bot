const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    const cmd = client.commands;

    if(args[0]){
        for(let i = 0; i < cmd.array().length; i++){
            if(args[0] == cmd.array()[i].help.name){
                return message.channel.send({
                    embed: {
                        color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
                        description: "**Commande :** " + "`" + cmd.array()[i].help.name + "`\n\n" + "**Description :** " + "`" + cmd.array()[i].help.description + "`\n\n" + "**Usage :** " + "`" + cmd.array()[i].help.usage + "`\n\n",
                        footer: {
                            text: `Aide pour la commande [${cmd.array()[i].help.name}]`
                        },
                        author: {
                            name: message.author.username,
                            icon_url: message.author.avatarURL,
                            proxy_icon_url: ' '
                          }
                    }
                })
            }
        }

        return message.channel.send("Cette commande n'existe pas :x:");
    }

    let categories = [];
    let command_fields;
    let embed_fields = [];

    for(let i = 0; i < cmd.array().length; i++){
        categories.push(cmd.array()[i].help.category);
    }

    categories = Array.from(new Set(categories));

    for(let i = 0; i < categories.length; i++){
      command_fields = "";
      for(let j = 0; j < cmd.array().length; j++) {
        if(categories[i] == cmd.array()[j].help.category) {
          command_fields += "`" + cmd.array()[j].help.name + "` ";
        }
      }
      embed_fields.push({name: categories[i], value: command_fields, inline: false});
    }

    return message.channel.send({
        embed: {
            color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
            description: "Vous pouvez utiliser `/help <nom de la commande>` pour obtenir plus de détails !",
            fields: embed_fields,
            footer: {
                text: `Nombre de commandes [${cmd.array().length}]`
            },
            author: {
                name: "Liste des commandes",
            }
        }
    })

};

module.exports.help = {
    category: ":flashlight: | Utile",
    name: "help",
    description: "Permet de voir toutes les commandes et d'avoir de l'aide sur une commande spécifique",
    usage: "/help <nom de la commande>"
}

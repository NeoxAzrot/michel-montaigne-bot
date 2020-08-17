const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    const cmd = client.commands;

    if(args[0]){
        for(let i = 0; i < cmd.array().length; i++){
            if(args[0] == cmd.array()[i].help.name){
                return message.channel.send({
                    embed: {
                        color: 0x1e4773,
                        thumbnail: {
                            url: "https://image.noelshack.com/fichiers/2019/22/4/1559223892-question.png"
                        },
                        description: "**Nom :** " + "`" + cmd.array()[i].help.name + "`\n\n" + "**Description :** " + "`" + cmd.array()[i].help.description + "`\n\n" + "**Usage :** " + "`" + cmd.array()[i].help.usage + "`\n\n",
                        footer: {
                            text: `©Vonguru - BOT | Aide pour la commande [${cmd.array()[i].help.name}]`,
                            icon_url: "http://www.overclex.net/wp-content/uploads/2018/10/unnamed.jpg"
                        },
                        author: {
                            name: "Vonguru - BOT",
                            icon_url: "http://www.overclex.net/wp-content/uploads/2018/10/unnamed.jpg",
                            proxy_icon_url: ' '
                          }
                    }
                })
            }
        }

        return message.channel.send("Cette commande n'existe pas :x:");
    }

    let noms = '';

    for(let i = 0; i < cmd.array().length; i++){
        noms += "`" + cmd.array()[i].help.name + "` ";
    }

    return message.channel.send({
        embed: {
            color: 0x1e4773,
            description: "Vous pouvez taper `+help <nom de la commande>` pour obtenir plus de détails !",
            thumbnail: {
                url: "https://image.noelshack.com/fichiers/2019/22/4/1559223892-question.png"
            },
            fields: [
                {
                    name: 'Commandes :flashlight:',
                    value: noms
                }
            ],
            footer: {
                text: `©Vonguru - BOT | Nombre de commandes [${cmd.array().length}]`,
                icon_url: "http://www.overclex.net/wp-content/uploads/2018/10/unnamed.jpg"
            },
            author: {
                name: "Vonguru - BOT",
                icon_url: "http://www.overclex.net/wp-content/uploads/2018/10/unnamed.jpg",
                proxy_icon_url: ' '
              }
        }
    })

};

module.exports.help = {
    name: "help",
    description: "Permet de voir toutes les commandes et d'avoir de l'aide sur une commande spécifique",
    usage: "/help <nom de la commande>"
}

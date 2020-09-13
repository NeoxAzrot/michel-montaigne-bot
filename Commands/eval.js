const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    if (message.author.id == "317281830279577601") {
        let command_arg = args.slice(0).join(" ");

        if(!command_arg){
            return message.channel.send("Il n'y a rien à évaluer :x:");
        }

        try {
            var command_eval = eval(command_arg);
            console.log(command_eval);
            return message.channel.send({
              embed: {
                  color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
                  fields: [
                      {
                          name: ":gear: | Input",
                          value: "```js\n" + command_arg + "```",
                          inline: false
                      },
                      {
                          name: ":pencil: | Output",
                          value: "```js\n" + command_eval + "```",
                          inline: false
                      }
                  ],
                  author: {
                      name: message.author.username,
                      icon_url: message.author.avatarURL,
                      proxy_icon_url: ' '
                    }
                }
            })
        } catch(e) {
            return message.channel.send(e.toString());
        }

    } else {
        return message.channel.send("Seul mon propriétaire peut utiliser cette commande :no_entry_sign:");
    }

};

module.exports.help = {
    category: ":tools: | Modération",
    name: "eval",
    description: "Permet au propriétaire du BOT d'évaluer des commandes en javascript",
    usage: "/eval <commande>"
}

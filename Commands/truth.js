const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    if(!args[0]){
      return message.channel.send("Ajoute ta question pour que je puisse y répondre : `/truth <question>`");
    }

    if(!message.content.includes("?")){
      return message.channel.send("Tu n'as pas posé de question :x:");
    }

    let question = args.slice(0).join(" ");
    question_random();

    return message.channel.send({
      embed: {
          color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
          fields: [
              {
                  name: ":question: | Question",
                  value: question,
                  inline: false
              },
              {
                  name: ":pencil: | Réponse",
                  value: reponse[randnum],
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

};

let reponse  = [
  "C'est évident.",
  "Je suis sûr que... non !",
  "Ça ne fait aucun doute.",
  "Hum... Ça fait partie des choses auxquelles je ne peux pas répondre... Désolé.",
  "Je crois que tu sous-entendais quelque chose de bizarre...",
  "Seul Gandalf le sait.",
  "Tu es quand-même bizarre...",
  "Quand les chats voleront !",
  "Non.",
  "Oui !",
  "Tout dépend du jour...",
  "Aujourd'hui ça serait bon, en théorie.",
  "Peut-être bien !"
];

function question_random(min, max) {
    min = Math.ceil(1);
    max = Math.floor(reponse.length);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}

module.exports.help = {
    category: ":circus_tent: | Fun",
    name: "truth",
    description: "Pose une question au BOT",
    usage: "/truth <question>"
}

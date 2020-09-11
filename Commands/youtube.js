const Discord = require('discord.js');
const YouTube = require('youtube-node');

module.exports.run = async(client, message, args) => {

  let youTube = new YouTube();
  youTube.setKey('AIzaSyCn1e5B8ZSsvllxoDO44EJQDOSr928yZ2c');

  let recherche = args.slice(0).join(" ");

  if(!recherche) {
    return message.channel.send("Cette commande permet de rechercher une vidéo sur YouTube : `/youtube <recherche>`");
  }

  youTube.search(recherche, 10, async function(error, result) {
    if (error) {
      //console.log(error);
      return message.channel.send("J'ai rencontré une erreur, veuillez réessayer :x:");
    }
    else {
      //console.log(JSON.stringify(result, null, 2));
      //console.log(result.items[0]);

      if(result.items.length == 0) {
        return message.channel.send("Cette vidéo n'existe pas :x:");
      }

      let choix_videos = "";
      for(let i = 0; i < result.items.length; i++) {
        //console.log(result.items[i])

        if(result.items[i].id.kind == "youtube#video") {
            choix_videos += `:clapper: | \`${i + 1}.\` [${result.items[i].snippet.title}](https://www.youtube.com/watch?v=${result.items[i].id.videoId}) - publié par ${result.items[i].snippet.channelTitle}\n\n`;
        } else if(result.items[i].id.kind == "youtube#channel") {
            choix_videos += `:bust_in_silhouette: | \`${i + 1}.\` [${result.items[i].snippet.title}](https://www.youtube.com/channel/${result.items[i].id.channelId})\n\n`;
        } else if(result.items[i].id.kind == "youtube#playlist") {
            choix_videos += `:cd: | \`${i + 1}.\` [${result.items[i].snippet.title}](https://www.youtube.com/playlist?list=${result.items[i].id.playlistId}) - créé par ${result.items[i].snippet.channelTitle}\n\n`;
        }

      }
      choix_videos += "\n**Écris un nombre pour faire un choix**";

      await message.channel.send({
        embed: {
            color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
            description: choix_videos,
            author: {
                name: message.author.username,
                icon_url: message.author.avatarURL,
                proxy_icon_url: ' '
              }
          }
      })

      let filter = msg => msg.author.id === message.author.id;

      let video = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
          .then(m => m.first())
          .catch(() => null);

      if (!video) {
          return message.channel.send("T'as mis trop de temps à répondre... Tu dois recommencer l'opération :x:");
      }

      if(isNaN(video)) {
          return message.channel.send("Tu dois entrer un nombre ! Recommence l'opération :x:");
      }

      if(video <= 0 || video > 10) {
          return message.channel.send("Tu dois entrer un nombre compris entre 1 et 10 ! Recommence l'opération :x:");
      }

      video--;

      let video_link;

      if(result.items[video].id.kind == "youtube#video") {
          video_link = `https://www.youtube.com/watch?v=${result.items[video].id.videoId}`;
      } else if(result.items[video].id.kind == "youtube#channel") {
          video_link = `https://www.youtube.com/channel/${result.items[video].id.channelId}`;
      } else if(result.items[video].id.kind == "youtube#playlist") {
          video_link = `https://www.youtube.com/playlist?list=${result.items[video].id.playlistId}`;
      }

      return message.channel.send(video_link);
    }
  });

}

module.exports.help = {
    category: ":mag: | Recherche",
    name: "youtube",
    description: "Fait une recherche sur YouTube",
    usage: "/youtube <recherche>"
}

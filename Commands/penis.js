const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

  let penis_size = penis_random();
  let penis = "";

  for (let i = 0; i < penis_size; i++) {
    penis += "=";
  }

  let memberpenis = message.mentions.users.first();
  let name;
  let icon_url;
  
  if (!memberpenis){
      name = message.author.username;
      icon_url = message.author.avatarURL;
  } else {
      name = memberpenis.username;
      icon_url = memberpenis.avatarURL;
  }

  return message.channel.send({
      embed: {
          color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
          description: `8${penis}D`,
          author: {
              name: `Penis de ${name}`,
              icon_url: icon_url,
              proxy_icon_url: ' '
            }
      }
  })

}

function penis_random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(50); // 55 max screen
    return randnum = Math.floor(Math.random() * (max - min +1) + min);
}


module.exports.help = {
    category: ":circus_tent: | Fun",
    name: "penis",
    description: "Affiche une taille de penis aléatoire",
    usage: "/penis ou /penis @mention"
}

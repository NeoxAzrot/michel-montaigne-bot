const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    let nombre_emojis = message.guild.emojis.size;

    if(nombre_emojis == 0) {
      return message.channel.send("Il n'y a pas encore d'emojis personnalisés sur ce serveur :x:");
    }

    let emojis_array = message.guild.emojis.array();
    let n = 0;
    let les_emojis = "";

    while(n < nombre_emojis){
        les_emojis = les_emojis +"<:"+ emojis_array[n].identifier +">";
        n++;
    }

    return message.channel.send(les_emojis);

}

module.exports.help = {
    category: ":circus_tent: | Fun",
    name: "emojis",
    description: "Affiche tout les emojis du serveur",
    usage: "/emojis"
}

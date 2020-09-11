const Discord = require('discord.js');
var npmSearch = require('npm-module-search');

module.exports.run = async(client, message, args) => {

    let recherche = args.slice(0).join(" ");

    if(!recherche){
        return message.channel.send("Cette commande permet de rechercher un module sur npm : `/npm <module>`");
    }

    npmSearch.search(recherche, {limit: 10}, async function (err, modules) {
      //console.log('Here are 10 modules', modules);

      if(modules.length == 0) {
        return message.channel.send("Ce module n'existe pas :x:");
      }

      let choix_modules = "";
      for(let i = 0; i < modules.length; i++) {
        //console.log(modules[i])
        choix_modules += `\`${i + 1}.\` [${modules[i].name}](${modules[i].links.npm}) - creat by ${modules[i].author.name}\n\n`;
      }
      choix_modules += "\n**Écris un nombre pour faire un choix**";

      await message.channel.send({
        embed: {
            color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
            description: choix_modules,
            author: {
                name: message.author.username,
                icon_url: message.author.avatarURL,
                proxy_icon_url: ' '
              }
          }
      })

      let filter = msg => msg.author.id === message.author.id;

      let module_alone = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
          .then(m => m.first())
          .catch(() => null);

      if (!module_alone) {
          return message.channel.send("T'as mis trop de temps à répondre... Tu dois recommencer l'opération :x:");
      }

      if(isNaN(module_alone)) {
          return message.channel.send("Tu dois entrer un nombre ! Recommence l'opération :x:");
      }

      if(module_alone <= 0 || module_alone > 10) {
          return message.channel.send("Tu dois entrer un nombre compris entre 1 et 10 ! Recommence l'opération :x:");
      }

      module_alone--;

      let auteur = modules[module_alone].author.name;
      let date = modules[module_alone].date.slice(0, 10);
      date = date.split("-");
      date = date[2] +"/"+ date[1]  + "/" + date[0];
      let description = modules[module_alone].description;
      let keywords = "";
      if(modules[module_alone].keywords) {
        let n = 0;
        while(n<modules[module_alone].keywords.length){
            keywords = keywords +", `"+ modules[module_alone].keywords[n] +"`";
            n++;
        }
        keywords = keywords.substr(2);
      }
      let lien = modules[module_alone].links.npm;
      let nom = modules[module_alone].name;
      let version = modules[module_alone].version;

      return message.channel.send({
          embed: {
              color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
              fields: [
                  {
                      name: ":label: | Nom",
                      value: `[${nom}](${lien})`,
                      inline: true
                  },
                  {
                      name: ":bust_in_silhouette: | Auteur",
                      value: auteur,
                      inline: true
                  },
                  {
                      name: ":date: | Date de création",
                      value: date,
                      inline: true
                  },
                  {
                      name: ":pencil: | Description",
                      value: description,
                      inline: false
                  },
                  {
                      name: ":gear: | Version",
                      value: version,
                      inline: true
                  },
                  {
                      name: ":mag: | Mots clés",
                      value: keywords || "Aucun mots clés",
                      inline: true
                  }
              ],
              thumbnail: {
                  url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/1200px-Npm-logo.svg.png"
              },
              author: {
                  name: message.author.username,
                  icon_url: message.author.avatarURL,
                  proxy_icon_url: ' '
              }
          }
      })
  })

}

module.exports.help = {
    category: ":mag: | Recherche",
    name: "npm",
    description: "Recherche un module sur npm",
    usage: "/npm <module>"
}

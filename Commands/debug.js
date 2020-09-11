const Discord = require('discord.js');
const os = require('os');

module.exports.run = async(client, message, args) => {

      let upTime = Math.round(os.uptime());
      let upTime1 = Math.round(process.uptime());
      //console.log(upTime);
       let upTimeSeconds2 = upTime1;
       let upTimeOutput2 = "";
       if (upTime<60) {
           upTimeOutput2 = `${upTime1}s`;
       } else if (upTime1<3600) {
           upTimeOutput2 = `${Math.floor(upTime1/60)}m ${upTime1%60}s`;
       } else if (upTime1<86400) {
           upTimeOutput2 = `${Math.floor(upTime1/3600)}h ${Math.floor(upTime1%3600/60)}m ${upTime1%3600%60}s`;
       } else if (upTime1<604800) {
           upTimeOutput2 = `${Math.floor(upTime1/86400)}d ${Math.floor(upTime1%86400/3600)}h ${Math.floor(upTime1%86400%3600/60)}m ${upTime%86400%3600%60}s`;
       }

       let upTimeSeconds = upTime;
       let upTimeOutput = "";

       if (upTime<60) {
           upTimeOutput = `${upTime}s`;
       } else if (upTime<3600) {
           upTimeOutput = `${Math.floor(upTime/60)}m ${upTime%60}s`;
       } else if (upTime<86400) {
           upTimeOutput = `${Math.floor(upTime/3600)}h ${Math.floor(upTime%3600/60)}m ${upTime%3600%60}s`;
       } else if (upTime<604800) {
           upTimeOutput = `${Math.floor(upTime/86400)}d ${Math.floor(upTime%86400/3600)}h ${Math.floor(upTime%86400%3600/60)}m ${upTime%86400%3600%60}s`;
       }

       let embed_fields = [{
               name: ":mag: | Info du système",
               value: `${process.platform}-${process.arch} with ${process.release.name} version ${process.version.slice(1)}`,
               inline: true
           },
           {
               name: ":gear: | Info du processus, PID",
               value: `${process.pid}`,
               inline: true
           },
           {
               name: ":clock2: | Durée de fonctionnement du BOT",
               value: `${upTimeOutput2}`,
               inline: true
           },
           {
               name: ":desktop: | Mémoire du processus utilisé",
               value: `${Math.ceil(process.memoryUsage().heapTotal / 1000000)} MB`,
               inline: true
           },
           {
               name: ":desktop: | Mémoire du système utilisé",
               value: `${Math.ceil((os.totalmem() - os.freemem()) / 1000000)} of ${Math.ceil(os.totalmem() / 1000000)} MB`,
               inline: true
           },
           /*{
               name: ":clock2: | Durée de fonctionnement du serveur",
               value: `${upTimeOutput}`,
               inline: false
           },*/
           {
               name: ':book: | Librairie',
               value: `Discord.js`,
               inline: true
           }
       ];

       return message.channel.send({
           embed: {
               color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
               fields: embed_fields,
               author: {
                   name: message.author.username,
                   icon_url: message.author.avatarURL,
                   proxy_icon_url: ' '
              }
           }
       })

}

module.exports.help = {
    category: ":tools: | Modération",
    name: "debug",
    description: "Affiche les informations du BOT et du serveur",
    usage: "/debug"
}

const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    fetch('https://www.blagues-api.fr/api/random', {
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMzE3MjgxODMwMjc5NTc3NjAxIiwibGltaXQiOjEwMCwia2V5IjoiczFuSU9hb3NmcTVZWktJWUc0aExtU2dKV21RQ1pqYVc2WDJtVmloTTJLQlNKaVVBQnQiLCJjcmVhdGVkX2F0IjoiMjAyMC0wOS0xNFQwMDo1NzoxNyswMjowMCIsImlhdCI6MTYwMDAzNzgzN30._VhRLEh85LjdH-AXve8hGdnOP1Fiv5nevsHzfFJzwfs`
        }
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        
        return message.channel.send({
            embed: {
                color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
                fields: [
                    {
                        name: ":question: | Question",
                        value: data.joke,
                        inline: false
                    },
                    {
                        name: ":pencil: | Réponse",
                        value: data.answer,
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
    })

}

module.exports.help = {
    category: ":circus_tent: | Fun",
    name: "joke",
    description: "Affiche une blague aléatoire",
    usage: "/joke"
}

const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    let calcul = args.slice(0).join(" ");
    let recherche = calcul.replace(/ /gi, "%20");
    recherche = recherche.replace(/[+]/gi, "%2B");
    if(!calcul){
        return message.channel.send("Cette commande permet d'effectuer un calcul ou une conversion : `/calcul <expression>`");
    }else{
        require('http').request({
            host: 'api.mathjs.org',
            path: '/v4/?expr='+recherche,
            method: 'GET'
        }, function(res) {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                //console.log(body);

                return message.channel.send({
                    embed: {
                        color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
                        fields: [
                            {
                                name: ":abacus: | Calcul",
                                value: calcul,
                                inline: false
                            },
                            {
                                name: ":bulb: | Résultat",
                                value: body,
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
            }
        )}).end();
    }

}

module.exports.help = {
    category: ":mag: | Recherche",
    name: "calcul",
    description: "Fait un calcul ou une conversion",
    usage: "/calcul <expression>"
}

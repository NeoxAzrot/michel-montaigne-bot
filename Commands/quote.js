const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    require('https').request({
      host: 'citations.ouest-france.fr',
      path: '/apis/export.php?random',
      method: 'GET'
    }, function(res) {
        res.setEncoding('utf8');
        let body = '';
        res.on('data', function(chunk) {
            //console.log(chunk);
            body += chunk;
        });
        res.on('end', function() {
            body = body.split('\n');
            //console.log(body);
            let citation = body[0].substr(14);
            citation = citation.replace(/&#8221;";/,"");
            let auteur_citation = body[1].substr(7);
            auteur_citation = auteur_citation.replace(/";/,"");

            return message.channel.send({
                embed: {
                    color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
                    fields: [
                        {
                            name: ":bust_in_silhouette: | Auteur",
                            value: auteur_citation,
                            inline: false
                        },
                        {
                            name: ":scroll: | Citation",
                            value: citation,
                            inline: false
                        }
                    ]
                }
            })
        }
    )}).end();

}

module.exports.help = {
    category: ":mag: | Recherche",
    name: "quote",
    description: "Affiche une citation aléatoire",
    usage: "/quote"
}

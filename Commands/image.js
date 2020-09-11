const Discord = require('discord.js');
const GoogleImages = require('google-images');
const googleimages = new GoogleImages('011562372597798763894:r5rpwo1yn98', 'AIzaSyCn1e5B8ZSsvllxoDO44EJQDOSr928yZ2c');

module.exports.run = async(client, message, args) => {

    let recherche = args.slice(0).join(" ");

    if(!recherche){
        return message.channel.send("Tu dois fournir un terme de recherche :x:");
    } else{
        googleimages.search(recherche)
        .then(async images => {
            //console.log(images);

            if(images.length == 0) {
              return message.channel.send("Je n'ai pas trouvé d'image correspondante :x:");
            }

            let choix_images = "";
            for(let i = 0; i < images.length; i++) {
              //console.log(images[i])
              choix_images += `\`${i + 1}.\` ${images[i].description} - [site web](${images[i].parentPage})\n\n`;
            }
            choix_images += "\n**Écris un nombre pour faire un choix**";

            await message.channel.send({
              embed: {
                  color: parseInt('0x' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6)),
                  description: choix_images,
                  author: {
                      name: message.author.username,
                      icon_url: message.author.avatarURL,
                      proxy_icon_url: ' '
                    }
                }
            })

            let filter = msg => msg.author.id === message.author.id;

            let image = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(m => m.first())
                .catch(() => null);

            if (!image) {
                return message.channel.send("T'as mis trop de temps à répondre... Tu dois recommencer l'opération :x:");
            }

            if(isNaN(image)) {
                return message.channel.send("Tu dois entrer un nombre ! Recommence l'opération :x:");
            }

            if(image <= 0 || image > 10) {
                return message.channel.send("Tu dois entrer un nombre compris entre 1 et 10 ! Recommence l'opération :x:");
            }

            image--;

            return message.channel.send({
                embed: {
                    description: `${images[image].description}`,
                    color: 0x6dcd7c,
                  	title: 'Site web',
                  	url: images[image].parentPage,
                    image: {
                        url: images[image].url
                    },
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL,
                        proxy_icon_url: ' '
                      }
                }
            })

        });
    }

}

module.exports.help = {
    category: ":mag: | Recherche",
    name: "image",
    description: "Fait une recherche sur Google image",
    usage: "/image <recherche>"
}
